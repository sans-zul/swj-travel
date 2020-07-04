const express = require('express');
const router = express.Router();

const g = require('./../../../config/utils');
const db = require('./../../../models');
const categoryDB = db.swj_kategori;
const listingDB = db.swj_listing;
const reviewDB = db.review;
const informasiDB = db.information;

router.get('/:nama_menu', async function (req, res, next) {
    if (req.session.login) {

        let category = await categoryDB.findAll();

        for (let z = 0; z < category.length; z++) {
            if (req.params.nama_menu == category[z].name.trim().toLowerCase()) {

                const data = {
                    data_admin: {
                        name: "Sans", //req.session.data_admin.admin,
                        role: {
                            label: "Dev"
                        } //role
                    },
                    swj: {
                        label: category[z].name.trim().toLowerCase(),
                        url: category[z].url.trim().toLowerCase()
                    },
                    category: category ? category : [],
                    base_url: g.baseUrl,
                    title: category[z].name.trim(),
                };
                return res.render('admin/swj/listing', data);
            }
        }
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

router.get('/:nama_menu/add', async (req, res, next) => {
    if (req.session.login) {

        let category = await categoryDB.findAll();

        for (let z = 0; z < category.length; z++) {
            if (req.params.nama_menu == category[z].name.trim().toLowerCase()) {

                const data = {
                    data_admin: {
                        name: "Sans", //req.session.data_admin.admin,
                        role: {
                            label: "Dev"
                        } //role
                    },
                    swj: {
                        label: category[z].name.trim().toLowerCase(),
                        url: category[z].url.trim().toLowerCase()
                    },
                    category: category ? category : [],
                    base_url: g.baseUrl,
                    title: category[z].name.trim(),
                };
                return res.render('add/swj/add_listing', data);
            }
        }
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

router.get('/:nama_menu/edit/:edit_id', async (req, res, next) => {
    if (req.session.login) {

        let category = await categoryDB.findAll();

        for (let z = 0; z < category.length; z++) {
            if (req.params.nama_menu == category[z].name.trim().toLowerCase()) {

                listingDB.findByPk(req.params.edit_id)
                    .then(async (listing) => {
                        if (listing != null) {
                            const data = {
                                listing: listing.dataValues,
                                data_admin: {
                                    name: "Sans", //req.session.data_admin.admin,
                                    role: {
                                        label: "Dev"
                                    } //role
                                },
                                swj: {
                                    label: category[z].name.trim().toLowerCase(),
                                    url: category[z].url.trim().toLowerCase()
                                },
                                category: category ? category : [],
                                base_url: g.baseUrl,
                                title: category[z].name.trim(),
                            };
                            res.render('edit/swj/edit_listing', data);
                        } else {
                            res.redirect('/');
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
                return;
            }
        }
        res.redirect('/');

    } else {
        res.redirect('/');
    }
});


router.post('/:nama_menu/add/swj', async (req, res, next) => {
    if (req.session.login) {

        let category = await categoryDB.findAll();

        for (let z = 0; z < category.length; z++) {
            if (req.params.nama_menu == category[z].name.trim().toLowerCase()) {

                const nama = req.body.nama;
                const price = req.body.price;
                const lat = req.body.latitude;
                const lon = req.body.longitude;
                const image = req.body.image;
                const description = req.body.description;
                const address = req.body.address;
                const featured = req.body.fitur;

                if (!nama) {
                    res.status(500).send({
                        message: "Masukan Nama " + category[z].name.trim().toLowerCase()
                    });
                    return;
                }

                if (!lat) {
                    res.status(500).send({
                        message: "Masukan Data Latitude"
                    });
                    return;
                } else {
                    if (lat.split(".").length > 2) {
                        res.status(500).send({
                            message: "Data Latitude Tidak Valid"
                        });
                        return;
                    } else {
                        for (let i = 0; i < lat.split(".").length; i++) {
                            if (isNaN(lat.split(".")[i])) {
                                res.status(500).send({
                                    message: "Data Latitude Tidak Valid"
                                });
                                return;
                            }
                        }
                    }
                }

                if (!lon) {
                    res.status(500).send({
                        message: "Masukan Data Longitude"
                    });
                    return;
                } else {
                    if (lon.split(".").length > 2) {
                        res.status(500).send({
                            message: "Data Longitude Tidak Valid"
                        });
                        return;
                    } else {
                        for (let i = 0; i < lon.split(".").length; i++) {
                            if (isNaN(lon.split(".")[i])) {
                                res.status(500).send({
                                    message: "Data Longitude Tidak Valid"
                                });
                                return;
                            }
                        }
                    }
                }

                if (!featured) {
                    res.status(500).send({
                        message: "Masukan Minimum Satu Fitur"
                    });
                } else {
                    if (isNaN(featured)) {
                        res.status(500).send({
                            message: "Masukan Data Featured dengan ID"
                        });
                    }
                }

                if (!description) {
                    res.status(500).send({
                        message: "Masukan Data Deskripsi atau isi - jika tidak ada deskripsi"
                    });
                }

                if (!address) {
                    res.status(500).send({
                        message: "Masukan Alamat"
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

                listingDB.findAll({
                        limit: 1,
                        order: [
                            ['id', 'DESC']
                        ]
                    })
                    .then(k => {
                        let data_add = {
                            id_category: category[z].dataValues.id,
                            nama,
                            description,
                            address,
                            price,
                            lat,
                            lon,
                            image,
                            read_count: 0,
                            featured,
                            rating: 0
                        };
                        if (k.length > 0) {
                            data_add.id = k[0].id + 1;
                        } else {
                            data_add.id = 1;
                        }
                        listingDB.create(data_add)
                            .then(data => {
                                res.redirect(category[z].url.trim().toLowerCase());
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
                return;
            }
        }
        res.redirect('/');

    } else {
        res.redirect('/');
    }
});

router.post('/:nama_menu/edit/:id/swj', async (req, res, next) => {
    if (req.session.login) {

        let category = await categoryDB.findAll();

        for (let z = 0; z < category.length; z++) {
            if (req.params.nama_menu == category[z].name.trim().toLowerCase()) {

                const id = req.params.id;
                const nama = req.body.nama;
                const price = req.body.price;
                const lat = req.body.latitude;
                const lon = req.body.longitude;
                const image = req.body.image;
                const description = req.body.description;
                const address = req.body.address;
                const featured = req.body.fitur;

                if (!nama) {
                    res.status(500).send({
                        message: "Masukan Nama Wisata"
                    });
                    return;
                }

                if (!lat) {
                    res.status(500).send({
                        message: "Masukan Data Latitude"
                    });
                    return;
                } else {
                    if (lat.split(".").length > 2) {
                        res.status(500).send({
                            message: "Data Latitude Tidak Valid"
                        });
                        return;
                    } else {
                        for (let i = 0; i < lat.split(".").length; i++) {
                            if (isNaN(lat.split(".")[i])) {
                                res.status(500).send({
                                    message: "Data Latitude Tidak Valid"
                                });
                                return;
                            }
                        }
                    }
                }

                if (!lon) {
                    res.status(500).send({
                        message: "Masukan Data Longitude"
                    });
                    return;
                } else {
                    if (lon.split(".").length > 2) {
                        res.status(500).send({
                            message: "Data Longitude Tidak Valid"
                        });
                        return;
                    } else {
                        for (let i = 0; i < lon.split(".").length; i++) {
                            if (isNaN(lon.split(".")[i])) {
                                res.status(500).send({
                                    message: "Data Longitude Tidak Valid"
                                });
                                return;
                            }
                        }
                    }
                }

                if (!featured) {
                    res.status(500).send({
                        message: "Masukan Minimum Satu Fitur"
                    });
                } else {
                    if (isNaN(featured)) {
                        res.status(500).send({
                            message: "Masukan Data Featured dengan ID"
                        });
                    }
                }

                if (!description) {
                    res.status(500).send({
                        message: "Masukan Data Deskripsi atau isi - jika tidak ada deskripsi"
                    });
                }

                if (!address) {
                    res.status(500).send({
                        message: "Masukan Alamat"
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


                reviewDB.findOne({
                        attributes: [
                            [db.Sequelize.fn('avg', db.Sequelize.col('rating')), 'average_rating']
                        ],
                        where: {
                            id_category: id
                        }
                    })
                    .then(async (review) => {

                        let data_edit = {
                            id_category: category[z].dataValues.id,
                            nama,
                            description,
                            address,
                            price,
                            lat,
                            lon,
                            image,
                            featured,
                            rating: review.dataValues.average_rating ? review.dataValues.average_rating : 0
                        };

                        listingDB.update(data_edit, {
                                where: {
                                    id
                                }
                            })
                            .then(num => {
                                res.redirect(category[z].url.trim().toLowerCase());
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
                return;
            }
        }
        res.redirect('/');

    } else {
        res.redirect('/');
    }
});

router.delete('/:nama_menu/delete/:id/swj', async (req, res, next) => {
    if (req.session.login) {

        let category = await categoryDB.findAll();

        for (let z = 0; z < category.length; z++) {
            if (req.params.nama_menu == category[z].name.trim().toLowerCase()) {

                const id = req.params.id;

                await listingDB.destroy({
                    where: {
                        id
                    }
                });

                await reviewDB.destroy({
                    where: {
                        id_category: id
                    }
                });

                await informasiDB.destroy({
                    where: {
                        id_category: id
                    }
                });

                res.send({
                    message: "Success"
                });

                return;
            }
        }
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

module.exports = router;