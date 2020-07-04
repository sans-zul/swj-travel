const g = require('./../config/utils');
const express = require('express');
const router = express.Router();
const sha1 = require('sha1');

const db = require('./../models');
const Admin = db.admin;

const dashboardPage = require('./admin/dashboard.js');
const swjPage = require('./admin/swj/index');
const masterPage = require('./admin/master/index');
const systemPage = require('./admin/system/index');
const appPage = require('./admin/app/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.login) {
    res.redirect('/dashboard');
  } else {
    next();
  }
});

/* GET Login Page */
router.get('/', function (req, res, next) {
  if (!req.session.login) {
    const data = {
      base_url: g.baseUrl,
      title: "Login - TRON",
      alert: {
        message: req.flash('alertMessage'),
        status: req.flash('alertStatus'),
        txt_username: req.flash('txt_username')
      }
    };
    res.render('auth/login', data);
  } else {
    res.redirect('/dashboard');
  }
})

/* POST Login Page */
router.post('/', function (req, res, next) {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  if (username && password) {
    Admin.findAll({
        where: {
          admin: username,
          password_hash: sha1(password)
        }
      })
      .then(r => {
        if (r.length > 0) {
          r[0].admin = r[0].admin.trim();
          req.session.login = true;
          req.session.data_admin = r[0];
          Admin.update({
              lastlogin: new Date()
            }, {
              where: {
                id: r[0].id
              }
            })
            .then(num => {
              res.redirect('/dashboard');
            })
            .catch(err => {
              res.status(500).send({
                message: err
              });
            });
        } else {
          req.flash('alertMessage', 'No Access ~ Incorrect username or password');
          req.flash('txt_username', username);
          req.flash('alertStatus', 'danger');
          return res.redirect('/');
        }
      })
      .catch(err => {
        req.flash('alertMessage', 'Connection Lost');
        req.flash('txt_username', username);
        req.flash('alertStatus', 'danger');
        return res.redirect('/');
        // res.send(err)
      });
  } else {
    return res.redirect('/');
  }
});

/* GET Log Out */
router.get('/out', function (req, res, next) {
  req.session.login = false;
  res.redirect('/');
});

router.use('/dashboard', dashboardPage);
router.use('/swj', swjPage);
router.use('/master', masterPage);
router.use('/system', systemPage);
router.use('/users', appPage);

module.exports = router;