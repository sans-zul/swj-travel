const express = require('express');
const router = express.Router();

const g = require('./../../../config/utils');
const db = require('./../../../models');
const categoryDB = db.swj_kategori;
const listingDB = db.swj_listing;
const informasiDB = db.information;

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
            title: "Data Informasi",
        };
        res.render('admin/master/informasi', data);
    } else {
        res.redirect('/');
    }
});

router.get('/add', async (req, res, next) => {
    if (req.session.login) {
        const data = {
            listing: await listingDB.findAll({}) ?
                await listingDB.findAll({}) : [],
            data_admin: {
                name: "Sans", //req.session.data_admin.admin,
                role: {
                    label: "Dev"
                } //role
            },
            category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
            base_url: g.baseUrl,
            title: "Data Informasi",
        };
        res.render('add/master/add_informasi', data);
    } else {
        res.redirect('/');
    }
});

router.post('/add/category', async (req, res, next) => {
    if (req.session.login) {

        const data = [];

        let category = await categoryDB.findAll();

        for (let i = 0; i < category.length; i++) {
            let list = await listingDB.findAll({
                where: {
                    id_category: category[i].id
                }
            });
            for (let j = 0; j < list.length; j++) {
                data.push({
                    category: category[i],
                    list
                })
            }
        }
        res.send(data);
    } else {
        res.redirect('/');
    }
});

router.get('/edit/:edit_id', (req, res, next) => {
    if (req.session.login) {
        informasiDB.findByPk(req.params.edit_id)
            .then(async (informasi) => {
                if (informasi != null) {
                    const data = {
                        informasi: informasi.dataValues,
                        data_admin: {
                            name: "Sans", //req.session.data_admin.admin,
                            role: {
                                label: "Dev"
                            } //role
                        },
                        category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
                        base_url: g.baseUrl,
                        title: "Data Informasi",
                    };
                    res.render('edit/master/edit_informasi', data);
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

router.post('/edit/:edit_id/category', async (req, res, next) => {
    if (req.session.login) {


        const data = [];

        let category = await categoryDB.findAll();
        let informasi = await informasiDB.findByPk(req.params.edit_id) ? await informasiDB.findByPk(req.params.edit_id) : [];

        data.push(informasi)

        for (let i = 0; i < category.length; i++) {
            let list = await listingDB.findAll({
                where: {
                    id_category: category[i].id
                }
            });
            for (let j = 0; j < list.length; j++) {
                data.push({
                    category: category[i],
                    list
                })
            }
        }
        res.send(data);
    } else {
        res.redirect('/');
    }
});

router.post('/add/swj', (req, res, next) => {
    if (req.session.login) {

        const id_category = req.body.category;
        const produk = req.body.nama;
        const price = req.body.price;
        const description = req.body.description;
        const image = req.body.image;

        if (!produk) {
            res.status(500).send({
                message: "Masukan Nama Produk"
            });
            return;
        }

        if (!description) {
            res.status(500).send({
                message: "Masukan Data Deskripsi atau isi - jika tidak ada deskripsi"
            });
        }

        if (!price) {
            res.status(500).send({
                message: "Masukan Data Price"
            });
        } else {
            if (isNaN(price)) {
                res.status(500).send({
                    message: "Masukan Data Price dengan hanya angka"
                });
            }
        }

        informasiDB.findAll({
                limit: 1,
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(async (k) => {

                let list = await listingDB.findByPk(id_category);

                let data_add = {
                    id_category: list.dataValues.id_category,
                    produk,
                    price,
                    description,
                    id_sub_category: list.dataValues.id,
                    image
                };
                if (k.length > 0) {
                    data_add.id = k[0].id + 1;
                } else {
                    data_add.id = 1;
                }
                informasiDB.create(data_add)
                    .then(data => {
                        res.redirect("/master/informasi");
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

router.post('/edit/:id/swj', async (req, res, next) => {
    if (req.session.login) {

        const id = req.params.id;
        const id_category = req.body.category;
        const produk = req.body.nama;
        const price = req.body.price;
        const description = req.body.description;
        const image = req.body.image;

        if (!produk) {
            res.status(500).send({
                message: "Masukan Nama Produk"
            });
            return;
        }

        if (!description) {
            res.status(500).send({
                message: "Masukan Data Deskripsi atau isi - jika tidak ada deskripsi"
            });
        }

        if (!price) {
            res.status(500).send({
                message: "Masukan Data Price"
            });
        } else {
            if (isNaN(price)) {
                res.status(500).send({
                    message: "Masukan Data Price dengan hanya angka"
                });
            }
        }

        let list = await listingDB.findByPk(id_category);

        let data_edit = {
            id_category: list.dataValues.id_category,
            produk,
            price,
            description,
            id_sub_category: list.dataValues.id,
            image
        };

        informasiDB.update(data_edit, {
                where: {
                    id
                }
            })
            .then(num => {
                res.redirect("/master/informasi");
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

        await informasiDB.destroy({
            where: {
                id
            }
        });

        res.send({
            message: "Success"
        });

    } else {
        res.redirect('/');
    }
});

module.exports = router;