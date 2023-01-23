const express = require('express')
const Product = require('../models/product')
const router = new express.Router()

router.post('/product', async (req, res) => {
    try {
        const code = req.body.code;
        const product = await Product.findOne({code})
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/admin/products', async (req, res) => {
    console.log(req.body.fileName)
    const product = new Product(req.body)

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/admin/products', async (req, res) => {
    try {
        const productsToUpdateArray = req.body.productsToUpdateArray;
        productsToUpdateArray.map(async (product) => {
            await Product.updateOne({_id: product._id}, product)
        })

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/admin/products', async (req, res) => {
    try {
        const codesToDelete = req.body.codes;
        // const productsToDelete = await Product.find({code: codesToDelete})
        await Product.deleteMany({_id: codesToDelete})
        // console.log(productsToDelete)

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;