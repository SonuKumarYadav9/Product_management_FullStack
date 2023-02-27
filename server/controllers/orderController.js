const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");

const saveOrder = async (req, res) => {
  try {
    const data= req.body
    let {productId}=data
    if (productId) {
      const cart = await cartModel.findOneAndUpdate(
        { productId:productId },
        { purchased: true, purchaseDate: new Date() },
        { new: true }
      );
      console.log(cart)
      if (cart) {
        const saveOrder = new orderModel({
          cartId: cart._id,
          purchased: cart.purchased,
          purchaseDate: new Date()
        });
        await saveOrder.save();
        return res
          .status(200)
          .send({ status: true, msg: "Thanks For Purchase", data:cart });
      } else {
        return res.status(400).send({ status: false, msg: "Cart Not Found" });
      }
    } else {
      return res.status(404).send({ status: false, msg: "Cart Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const findOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({purchaseDate:-1});
    return res.status(200).json({ status: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { saveOrder, findOrders };
