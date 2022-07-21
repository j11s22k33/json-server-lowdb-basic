const express = require('express');
const router = express.Router();

const mAuth = require('../middlewares/auth');

router.get('/', function (req, res, next) {
    // ./views/index.pug
    res.render('index', {title: 'Hi!', message: 'pug Template Test'}); // template
    // res.send(200, 'Test');
    // res.redirect('/dist/');
    // res.sendFile(__dirname + '/dist/index.html');
});

router.get('/error', (req, res) => {
    throw new Error('에러발생'); // express가 에러처리
});

router.get('/error2', (req, res, next) => {
    next(new Error('에러발생')); // next() 함수를 사용해서 에러 처리 핸들러로 에러 전달합니다.
});

router.get('/signin', mAuth.signin);
router.get('/refresh-token', mAuth.refreshToken);
router.get('/user', mAuth.verifyToken, (req, res, next) => {
    res.send({name: 'name', age: 20, addr: 'Seoul/Asia'})
});

module.exports = router;