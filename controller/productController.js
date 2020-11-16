Product = require('../model/product');

exports.getAll = (req, res) => {
    Product.find()
        .then(data => {
            res.send({products: data})
        })
        .catch(err => {
            res.status(500).send({message: `Couldn't get list of Products: ${err.message}`})
        })
};

exports.add = (req, res) => {
    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.amount = req.body.amount;
    product.icon = req.body.icon;
    product.save()
        .then(() => {
            res.send()
        })
        .catch(err => {
            res.status(500).send({message: `Couldn't create new Product: ${err.message}`})
        })
};

exports.remove = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                return res.status(404).send({message: `Product with id ${id} not found`})
            }
            res.send()
        })
        .catch(err => {
            res.status(500).send({message: `Couldn't remove Product ${id}: ${err.message}`})
        })
};

exports.getOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then(data => {
            if(!data) {
                return res.status(404).send({message: `Product with id ${id} not found`})
            }
            res.send({data: data})
        })
        .catch(err => {
            res.status(500).send({message: `Couldn't get Product ${id}: ${err.message}`})
        })
};

exports.updateAmount = (req, res) => {
    const id = req.params.id;
    const newAmount = req.body.amount;

    Product.findByIdAndUpdate(id, {amount: newAmount}, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                return res.status(404).send({message: `Product with id ${id} not found`})
            }
            res.send()
        })
        .catch(err => {
            res.status(500).send({message: `Couldn't update amount of Product ${id}: ${err.message}`})
        })
}
