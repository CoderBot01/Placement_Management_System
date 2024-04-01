import crypto from 'crypto';

// Define a static IV
const staticIV = Buffer.from('0123456789ABCDEF0123456789ABCDEF', 'hex');
const staticKey = Buffer.from('0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF', 'hex');

function encryptMessage(message, key, iv) {
    // Convert message to buffers
    const messageBuffer = Buffer.from(message, 'utf8');

    // Create cipher object with AES algorithm and CBC mode
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Pad the message
    let paddedData = Buffer.concat([messageBuffer, Buffer.alloc(16 - (messageBuffer.length % 16), 16 - (messageBuffer.length % 16))]);

    // Encrypt the message
    let encrypted = cipher.update(paddedData);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Return ciphertext
    return encrypted.toString('hex');
}

function decryptMessage(ciphertext, key, iv) {
    // Convert ciphertext and IV to buffers
    const ciphertextBuffer = Buffer.from(ciphertext, 'hex');

    // Create decipher object with AES algorithm and CBC mode
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Decrypt the ciphertext
    let decrypted = decipher.update(ciphertextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Remove padding
    const lastByte = decrypted[decrypted.length - 1];
    const paddingSize = lastByte;
    const unpaddedData = decrypted.slice(0, decrypted.length - paddingSize);

    // Return decrypted message as string
    return unpaddedData.toString('utf8');
}




const username = 'admin'; // Username to encrypt

// Encrypt the username with static IV
const encryptedUsername = encryptMessage(username, staticKey, staticIV);
console.log("Encrypted:", encryptedUsername);


// Decrypt the username with static IV
const decryptedUsername = decryptMessage(encryptedUsername, staticKey, staticIV);
console.log("Decrypted:", decryptedUsername);
