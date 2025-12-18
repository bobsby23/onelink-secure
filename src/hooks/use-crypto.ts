
"use client";

import { useState, useCallback } from "react";
import { generateMnemonic as bip39GenerateMnemonic, validateMnemonic as bip39ValidateMnemonic, mnemonicToSeed } from 'bip39';

// Per Blueprint v2.0
const RSA_KEY_SIZE = 2048; 
const PBKDF2_ITERATIONS = 100000;

// Helper to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}


export function useCrypto() {
  const [isProcessing, setIsProcessing] = useState(false);

  const generateMnemonic = useCallback(() => {
    return bip39GenerateMnemonic();
  }, []);

  const generateKeyPair = useCallback(async () => {
    setIsProcessing(true);
    try {
      if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: "RSA-OAEP",
            modulusLength: RSA_KEY_SIZE,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
            hash: "SHA-256",
          },
          true, // Can be extracted
          ["encrypt", "decrypt"]
        );
        setIsProcessing(false);
        return keyPair;
      }
      throw new Error("Web Crypto API not supported.");
    } catch (error) {
      console.error("Key generation failed:", error);
      setIsProcessing(false);
      return null;
    }
  }, []);

  /**
   * Derives an encryption key from a mnemonic and salt using PBKDF2.
   */
  const getDerivedEncryptionKey = useCallback(async (mnemonic: string, salt: Uint8Array) => {
    const seed = await mnemonicToSeed(mnemonic);
    const importedSeed = await window.crypto.subtle.importKey(
        "raw",
        seed,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: PBKDF2_ITERATIONS,
            hash: "SHA-256",
        },
        importedSeed,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
  }, []);

  /**
   * Encrypts a private key using a key derived from the recovery phrase.
   */
  const encryptPrivateKey = useCallback(async (privateKey: CryptoKey, mnemonic: string) => {
    setIsProcessing(true);
    try {
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const derivedKey = await getDerivedEncryptionKey(mnemonic, salt);
        
        const jwk = await window.crypto.subtle.exportKey("jwk", privateKey);
        const keyString = JSON.stringify(jwk);
        const encodedKey = new TextEncoder().encode(keyString);

        const encryptedKey = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            derivedKey,
            encodedKey
        );

        setIsProcessing(false);
        return {
            encryptedKey: arrayBufferToBase64(encryptedKey),
            salt: arrayBufferToBase64(salt),
            iv: arrayBufferToBase64(iv),
        };
    } catch (error) {
        console.error("Encryption failed:", error);
        setIsProcessing(false);
        return null;
    }
  }, [getDerivedEncryptionKey]);

  /**
   * Decrypts a private key using the recovery phrase.
   */
  const decryptPrivateKey = useCallback(async (encryptedKeyVault: {encryptedKey: string, salt: string, iv: string}, mnemonic: string) => {
    setIsProcessing(true);
    try {
        const salt = base64ToArrayBuffer(encryptedKeyVault.salt);
        const iv = base64ToArrayBuffer(encryptedKeyVault.iv);
        const encryptedKey = base64ToArrayBuffer(encryptedKeyVault.encryptedKey);

        const derivedKey = await getDerivedEncryptionKey(mnemonic, salt);

        const decryptedKeyData = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            derivedKey,
            encryptedKey
        );

        const keyString = new TextDecoder().decode(decryptedKeyData);
        const jwk = JSON.parse(keyString);

        const privateKey = await window.crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "RSA-OAEP",
                hash: "SHA-256",
            },
            true,
            ["decrypt"]
        );

        setIsProcessing(false);
        return privateKey;
    } catch (error) {
        console.error("Decryption failed. Incorrect recovery phrase or corrupted data.", error);
        setIsProcessing(false);
        return null;
    }
  }, [getDerivedEncryptionKey]);

  const validateMnemonic = useCallback((mnemonic: string) => {
    return bip39ValidateMnemonic(mnemonic);
  }, []);

  return { isProcessing, generateMnemonic, generateKeyPair, validateMnemonic, encryptPrivateKey, decryptPrivateKey };
}
