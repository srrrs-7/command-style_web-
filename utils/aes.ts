import crypto from 'crypto';

// crypto
const algorithm: string = process.env.NEXT_PUBLIC_ALGORITHM!;
const password: string = process.env.NEXT_PUBLIC_PASSWORD!;
const salt: string = process.env.NEXT_PUBLIC_SALT!;

const key: Buffer = crypto.scryptSync(password, salt, 32);
const iv: Buffer = crypto.randomBytes(16);

const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, key, iv);
const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, key, iv);

const inputEncoding = 'utf8';
const outputEncoding = 'hex';

export function EncryptAES(text: string): string {
    var cipheredData = cipher.update(text, inputEncoding, outputEncoding);
    cipheredData += cipher.final(outputEncoding);
    return cipheredData;
}

export function DecryptAES(cipher: string): string {
    var decipheredData = decipher.update(cipher, outputEncoding, inputEncoding);
    decipheredData += decipher.final(inputEncoding);
    return decipheredData;
}
