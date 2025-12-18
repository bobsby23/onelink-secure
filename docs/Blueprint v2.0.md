# OneLink Strategic Blueprint v2.0: The Privacy-First Social Identity Vault

## 1. Executive Summary
[cite_start]OneLink is a "Trust No One" (TNO) digital identity hub[cite: 3]. [cite_start]It transforms the link-in-bio concept into a sovereign social vault using client-side encryption to ensure neither the platform nor third parties can access user data without explicit permission[cite: 3, 5].

## 2. Technical Architecture
### 2.1 Technology Stack
* [cite_start]**Frontend:** Next.js 14+ (App Router), TypeScript 5, Tailwind CSS, Framer Motion[cite: 46, 47, 48].
* [cite_start]**State Management:** Zustand (for managing decrypted keys in memory)[cite: 50].
* [cite_start]**Cryptography:** Native Web Crypto API (SubtleCrypto)[cite: 49].
* [cite_start]**Backend (Firebase):** Firestore (NoSQL), Auth (Identity), Storage (Encrypted Blobs), Cloud Functions 2nd Gen[cite: 51, 52, 53, 54, 55].

### 2.2 Security & Encryption Model
* [cite_start]**Identity:** RSA-OAEP (2048-bit) for key exchange[cite: 131].
* [cite_start]**Content:** AES-GCM (256-bit) for block encryption[cite: 131].
* [cite_start]**Key Derivation:** PBKDF2 (100k iterations) for Recovery Phrases[cite: 132].
* [cite_start]**Flow:** Encryption happens strictly in the client browser; private keys are never sent to Firebase[cite: 59, 61, 62].

## 3. Feature Specifications
### 3.1 Modular Bento Grid
* [cite_start]**Structure:** 4-column matrix responsive layout[cite: 83, 91].
* [cite_start]**Blocks:** 1x1 (Icons), 2x1 (Banners), 2x2 (Images/Products), 4x2 (Video)[cite: 85, 87, 89, 90].
* [cite_start]**Visibility:** Public, Friends (Shared Secret), or Private (Personal Key)[cite: 39, 41, 42].

### 3.2 "Chatbud" AI Agent
* [cite_start]**Function:** AI chatbot answering visitor queries using only public block data[cite: 93, 94].
* [cite_start]**Privacy:** No access to private or friend-only blocks[cite: 94].

### 3.3 Encrypted Commerce
* [cite_start]**Process:** Client-side file encryption before upload[cite: 99].
* [cite_start]**Delivery:** Cloud Function verifies Stripe payment and facilitates secure decryption key delivery to the buyer[cite: 100, 101, 102].

## 4. Database Schema (Firestore)
* [cite_start]**/users/{userId}:** Profile info and `key_vault` (encrypted private key + salt)[cite: 106, 108].
* [cite_start]**/users/{userId}/blocks/{blockId}:** Type, position, visibility, and `encrypted_blob` with `iv`[cite: 109, 112, 113, 114, 115, 116].
* [cite_start]**/users/{userId}/connections/{connectionId}:** Status and `shared_secret` (encrypted)[cite: 117, 118, 119].

## 5. Security Rules
* [cite_start]**Public Blocks:** `allow read: if resource.data.visibility == 'public';`[cite: 125].
* [cite_start]**Owner:** `allow read, write: if request.auth.uid == userId;`[cite: 127].