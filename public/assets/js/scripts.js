(async function load(window, undefined) {
    'use strict';

    /*
    NOTE:
    ------
    PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
    WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */
    let path = window.location.pathname.substr(window.location.pathname.length - 1);
    let pathname = window.location.pathname;

    if (path == '/') {
        pathname = window.location.pathname.substr(0, window.location.pathname.length - 1);
    }

    /*
    DATATABLE
    */

    let setting_data = {
        scroll_y: 475,
        order: {
            number: 1,
            urut: "asc"
        },
        column_defs: [],
        modul: "order",
        menu: 2,
        sum_columns: 1,
        set_columns: []
    }

    let dataMenu = await fetch('/swj/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then(response => response.json());

    for (let i = 0; i < dataMenu.length; i++) {
        if (pathname == dataMenu[i].url.trim().toLowerCase()) {
            setting_data.scroll_y = 470;
            setting_data.order.number = 1;
            setting_data.order.urut = "desc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 11
            });
            setting_data.modul = "swj";
            setting_data.menu = dataMenu[i].id;
            setting_data.sum_columns = 12;
        }
    }

    switch (pathname) {
        // modul master
        case "/master/informasi": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 7
            }, );
            setting_data.modul = "master";
            setting_data.menu = 1;
            setting_data.sum_columns = 8;
            break;
        }

        case "/master/banner": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "desc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 3
            }, );
            setting_data.modul = "master";
            setting_data.menu = 2;
            setting_data.sum_columns = 4;
            break;
        }

        case "/master/review": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "desc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 6
            }, );
            setting_data.modul = "master";
            setting_data.menu = 3;
            setting_data.sum_columns = 7;
            break;
        }

        // modul System
        case "/system/user": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 2;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 5
            });
            setting_data.modul = "system";
            setting_data.menu = 1;
            setting_data.sum_columns = 6;
            break;
        }

        case "/system/role": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 2;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 4
            }, {
                render: function (data, type, full, meta) {
                    return "<div class='text_wrap'>" + data + "</div>";
                },
                "targets": 3
            });
            setting_data.modul = "system";
            setting_data.menu = 2;
            setting_data.sum_columns = 5;
            break;
        }

        // modul app
        case "/users/rider": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 5
            });
            setting_data.modul = "users";
            setting_data.menu = 1;
            setting_data.sum_columns = 6;
            break;
        }

        case "/users/category": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 6
            });
            setting_data.modul = "users";
            setting_data.menu = 2;
            setting_data.sum_columns = 7;
            break;
        }

        case "/users/saved": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 3
            });
            setting_data.modul = "users";
            setting_data.menu = 3;
            setting_data.sum_columns = 4;
            break;
        }

        case "/users/notifikasi": {
            setting_data.scroll_y = 475;
            setting_data.order.number = 1;
            setting_data.order.urut = "asc";
            setting_data.column_defs.push({
                "orderable": false,
                "targets": 0
            }, {
                "orderable": false,
                "targets": 5
            });
            setting_data.modul = "users";
            setting_data.menu = 4;
            setting_data.sum_columns = 6;
            break;
        }

    }

    for (let i = 1; i <= setting_data.sum_columns; i++) {
        setting_data.set_columns.push({
            "data": "column_" + i,
            className: "dt-body-center"
        });
    }

    if (window.location.href.split('/')[window.location.href.split('/').length - 1] == '') {
        var pathDataTable = window.location.href + '../..';
    } else {
        var pathDataTable = window.location.href + '/../..';
    }

    $('.list-table-sans').DataTable({
        "scrollY": setting_data.scroll_y,
        "scrollX": true,
        "lengthMenu": [20, 25, 50, 75, 100],
        "order": [
            [setting_data.order.number, setting_data.order.urut]
        ],
        "columnDefs": setting_data.column_defs,
        "processing": true,
        "serverSide": true,
        "ajax": pathDataTable + `/` + setting_data.modul + `/data/` + setting_data.menu,
        columns: setting_data.set_columns
    });















    /*
    ADD FORM
    */

    function add_formSuccess() {
        Swal.fire({
            title: "Good job!",
            text: "Added Success!",
            type: "success",
            confirmButtonClass: 'btn btn-primary',
            buttonsStyling: false,
        });
        setTimeout(function () {}, 1500);
        let href = window.location.href;
        window.location = href.substring(0, href.length - 4)

    }

    function add_submitForm() {
        var data = $('#add_data_form').serialize();
        $.ajax({
            type: "POST",
            url: window.location.pathname + '/swj',
            data: data,
            success: function (text) {
                add_formSuccess();
            },
            error: function (err, ex) {
                // console.log(err);
                alert(err.responseJSON.message);
            }
        });
    }

    $("#add_data_form").on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            add_formError();
        } else {
            // everything looks good!
            event.preventDefault();
            add_submitForm();
        }
    });

    function add_submitForm_file() {
        var form = $('#add_data_form_file')[0];
        var data = new FormData(form);
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: window.location.pathname + '/tron',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            success: function (text) {
                add_formSuccess();
            },
            error: function (err, ex) {
                alert(err.responseJSON.message);
            }
        });
    }

    $("#add_data_form_file").on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            add_formError();
        } else {
            // everything looks good!
            event.preventDefault();
            add_submitForm_file();
        }
    });
















    /*
    EDIT FORM
    */
    let path_sementara = window.location.pathname;
    let path_edit = path_sementara.replace("/" + path_sementara.split('/')[path_sementara.split('/').length - 1], "");

    function edit_formSuccess() {
        Swal.fire({
            title: "Good job!",
            text: "Edited!",
            type: "success",
            confirmButtonClass: 'btn btn-primary',
            buttonsStyling: false,
        });
        setTimeout(function () {}, 3000);
        window.location = path_edit.substring(0, path_edit.length - 4);

    }

    function edit_formError() {
        alert("Gagal Edit");
    }

    function edit_submitForm() {
        var data = $('#edit_data_form').serialize();
        $.ajax({
            type: "POST",
            url: window.location.pathname + "/swj",
            data: data,
            success: function (text) {
                edit_formSuccess();
            },
            error: function (err, ex) {
                // console.log(err);
                alert(err.responseJSON.message)
            }

        });
    }

    $("#edit_data_form").on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            edit_formError();
        } else {
            // everything looks good!
            event.preventDefault();
            edit_submitForm();
        }
    });

    function edit_submitForm_file() {
        var form = $('#edit_data_form_file')[0];
        var data = new FormData(form);
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: window.location.pathname + '/tron',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            success: function (text) {
                edit_formSuccess();
            },
            error: function (err, ex) {
                // console.log(err);
                alert(err.responseJSON.message)
            }
        });
    }

    $("#edit_data_form_file").on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            edit_formError();
        } else {
            // everything looks good!
            event.preventDefault();
            edit_submitForm_file();
        }
    });

})(window);


