module.exports = {
    ...process.env,
    APP_NAME: 'APP',
    APP_VERSION: '1.0.0',
    UPLOAD_DIR: 'uploads',
    HASH_SECRET: 'hashSecret',
    ACCESS_TOKEN_SECRET: 'accessTokenSecret',
    REFRESH_TOKEN_SECRET: 'refreshTokenSecret',
    ACCESS_TOKEN_EXPIRES_IN: '10s',
    REFRESH_TOKEN_EXPIRES_IN: '14d',
}