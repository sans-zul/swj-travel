const express = require('express');
const router = express.Router();
const shell = require('shelljs');
const load = require('express-load');

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
            title: "Category",
        };
        res.render('admin/app/category', data);
    } else {
        res.redirect('/');
    }
});

router.get('/add', async (req, res, next) => {
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
            title: "Category"
        };
        res.render('add/app/add_category', data);
    } else {
        res.redirect('/');
    }
});

router.get('/edit/:edit_id', (req, res, next) => {
    if (req.session.login) {
        categoryDB.findByPk(req.params.edit_id)
            .then(async (resultCategory) => {
                if (resultCategory != null) {
                    const data = {
                        resultCategory,
                        data_admin: {
                            name: "Sans", //req.session.data_admin.admin,
                            role: {
                                label: "Dev"
                            } //role
                        },
                        category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
                        base_url: g.baseUrl,
                        title: "Category"
                    };
                    res.render('edit/app/edit_category', data);
                } else {
                    res.redirect('/');
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

    } else {
        res.redirect('/');
    }
});

router.post('/add/swj', (req, res, next) => {
    if (req.session.login) {

        const name = req.body.nama;
        const url = req.body.url;
        const icon = req.body.icon;
        const description = req.body.description;
        var status = req.body.status;

        if (!name) {
            res.status(500).send({
                message: "Masukan Nama Category"
            });
            return;
        }

        if (!url) {
            res.status(500).send({
                message: "Masukan Data URL"
            });
            return;
        } else {
            if (url.split("/").length > 3) {
                res.status(500).send({
                    message: "URL Terdiri dari 2 buah pathname"
                });
                return;
            } else {
                if (url.split("/")[1] != "swj") {
                    res.status(500).send({
                        message: "URL Pathname pertama bernama swj, contoh: /swj/data_baru"
                    });
                    return;
                }
            }
        }

        if (!icon) {
            res.status(500).send({
                message: "Masukan Data Longitude"
            });
            return;
        }

        if (!description) {
            res.status(500).send({
                message: "Masukan Data Deskripsi"
            });
        }

        if (!status) {
            var status = 0;
        } else {
            var status = 1;
        }

        categoryDB.findAll({
                limit: 1,
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(k => {
                let data_add = {
                    name,
                    status,
                    url,
                    icon,
                    description,
                };
                if (k.length > 0) {
                    data_add.id = k[0].id + 1;
                } else {
                    data_add.id = 1;
                }
                categoryDB.create(data_add).then(data => {
                        res.redirect('/users/category');
                        // load('routes').into(req.app);
                        // setTimeout(function () {
                        //     shell.exec('touch server.js');
                        // }, 3000);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

    } else {
        res.redirect('/');
    }
});

router.post('/edit/:id/swj', (req, res, next) => {
    if (req.session.login) {

        const id = req.params.id;
        const name = req.body.nama;
        const url = req.body.url;
        const icon = req.body.icon;
        const description = req.body.description;
        var status = req.body.status;

        if (!name) {
            res.status(500).send({
                message: "Masukan Nama Category"
            });
            return;
        }

        if (!url) {
            res.status(500).send({
                message: "Masukan Data URL"
            });
            return;
        } else {
            if (url.split("/").length > 3) {
                res.status(500).send({
                    message: "URL Terdiri dari 2 buah pathname"
                });
                return;
            } else {
                if (url.split("/")[1] != "swj") {
                    res.status(500).send({
                        message: "URL Pathname pertama bernama swj, contoh: /swj/data_baru"
                    });
                    return;
                }
            }
        }

        if (!icon) {
            res.status(500).send({
                message: "Masukan Data Longitude"
            });
            return;
        }

        if (!description) {
            res.status(500).send({
                message: "Masukan Data Deskripsi"
            });
        }

        if (!status) {
            var status = 0;
        } else {
            var status = 1;
        }

        let data_edit = {
            name,
            status,
            url,
            icon,
            description,
        };

        categoryDB.update(data_edit, {
                where: {
                    id
                }
            })
            .then(num => {
                res.redirect('/users/category');
                // setTimeout(function () {
                //     shell.exec('touch server.js');
                // }, 3000);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

    } else {
        res.status(500).send({
            message: err.message
        });
    }
});

router.delete('/delete/:id/swj', async (req, res, next) => {
    if (req.session.login) {
        const id = req.params.id;

        await categoryDB.destroy({
            where: {
                id
            }
        });

        res.send({
            message: "Success"
        });

        // setTimeout(function () {
        //     shell.exec('touch server.js');
        // }, 3000);
    } else {
        res.redirect('/');
    }
});

module.exports = router;