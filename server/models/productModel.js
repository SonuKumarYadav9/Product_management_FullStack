const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String,default:1 },
  image: { type: String, required: true },
});
module.exports = mongoose.model("product", productSchema);
