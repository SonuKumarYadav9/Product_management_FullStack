const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");

const saveOrder = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    if (cartId) {
      const cart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { purchased: true, purchaseDate: new Date() },
        { new: true }
      );
    //   if (cart) {
    //     const saveOrder = new orderModel({
    //       name: cart.name,
    //       price: cart.price,
    //       quantity: cart.quantity,
    //     });
    //     await saveOrder.save();
        return res
          .status(200)
          .send({ status: true, msg: "Thanks For Purchase", data:cart });
    //   } else {
    //     return res.status(400).send({ status: false, msg: "Cart Not Found" });
    //   }
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
    const orders = await orderModel.find({});
    return res.status(200).json({ status: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { saveOrder, findOrders };
