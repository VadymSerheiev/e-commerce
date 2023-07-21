const express = require("express");
const Product = require("../models/product");
const router = new express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.post("/product", async (req, res) => {
  try {
    const { code = "", id = "" } = req.body;

    if (Boolean(code)) {
      const product = await Product.findOne({ code });
      res.send(product);
    }

    if (Boolean(id)) {
      const product = await Product.findById(id);
      res.send(product);
    }
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/image", async (req, res) => {
  try {
    const { url } = req.body;
    
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.buffer();
      }
      throw new Error('Network response was not ok.');
    })
    .then(buffer => {
      res.send(buffer);
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/admin/products", async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/admin/products", async (req, res) => {
  try {
    const {productsToUpdateArray = null} = req.body;

    if (productsToUpdateArray) {
      productsToUpdateArray.map(async (product) => {
        await Product.updateOne({ _id: product._id }, {
          name: product.name,
          description: product.description,
          price: product.price,
          group: product.group,
        });
      });
    } else {
      const product = req.body;
      await Product.updateOne({ _id: product._id }, product);
    }
    
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/admin/products", async (req, res) => {
  try {
    const codesToDelete = req.body.codes;
    // const productsToDelete = await Product.find({code: codesToDelete})
    await Product.deleteMany({ _id: codesToDelete });
    // console.log(productsToDelete)

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
