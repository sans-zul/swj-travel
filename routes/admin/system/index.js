const express = require('express');
const router = express.Router();

const menu_01 = require('./user');
const menu_02 = require('./role');

router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

router.use('/user', menu_01);
router.use('/role', menu_02);

module.exports = router;