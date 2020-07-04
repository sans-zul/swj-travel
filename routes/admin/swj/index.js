const express = require('express');
const router = express.Router();

const datatable = require('sequelize-datatable');
const db = require('./../../../models');
const categoryDB = db.swj_kategori;
const listingDB = db.swj_listing;
const wisataDB = db.wisata;
const hotelDB = db.hotel;
const restaurantDB = db.restaurant;
const shoppingDB = db.shopping;

// const menu_01 = require('./wisata');
// const menu_02 = require('./hotel');
// const menu_03 = require('./restaurant');
// const menu_04 = require('./shoping');

const menus = require('./alisting');

router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

router.post('/menu', async (req, res) => {

    res.send(await categoryDB.findAll() ? await categoryDB.findAll() : {});

});

router.use('/', menus);

// router.use('/wisata', menu_01);
// router.use('/hotel', menu_02);
// router.use('/restaurant', menu_03);
// router.use('/shopping', menu_04);

router.get('/data/:menu', (req, res, next) => {
    // if (req.session.login) {
    categoryDB.findAll()
        .then(category => {

            for (let i = 0; i < category.length; i++) {
                if (req.params.menu == category[i].id) {

                    req.query.columns[1].data = "nama";
                    req.query.columns[2].data = "description";
                    req.query.columns[3].data = "address";
                    req.query.columns[4].data = "price";
                    req.query.columns[5].data = "lon";
                    req.query.columns[6].data = "lat";
                    req.query.columns[7].data = "image";
                    req.query.columns[8].data = "read_count";
                    req.query.columns[9].data = "featured";
                    req.query.columns[10].data = "rating";
                    const data_filter = {
                        attributes: [
                            'id',
                            'id_category',
                            ['nama', 'column_2'],
                            ['description', 'column_3'],
                            ['lon', 'column_4'],
                            ['price', 'column_5'],
                            ['lon', 'column_6'],
                            ['lat', 'column_7'],
                            ['image', 'column_8'],
                            ['read_count', 'column_9'],
                            ['featured', 'column_10'],
                            ['rating', 'column_11'],
                        ],
                        where: {
                            id_category: category[i].id
                        }
                    };
                    datatable(listingDB, req.query, data_filter, {})
                        .then((result) => {
                            const data = [];

                            for (let j = 0; j < result.data.length; j++) {

                                data.push({
                                    column_1: j + 1,
                                    column_2: result.data[j].column_2,
                                    column_3: result.data[j].column_3,
                                    column_4: result.data[j].column_4,
                                    column_5: result.data[j].column_5,
                                    column_6: result.data[j].column_6,
                                    column_7: result.data[j].column_7,
                                    column_8: result.data[j].column_8,
                                    column_9: result.data[j].column_9,
                                    column_10: result.data[j].column_10,
                                    column_11: result.data[j].column_11,
                                    column_12: `<div>
                                                <a href="/swj/` + category[i].name.trim().toLowerCase() + `/edit/` + result.data[j].id + `" class="btn btn-primary mr-1 mb-1">
                                                    <i class="bx bxs-pencil"></i>
                                                    <span class="align-middle ml-25">Edit</span>
                                                </a>
                                                <button class="btn btn-danger mr-1 mb-1" id="swj_` + category[i].name.trim().toLowerCase() + `_` + result.data[j].id + `">
                                                    <i class="bx bxs-eraser"></i>
                                                    <span class="align-middle ml-25">Hapus</span>
                                                </button>
                                            </div>
                                            <script>load_tombol("","swj", "` + category[i].name.trim().toLowerCase() + `", "` + result.data[j].id + `");</script>`,

                                });

                            }

                            result.data = data;
                            result.recordsTotal = data.length;

                            return res.json(result);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message
                            });
                        });
                }
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});

module.exports = router;