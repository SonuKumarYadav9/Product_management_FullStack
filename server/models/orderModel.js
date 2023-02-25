const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderShema = new mongoose.Schema({
  cartId: { type: ObjectId, required: true },
  purchased: { type: Boolean, default: false },
  purchaseDate: { type: Date, default: Date.now },
},{timestamps:true});

module.exports = mongoose.model("order", orderShema);