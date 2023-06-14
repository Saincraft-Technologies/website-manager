const crypto = require('crypto');
class TokenGenerator {
    static generateToken() {
        return crypto.randomUUID();
    }

    static encryptToken(token, encryptionKey) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
        let encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + encrypted;
    }

    static decryptToken(encryptedToken, encryptionKey) {
        const iv = Buffer.from(encryptedToken.slice(0, 32), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
        let decrypted = decipher.update(encryptedToken.slice(32), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}
module.exports = TokenGenerator;