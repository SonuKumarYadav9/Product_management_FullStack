const express = require("express");
const router = express.Router();
const mid = require("../../middleware/auth");

const userController = require("../../controllers/userController");
const cartController = require("../../controllers/cartController");
const productController = require("../../controllers/productController");
const orderController = require("../../controllers/orderController");

// destructuring
const { registerUSer, userLogin, users } = userController;
const { createProduct, getAllProduct, getAllByFilter } = productController;
const { addToCart, getCartItems, deleteCart } = cartController;
const { saveOrder, findOrders } = orderController;

//USER
router.post("/register", registerUSer);
router.post("/login", userLogin);
router.get("/user", mid, users);
//products
router.post("/add/product", mid, createProduct);
router.get("/products", getAllProduct);
router.get("/products/filterby", getAllByFilter);
//carts
router.post("/add/cart", addToCart);
router.get("/carts", mid, getCartItems);
router.delete("/carts/:id", mid, deleteCart);
//orders
router.post("/buy-product", mid, saveOrder);
router.get("/purchased", mid, findOrders);

module.exports = router;
