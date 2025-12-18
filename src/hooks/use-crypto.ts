
"use client";

import { useState, useCallback } from "react";
import { generateMnemonic as bip39GenerateMnemonic, validateMnemonic as bip39ValidateMnemonic } from 'bip39';

// Per Blueprint v2.0
const RSA_KEY_SIZE = 2048; 
const PBKDF2_ITERATIONS = 100000;

export function useCrypto() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMnemonic = useCallback(() => {
    return bip39GenerateMnemonic();
  }, []);

  const generateKeyPair = useCallback(async () => {
    setIsGenerating(true);
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
        setIsGenerating(false);
        return keyPair;
      }
      throw new Error("Web Crypto API not supported.");
    } catch (error) {
      console.error("Key generation failed:", error);
      setIsGenerating(false);
      return null;
    }
  }, []);

  const validateMnemonic = useCallback((mnemonic: string) => {
    return bip39ValidateMnemonic(mnemonic);
  }, []);

  return { isGenerating, generateMnemonic, generateKeyPair, validateMnemonic };
}
