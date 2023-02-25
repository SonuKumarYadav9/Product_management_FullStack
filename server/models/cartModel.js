const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
  productId: { type: ObjectId, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  purchased: { type: Boolean, default: false },
},{timestamps:true});

module.exports = mongoose.model("cart", cartSchema);
