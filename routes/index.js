const express = require('express');
const router = express.Router();
var productController = require('../controller/productController');


router.get('/', (req, res) => res.send('Welcome to Express'));


router.route('/product')
    .get(productController.getAll)
    .post(productController.add)

router.route('/product/:id')
    .get(productController.getOne)
    .put(productController.updateAmount)
    .delete(productController.remove)

module.exports = router;
