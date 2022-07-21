const express = require('express');
const router = express.Router();

const mAuth = require('../middlewares/auth');

router.post('/signin', mAuth.signin);
router.post('/signup', mAuth.signup);
router.post('/refresh-token', mAuth.refreshToken);

module.exports = router;