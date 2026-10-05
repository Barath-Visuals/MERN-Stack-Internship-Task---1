const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        description:{
            type: String,
            required: true,
        },

        image:{
            type: String,
            required: true,
        },

        user: {
            name: {
                type: String,
                required: true,
            },

            email:{
                type: String,
                required: true,
            }
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Product", productSchema);