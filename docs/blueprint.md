# **App Name**: OneLink Secure

## Core Features:

- Secure Profile Creation: Users create profiles with secure authentication (email/password or passwordless login).
- Link Management: Add, edit, and organize various types of links (public, private, friends-only) with visibility policies.
- End-to-End Encryption: Encrypt sensitive link data client-side using RSA-OAEP for enhanced privacy.
- Profile Sharing: Share profile URLs `/u/{nickname}`) with different visibility levels for different audiences.
- Friend System: Implement a friend system to manage friend relationships for friends-only links. Link access is limited based on friendship status.
- QR Code Generation: Generate QR codes for easy profile sharing.
- Bento Grid Profile: Modular profile layout with drag-and-drop blocks for links, embeds, files, and products.
- Client-Side Encryption: End-to-end encryption for all data using the Web Crypto API, ensuring user data privacy.
- Encrypted Commerce: Securely sell digital goods with client-side encryption and secure key delivery after payment.
- Friend Network (Handshake): ECDH key exchange for secure connections, enabling encrypted DMs and friend-only content.
- Chatbud AI Agent: Client-side AI chatbot that answers visitor queries based on publicly available profile data. The AI acts as a tool and only presents information from approved 'public' profile blocks.
- Key Vault: Securely store the user's private key, encrypted with a recovery phrase.
- Authentication & Onboarding: Secure user authentication and key generation with a recovery phrase for key backup.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) to evoke a sense of security and sophistication.
- Background color: Very light purple (#F3E5F5), almost white, creating a clean backdrop that matches the tone of the primary color.
- Accent color: Indigo (#3F51B5) to provide contrast for interactive elements.
- Headline font: 'Space Grotesk', a proportional sans-serif for headings; Body font: 'Inter', a grotesque-style sans-serif for body text
- Use minimalist icons to represent different content blocks and actions.
- Strict 4-column grid with variable gaps to create a dynamic yet organized layout.
- Subtle blur effects and animations to indicate encryption status and privacy levels, inspired by 'Glassmorphism' and 'Cyberpunk' themes.