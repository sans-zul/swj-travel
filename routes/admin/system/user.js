const express = require('express');
const router = express.Router();

const g = require('./../../../config/utils');
const db = require('./../../../models');
const categoryDB = db.swj_kategori;

router.get('/', async function (req, res, next) {
    if (req.session.login) {
        const data = {
            data_admin: {
                name: "Sans", //req.session.data_admin.admin,
                role: {
                    label: "Dev"
                } //role
            },
            category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
            base_url: g.baseUrl,
            title: "User Management",
        };
        res.render('admin/system/user', data);
    } else {
        res.redirect('/');
    }
});

module.exports = router;