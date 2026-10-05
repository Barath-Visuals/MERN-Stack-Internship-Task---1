const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create product",
            error: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try{
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID",
            error: error.message,
        });
    }
});

router.post("/update", async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(
            req.body.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
});

router.post("/delete", async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.body.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found",
            })
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: product,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete product",
            error: error.message,
        });
    }
});

module.exports = router;