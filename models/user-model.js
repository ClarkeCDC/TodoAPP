const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleID: String,
});

module.exports = mongoose.model("user", userSchema)