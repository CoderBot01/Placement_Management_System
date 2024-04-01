import { randomBytes, createCipheriv } from 'crypto';

function encryptAES(plaintext, key) {
    // Convert the key string to a buffer with correct length (32 bytes for AES-256)
    const keyBuffer = Buffer.from(key, 'utf-8');

    const iv = randomBytes(16); // Generate a random IV (Initialization Vector)
    const cipher = createCipheriv('aes-256-cbc', keyBuffer, iv);

    let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
    ciphertext += cipher.final('base64');

    const encodedIV = iv.toString('base64');
    return encodedIV + ':' + ciphertext; // Concatenate IV and ciphertext with a separator
}

// Example usage:
const plaintext = 'admin';
const key = 'Th!$I$@ENcYPt!0nKEY@1212';
const encryptedText = encryptAES(plaintext, key);
console.log('Encrypted text:', encryptedText);
