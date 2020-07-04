const express = require('express');
const router = express.Router();

const datatable = require('sequelize-datatable');
const db = require('./../../../models');
const categoryDB = db.swj_kategori;
const listingDB = db.swj_listing;
const informasiDB = db.information;
const bannerDB = db.banner;
const reviewDB = db.review;

const menu_01 = require('./informasi');
const menu_02 = require('./banner');
const menu_03 = require('./review');

router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

router.use('/informasi', menu_01);
router.use('/banner', menu_02);
router.use('/review', menu_03);

router.get('/data/:menu', (req, res, next) => {
    if (req.session.login) {
        switch (req.params.menu) {
            case "1": {
                req.query.columns[1].data = "id_category";
                req.query.columns[2].data = "id_sub_category";
                req.query.columns[3].data = "produk";
                req.query.columns[4].data = "price";
                req.query.columns[5].data = "image";
                req.query.columns[6].data = "description";
                const data_filter = {
                    attributes: [
                        'id',
                        ['id_category', 'column_2'],
                        ['id_sub_category', 'column_3'],
                        ['produk', 'column_4'],
                        ['price', 'column_5'],
                        ['image', 'column_6'],
                        ['description', 'column_7'],
                    ],
                };
                datatable(informasiDB, req.query, data_filter, {})
                    .then(async (result) => {
                        const data = [];

                        for (let i = 0; i < result.data.length; i++) {

                            data.push({
                                column_1: i + 1,
                                column_2: await categoryDB.findByPk(result.data[i].column_2) ? (await categoryDB.findByPk(result.data[i].column_2)).name.trim() : "",

                                column_3: await listingDB.findByPk(result.data[i].column_3) ? (await listingDB.findByPk(result.data[i].column_3)).nama.trim() : "",

                                column_4: result.data[i].column_4,
                                column_5: result.data[i].column_5,
                                column_6: result.data[i].column_6,
                                column_7: result.data[i].column_7,
                                column_8: `<div>
                                            <a href="/master/informasi/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                <i class="bx bxs-pencil"></i>
                                                <span class="align-middle ml-25">Edit</span>
                                            </a>
                                            <button class="btn btn-danger mr-1 mb-1" id="master_informasi_` + result.data[i].id + `">
                                                <i class="bx bxs-eraser"></i>
                                                <span class="align-middle ml-25">Hapus</span>
                                            </button>
                                        </div>
                                        <script>load_tombol("","master", "informasi", "` + result.data[i].id + `");</script>`,

                            });

                        }

                        result.data = data;
                        result.recordsTotal = data.length;

                        res.json(result);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
                break;
            }
            case "2": {
                req.query.columns[1].data = "name";
                req.query.columns[2].data = "url";
                const data_filter = {
                    attributes: [
                        'id',
                        ['name', 'column_2'],
                        ['url', 'column_3'],
                    ],
                };
                datatable(bannerDB, req.query, data_filter, {})
                    .then((result) => {
                        const data = [];

                        for (let i = 0; i < result.data.length; i++) {

                            data.push({
                                column_1: i + 1,
                                column_2: result.data[i].column_2,
                                column_3: result.data[i].column_3,
                                column_4: `<div>
                                            <a href="/master/banner/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                <i class="bx bxs-pencil"></i>
                                                <span class="align-middle ml-25">Edit</span>
                                            </a>
                                            <button class="btn btn-danger mr-1 mb-1" id="master_banner_` + result.data[i].id + `">
                                                <i class="bx bxs-eraser"></i>
                                                <span class="align-middle ml-25">Hapus</span>
                                            </button>
                                        </div>
                                        <script>load_tombol("","master", "banner", "` + result.data[i].id + `");</script>`,

                            });

                        }

                        result.data = data;
                        result.recordsTotal = data.length;

                        res.json(result);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
                break;
            }
            case "3": {
                req.query.columns[1].data = "id_category";
                req.query.columns[2].data = "id_sub_category";
                req.query.columns[3].data = "id_rider";
                req.query.columns[4].data = "comment";
                req.query.columns[5].data = "rating";
                const data_filter = {
                    attributes: [
                        'id',
                        ['id_category', 'column_2'],
                        ['id_sub_category', 'column_3'],
                        ['id_rider', 'column_4'],
                        ['comment', 'column_5'],
                        ['rating', 'column_6'],
                    ],
                };
                datatable(reviewDB, req.query, data_filter, {})
                    .then((result) => {
                        const data = [];

                        for (let i = 0; i < result.data.length; i++) {

                            data.push({
                                column_1: i + 1,
                                column_2: result.data[i].column_2,
                                column_3: result.data[i].column_3,
                                column_4: result.data[i].column_4,
                                column_5: result.data[i].column_5,
                                column_6: `<div>
                                            <a href="/master/review/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                <i class="bx bxs-pencil"></i>
                                                <span class="align-middle ml-25">Edit</span>
                                            </a>
                                            <button class="btn btn-danger mr-1 mb-1" id="master_review_` + result.data[i].id + `">
                                                <i class="bx bxs-eraser"></i>
                                                <span class="align-middle ml-25">Hapus</span>
                                            </button>
                                        </div>
                                        <script>load_tombol("","master", "review", "` + result.data[i].id + `");</script>`,

                            });

                        }

                        result.data = data;
                        result.recordsTotal = data.length;

                        res.json(result);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
                break;
            }
        }

    } else {
        res.redirect('/');
    }
});

module.exports = router;