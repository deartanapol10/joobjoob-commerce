// CRUD mongoDB
const express = require('express');

const router = express.Router();

//Import models
var Order = require('../models/order.model.js');

//-----------------
// ---- UPDATE ----
//-----------------
//Update each order route
router.get('/edit/:id', (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        res.render('edit_order', {
            title: 'Edit Order',
            order: order
        })
    })
})


//Update Submit post route
router.post('/edit/:id', (req, res) => {
    var order = {};
    order.name = req.body.name;
    order.contact = req.body.contact;
    order.product = req.body.product;

    var query = {
        _id: req.params.id
    }

    Order.update(query, order, (err) => {
        if (err) throw err;
        req.flash('success', 'Order is now Updated!');
        res.redirect('/');

    });
});

//-----------------
// ------ ADD ------
//-----------------
//Add order route
router.get('/add', (req, res) => {
    res.render('add_order', {
        title: 'Add Order'
    });
});

//Add Submit post route
router.post('/add', (req, res) => {
    var order = new Order({
        name : req.body.name,
        contact : req.body.contact,
        product : req.body.product
    });

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('contact', 'Contact is required').notEmpty();
    req.checkBody('product', 'Product is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('add_order', {
            title: '(Error) Add Order Again !',
            order:order,
            errors: errors
        });
    }else {
        order.name = req.body.name;
        order.contact = req.body.contact;
        order.product = req.body.product;

        order.save((err) => {
            if (err) throw err;
            req.flash('success','Order is now Added!');
            res.redirect('/');
        });
    };
});

//-----------------
// ---- DELETE ----
//-----------------
//Delete order
router.delete('/:id', (req, res) => {
    var query = {_id: req.params.id};
    Order.remove(query, (err) => {
        return console.log(err);
    });

    res.send('Success!');
})

//-----------------
// SHOW each Order
//-----------------
//Show each order routes
router.get('/:id', (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        res.render('show_order', {
            order: order
        })
    })
})


module.exports = router;
