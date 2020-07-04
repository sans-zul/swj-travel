const express = require('express');
const router = express.Router();

const datatable = require('sequelize-datatable');
const db = require('./../../../models');
const riderDB = db.rider;
const categoryDB = db.swj_kategori;
const savedDB = db.swj_saved;
const notifikasiDB = db.swj_notification;

const menu_01 = require('./rider');
const menu_02 = require('./category');
const menu_03 = require('./saved');
const menu_04 = require('./notitikasi');

router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

router.use('/rider', menu_01);
router.use('/category', menu_02);
router.use('/saved', menu_03);
router.use('/notifikasi', menu_04);

router.get('/data/:menu', (req, res, next) => {
    if (req.session.login) {
        switch (req.params.menu) {
            case "1": {
                req.query.columns[1].data = "rider_firstname";
                req.query.columns[2].data = "rider_lastname";
                req.query.columns[3].data = "rider_email";
                req.query.columns[4].data = "rider_phone";
                const data_filter = {
                    attributes: [
                        'id',
                        ['rider_firstname', 'column_2'],
                        ['rider_lastname', 'column_3'],
                        ['rider_email', 'column_4'],
                        ['rider_phone', 'column_5'],
                    ],
                };
                datatable(riderDB, req.query, data_filter, {})
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
                                                <a href="/users/rider/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                    <i class="bx bxs-pencil"></i>
                                                    <span class="align-middle ml-25">Edit</span>
                                                </a>
                                                <button class="btn btn-danger mr-1 mb-1" id="users_rider_` + result.data[i].id + `">
                                                    <i class="bx bxs-eraser"></i>
                                                    <span class="align-middle ml-25">Hapus</span>
                                                </button>
                                            </div>
                                            <script>load_tombol("","users", "rider", "` + result.data[i].id + `");</script>`,

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
                req.query.columns[3].data = "icon";
                req.query.columns[4].data = "description";
                req.query.columns[5].data = "status";
                const data_filter = {
                    attributes: [
                        'id',
                        ['name', 'column_2'],
                        ['url', 'column_3'],
                        ['icon', 'column_4'],
                        ['description', 'column_5'],
                        ['status', 'column_6'],
                    ],
                };
                datatable(categoryDB, req.query, data_filter, {})
                    .then((result) => {
                        const data = [];

                        for (let i = 0; i < result.data.length; i++) {

                            data.push({
                                column_1: i + 1,
                                column_2: result.data[i].column_2,
                                column_3: result.data[i].column_3,
                                column_4: result.data[i].column_4,
                                column_5: result.data[i].column_5,
                                column_6: result.data[i].column_6 == 1 ? 'Active' : 'Non Active',
                                column_7: `<div>
                                                <a href="/users/category/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                    <i class="bx bxs-pencil"></i>
                                                    <span class="align-middle ml-25">Edit</span>
                                                </a>
                                                <button class="btn btn-danger mr-1 mb-1" id="users_category_` + result.data[i].id + `">
                                                    <i class="bx bxs-eraser"></i>
                                                    <span class="align-middle ml-25">Hapus</span>
                                                </button>
                                            </div>
                                            <script>load_tombol("","users", "category", "` + result.data[i].id + `");</script>`,

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
                req.query.columns[1].data = "id_rider";
                req.query.columns[2].data = "id_listing";
                const data_filter = {
                    attributes: [
                        'id',
                        ['id_rider', 'column_2'],
                        ['id_listing', 'column_3'],
                    ],
                };
                datatable(savedDB, req.query, data_filter, {})
                    .then((result) => {
                        const data = [];

                        for (let i = 0; i < result.data.length; i++) {

                            data.push({
                                column_1: i + 1,
                                column_2: result.data[i].column_2,
                                column_3: result.data[i].column_3,
                                column_4: `<div>
                                            <a href="/users/saved/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                <i class="bx bxs-pencil"></i>
                                                <span class="align-middle ml-25">Edit</span>
                                            </a>
                                            <button class="btn btn-danger mr-1 mb-1" id="users_saved_` + result.data[i].id + `">
                                                <i class="bx bxs-eraser"></i>
                                                <span class="align-middle ml-25">Hapus</span>
                                            </button>
                                        </div>
                                        <script>load_tombol("","users", "saved", "` + result.data[i].id + `");</script>`,

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
            case "4": {
                req.query.columns[1].data = "id_rider";
                req.query.columns[2].data = "content";
                req.query.columns[3].data = "is_read";
                req.query.columns[4].data = "url";
                const data_filter = {
                    attributes: [
                        'id',
                        ['id_rider', 'column_2'],
                        ['content', 'column_3'],
                        ['is_read', 'column_4'],
                        ['url', 'column_5'],
                    ],
                };
                datatable(notifikasiDB, req.query, data_filter, {})
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
                                                <a href="/users/notifikasi/edit/` + result.data[i].id + `" class="btn btn-primary mr-1 mb-1">
                                                    <i class="bx bxs-pencil"></i>
                                                    <span class="align-middle ml-25">Edit</span>
                                                </a>
                                                <button class="btn btn-danger mr-1 mb-1" id="users_notifikasi_` + result.data[i].id + `">
                                                    <i class="bx bxs-eraser"></i>
                                                    <span class="align-middle ml-25">Hapus</span>
                                                </button>
                                            </div>
                                            <script>load_tombol("","users", "notifikasi", "` + result.data[i].id + `");</script>`,

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