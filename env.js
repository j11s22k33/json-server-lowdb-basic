module.exports = {
    ...process.env,
    UPLOAD_DIR: 'uploads',
    ACCESS_TOKEN_SECRET: 'accessTokenSecret',
    ACCESS_TOKEN_EXPIRES_IN: '10s',
    REFRESH_TOKEN_SECRET: 'refreshTokenSecret',
    REFRESH_TOKEN_EXPIRES_IN: '14d',
    HASH_SECRET: 'hashSecret',
}