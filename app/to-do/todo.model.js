const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
            trim: true
        },
        desc: {
            type: String,
            required: true,
            minlength: 5,
            trim: true
        },
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
        minimize: true
    }
);
module.exports = model("Todo", todoSchema);
