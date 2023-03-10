const mongoose = require("mongoose");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const addToCart = async (req, res) => {
  try {
    // const productId = req.params.productId;
    const { productId, quantity = 1 } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ status: false, msg: "Invalid product ID" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ status: false, msg: "Quantity must be at least 1" });
    }

    let cartItem = await cartModel.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.status(200).json({
        status: true,
        msg: "Quantity updated in cart",
        data: cartItem,
      });
    } else {
      let products = await productModel.findOne({
        _id: productId,
        purchased: false,
      });
      // let products = await productModel.findOne({ _id:productId });
      console.log(products);
      if (products) {
        let cart = await new cartModel({
          productId,
          name:products.name,
          quantity,
          image: products.image,
        });
        let savedToCart = await cart.save();
        console.log(savedToCart);
        return res
          .status(201)
          .json({ status: true, msg: "Added to cart", data: savedToCart });
      } else {
        return res
          .status(404)
          .json({ status: false, msg: "Product Not Available for this vart" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await cartModel.find().select({purchased:false});

    // Calculated the total price of all items in the cart
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i]; //stroring the alll coming carts in this VAR
      const product = await productModel.findById(cartItem.productId);
      const itemPrice = product.price * cartItem.quantity;
      totalPrice += itemPrice;
      cartItems[i] = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
      };
    }

    return res.json({
      status: true,
      data: {
        items: cartItems,
        totalPrice,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    console.log(cartId)
    // if (!isValidObjectId(cartId)) {
    //   return res.status(400).json({ status: false, msg: "Invalid Cart ID" });
    // }
    const cart = await cartModel.findByIdAndDelete(cartId);
    console.log(cart) // remove the braces from the argument
    if (!cart) {
      return res.status(404).json({ status: false, msg: "Cart not found" }); // add error handling for when the cart is not found
    }
    return res.json({
      status: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


module.exports = { addToCart, getCartItems,deleteCart };
