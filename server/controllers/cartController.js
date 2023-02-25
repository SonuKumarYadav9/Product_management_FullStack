const mongoose = require("mongoose");
const { findOne } = require("../models/cartModel");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");


const isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value);
  };
  

  const addToCart = async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
  
      if (!isValidObjectId(productId)) {
        return res
          .status(400)
          .json({ status: false, msg: "Invalid product ID" });
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
        return res
          .status(200)
          .json({ status: true, msg: "Quantity updated in cart", data: cartItem });
      } else {
        let cart = await new cartModel({
          productId,
          quantity,
        });
        let savedToCart = await cart.save();
        return res
        .status(201)
        .json({ status: true, msg: "Added to cart", data: savedToCart });
      }

    
    } catch (error) {
      console.log(error);
      return res.json({ status: false, msg: error.message });
    }
  };

  const getCartItems = async (req, res) => {
    try {
      const cartItems = await cartModel.find();
  
      // Calculated the total price of all items in the cart
      let totalPrice = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];  //stroring the alll coming carts in this VAR
        const product = await productModel.findById(cartItem.productId);
        const itemPrice = product.price * cartItem.quantity;
        totalPrice += itemPrice;
        cartItems[i] = {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: cartItem.quantity
        };
      }
  
      return res.json({
        status: true,
        data: {
          items: cartItems,
          totalPrice
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };


module.exports ={addToCart,getCartItems}
