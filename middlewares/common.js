const handlers = {};
handlers.resError = async (err, req, res, next) => {
    // res.sendStatus(500);
    next(err);
}
handlers.reqCommon = async (req, res, next) => {
    // 요청 URL 정보 출력
    console.info(`<<<<< ${req.method} ${req.originalUrl}`);
    next();
}
module.exports = handlers;