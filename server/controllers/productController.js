const productModel = require("../models/productModel");
const { uploadFile } = require("../aws/awsS3");

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    let { name, price, quantity, category } = data;
    let image = req.files[0]
    if (name && price && quantity && category && image) {
      const products = await new productModel({
        name,
        price,
        quantity,
        category,
        image:await uploadFile(image)
      });
      let savedProduct = await products.save();

      return res
        .status(201)
        .json({ status: true, msg: "Product Added", data: savedProduct });
    } else {
      return res
        .status(400)
        .json({ status: false, msg: "All Fiels Are required" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: true, msg: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find(
      {},
      { name: 1, category: 1, price: 1,image:1 }
    );

    if (products.length > 0) {
      return res.status(200).json({ status: true, data: products });
    } else {
      return res.status(404).json({ status: true, msg: "Products Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};

const getAllByFilter = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.min_price || req.query.max_price) {
      filter.price = {};
      if (req.query.min_price) {
        filter.price.$gte = req.query.min_price;
      }
      if (req.query.max_price) {
        filter.price.$lte = req.query.max_price;
      }
    }

    // Constructed object to include only name price and category fields
    const projection = {
      name: 1,
      price: 1,
      category: 1,
      image:1
    };
    const products = await productModel.find(filter, projection);
    console.log(products)

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};

module.exports = { createProduct, getAllProduct, getAllByFilter };
