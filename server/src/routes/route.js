 const express = require("express")
 const router  = express.Router()
 const mid = require("../../middleware/auth")

const userController = require("../../controllers/userController")
const cartController  = require("../../controllers/cartController")
const productController  = require("../../controllers/productController")
const orderController  = require("../../controllers/orderController")


// destructuring 
const { registerUSer,userLogin } = userController
const { createProduct,getAllProduct,getAllByFilter }= productController
const {addToCart ,getCartItems }= cartController
const {saveOrder,findOrders} =orderController

//USER
 router.post("/register",registerUSer)
 router.post("/login",userLogin)
 //products
 router.post("/add/product", mid, createProduct)
 router.get("/products", getAllProduct)
 router.get("/products/filterby",getAllByFilter)
 //carts
 router.post("/add/cart",mid,addToCart)
 router.get("/carts",mid,getCartItems)
//orders
router.put("/saveorder/:id",mid,saveOrder)
router.get("/orders",mid,findOrders)


module.exports = router

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/upload");
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });

//   const upload = multer({ storage });