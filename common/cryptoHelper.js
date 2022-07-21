const crypto = require('crypto');

// https://yceffort.kr/2020/06/encryption-decryption-nodejs
// https://nodejs.org/api/crypto.html
/**
 * @param {string} text - string "host,port,user,pass"
 * @param {string} enckey - aes256 - 256bit(32byte)
 * @returns {string} encrypted hexstring "iv:host,port,user,pass"
 */
function encrypt(text, enckey) {
    const iv = crypto.randomBytes(16)
    console.log(Buffer.from(enckey).length)
    console.log(Buffer.from(enckey))

    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(enckey),
        iv
    )

    const encrypted = Buffer.concat([
        cipher.update(text),
        cipher.final()
    ]);

    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

/**
 * @param {string} text - encrypted hexstring "iv:host,port,user,pass"
 * @param {string} enckey - aes256 - 256bit(32byte)
 * @returns {string} decrypted string "host,port,user,pass"
 */
function decrypt(text, enckey) {
    const [stringIV, stringEncrypted] = text.split(':')
    const iv = Buffer.from(stringIV, 'hex');
    const encrypted = Buffer.from(stringEncrypted, 'hex');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(enckey),
        iv
    )
    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]);
    return decrypted.toString()
}

function hash(data, key) {
    return crypto.createHmac('sha256', key)
        .update(data).digest('hex')
}

module.exports = {
    encrypt,
    decrypt,
    hash
}