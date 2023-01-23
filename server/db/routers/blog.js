const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()

router.post('/admin/records', async (req, res) => {
    console.log(req.body.fileName)
    const record = new Blog(req.body)

    try {
        await record.save()
        res.status(201).send(record)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/records', async (req, res) => {
    try {
        const records = await Blog.find({})
        res.send(records)
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/admin/records', async (req, res) => {
    try {
        const productsToUpdateArray = req.body.productsToUpdateArray;
        productsToUpdateArray.map(async (product) => {
            await Blog.updateOne({_id: product._id}, product)
        })

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/admin/records', async (req, res) => {
    try {
        const codesToDelete = req.body.codes;
        // const productsToDelete = await Product.find({code: codesToDelete})
        await Blog.deleteMany({_id: codesToDelete})
        // console.log(productsToDelete)

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;