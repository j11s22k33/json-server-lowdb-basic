const jwt = require('jsonwebtoken');
const {hash} = require('../common/cryptoHelper');
const env = require('../env');

const jwtUtil = {
    createAccessToken(payload) {
        const token = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {expiresIn: env.ACCESS_TOKEN_EXPIRES_IN});
        return token;
    },
    createRefreshToken(payload) {
        const token = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {expiresIn: env.REFRESH_TOKEN_EXPIRES_IN});
        return token;
    },
    createTokenPayload(obj) {
        // payload.exp=10s, options.expiresIn=10s 둘다 설정하면 토큰생성시 오류난다. options에만 설정하자
        ['iat', 'exp', 'nbf'].forEach(attr => delete obj[attr]);
        return obj;
    }
}

const handlers = {};

/**
 * accessToken, refreshToken 발급
 */
handlers.signup = async (req, res, next) => {
    res.send('signup');
}
/**
 * accessToken, refreshToken 발급
 */
handlers.signin = async (req, res, next) => {
    const {id, pass} = req.body;
    /**
     * db 패스워드와 비교
     */
    const loginDataPassHash = hash(pass, env.HASH_SECRET);
    const dbUserPassHash = hash('1111', env.HASH_SECRET);
    if (loginDataPassHash !== dbUserPassHash) {
        // db pass 비교
        return res.sendStatus(403);
    }

    /**
     * 토큰 생성
     */
    const tokenData = {
        id
    }
    const payload = jwtUtil.createTokenPayload(tokenData);
    const accessToken = jwtUtil.createAccessToken(payload);
    const refreshToken = jwtUtil.createRefreshToken(payload);
    // logger.info(jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET));
    // logger.info(jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET));
    res.status(200).json({message: 'success', accessToken, refreshToken});
}
/**
 * accessToken 검증
 * - 401 - 로그인 필요하다
 * - 419 - refreshToken 요청해야 한다
 * - 500 - 서버 에러
 */
handlers.verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    // const token = req.headers["Authorization"];
    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        // logger.info(decoded);
        next()
    } catch (e) {
        if (/TokenExpiredError/.test(e.name)) {
            res.sendStatus(419)
        } else if (/JsonWebTokenError/.test(e.name)) {
            res.sendStatus(401)
        } else if (/NotBeforeError/.test(e.name)) {
            res.sendStatus(401)
        } else {
            res.sendStatus(500)
        }
    }
}
/**
 * accessToken 재발급
 * - refreshToken 검증 오류 발생시 accessToken,refreshToken 새로 받아야 한다
 * - 401 - 로그인 필요하다
 * - 419 - refreshToken 요청해야 한다
 * - 500 - 서버 에러
 */
handlers.refreshToken = async (req, res, next) => {
    // const token = req.headers['refreshToken'];
    const token = req.body.refreshToken;
    try {
        let decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
        // logger.info(decoded);

        const payload = jwtUtil.createTokenPayload(decoded);
        const accessToken = jwtUtil.createAccessToken(payload);
        res.status(200).json({message: 'success', accessToken});
    } catch (e) {
        if (/TokenExpiredError/.test(e.name)) {
            res.sendStatus(401) // refreshToken 만료되어 새로 발급받아야한다
        } else if (/JsonWebTokenError/.test(e.name)) {
            res.sendStatus(401)
        } else if (/NotBeforeError/.test(e.name)) {
            res.sendStatus(401)
        } else {
            res.sendStatus(500)
        }
    }
}
module.exports = handlers;