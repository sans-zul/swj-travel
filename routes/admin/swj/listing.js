var express = require('express');
var router = express.Router();

var g = require('./../../../config/utils');
var db = require('./../../../models');
var categoryDB = db.swj_kategori;
var listingDB = db.swj_listing;
var reviewDB = db.review;
var informasiDB = db.information;

async function listingFunction() {
    var category = await categoryDB.findAll();
    for (let i = 0; i < category.length; i++) {
        let nameMenu = category[i].name.trim().toLowerCase();
        let urlMenu = category[i].url.trim().toLowerCase();

        router.get('/' + nameMenu + '/', async function (req, res, next) {
            if (req.session.login) {
                var data = {
                    data_admin: {
                        name: "Sans", //req.session.data_admin.admin,
                        role: {
                            label: "Dev"
                        } //role
                    },
                    swj: {
                        label: nameMenu,
                        url: urlMenu
                    },
                    category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
                    base_url: g.baseUrl,
                    title: category[i].name.trim(),
                };
                res.render('admin/swj/listing', data);
            } else {
                res.redirect('/');
            }
        });

        router.get('/' + nameMenu + '/add', async (req, res, next) => {
            if (req.session.login) {
                const data = {
                    data_admin: {
                        name: "Sans", //req.session.data_admin.admin,
                        role: {
                            label: "Dev"
                        } //role
                    },
                    swj: {
                        label: nameMenu,
                        url: urlMenu
                    },
                    category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
                    base_url: g.baseUrl,
                    title: category[i].name.trim(),
                };
                res.render('add/swj/add_listing', data);
            } else {
                res.redirect('/');
            }
        });

        router.get('/' + nameMenu + '/edit/:edit_id', (req, res, next) => {
            if (req.session.login) {
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
                                    label: nameMenu,
                                    url: urlMenu
                                },
                                category: await categoryDB.findAll() ? await categoryDB.findAll() : [],
                                base_url: g.baseUrl,
                                title: category[i].name.trim(),
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

            } else {
                res.redirect('/');
            }
        });


        router.post('/' + nameMenu + '/add/swj', (req, res, next) => {
            if (req.session.login) {

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
                        message: "Masukan Nama " + nameMenu
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
                            id_category: category[i].dataValues.id,
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
                                res.redirect(urlMenu);
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


        router.post('/' + nameMenu + '/edit/:id/swj', (req, res, next) => {
            if (req.session.login) {

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
                            id_category: category[i].dataValues.id,
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
                                res.redirect(urlMenu);
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
                res.status(500).send({
                    message: err.message
                });
            }
        });


        router.delete('/' + nameMenu + '/delete/:id/swj', async (req, res, next) => {
            if (req.session.login) {
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

            } else {
                res.redirect('/');
            }
        });


    }
}
listingFunction();



module.exports = router;