/*
DELETE FORM
*/
function form_delete(sub_dir_path, modul, sub_modul, id) {
    $.ajax({
        type: "DELETE",
        url: sub_dir_path + "/" + modul + "/" + sub_modul + "/delete" + "/" + id + '/swj',
        data: {},
        success: function (text) {
            window.location = sub_dir_path + "/" + modul + "/" + sub_modul;
        },
        error: (err, ex) => {
            console.log(err);
            // alert(err.responseJSON.message)
        }
    });
}

function load_tombol(sub_dir_path, modul, sub_modul, id) {
    $(document).ready(function () {
        $(`#` + modul + `_` + sub_modul + `_` + id).on('click', function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                confirmButtonClass: 'btn btn-warning',
                cancelButtonClass: 'btn btn-danger ml-1',
                buttonsStyling: false,
            }).then(function (result) {
                if (result.value) {
                    form_delete(sub_dir_path, modul, sub_modul, id);
                    Swal.fire({
                        type: "success",
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        confirmButtonClass: 'btn btn-success',
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: 'Cancelled',
                        text: 'Your imaginary file is safe :)',
                        type: 'error',
                        confirmButtonClass: 'btn btn-success',
                    })
                }
            })
        });
    });
};

var dataMenu = {
    navigation: $("#main-menu-navigation"),
    header: $(".menu-header"),
    sub: $(".sub-menu-header")
}