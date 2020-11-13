Product = require('../model/product');

exports.getAll = (req, res) => {
    Product.get(function (err, products) {
        if (err) {
            return res.json({
                status: "error",
                message: err
            });
        }
        return res.json({
            status: "success",
            data: products
        });
    });
};

exports.add = (req, res) => {
    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.amount = req.body.amount;
    product.icon = req.body.icon;
    product.save( err => {
        if (err) {
            return res.json(err);
        }
        return res.json({
            message: "New Product Added!",
            data: product
        });
    });
};

exports.remove = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                return res.status(404).send({message: `Product with id ${id} not found`})
            }
            res.json({
                status: "success",
            })
        })
};
