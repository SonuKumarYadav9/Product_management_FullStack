# Product_management_FullStack


const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      description: req.body.description,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get products by category and price using query
exports.getProductsByQuery = async (req, res) => {
  try {
    const { category, priceMin, priceMax } = req.query;

    // Define query object
    const query = {};

    // Add category to query if it exists
    if (category) {
      query.category = category;
    }

    // Add price range to query if it exists
    if (priceMin && priceMax) {
      query.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin) {
      query.price = { $gte: priceMin };
    } else if (priceMax) {
      query.price = { $lte: priceMax };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

frontend     

import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/products', {
        name,
        price,
        category,
        image,
        description,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;



import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('/api/products', {
        params: { category, priceMin, priceMax },
      });

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Price Min:
          <input type="text" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
        </label>
        <label>
Price Max:
<input type="text" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
</label>
<button type="submit">Search</button>
</form>
  <ul>
    {products.map((product) => (
      <li key={product._id}>
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Category: {product.category.join(', ')}</p>
        <p>Description: {product.description}</p>
        <img src={product.image} alt={product.name} />
      </li>
    ))}
  </ul>
</div>


const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.methods.calculateTotalPriceAndCount = function () {
  let totalPrice = 0;
  let totalCount = 0;

  this.products.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
    totalCount += item.quantity;
  });

  this.totalPrice = totalPrice;
  this.totalCount = totalCount;

  return this.save();
};

module.exports = mongoose.model("Cart", cartSchema);

const Cart = require("../models/cart");
const Product = require("../models/product");

const addItemToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }

    const cartProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartProductIndex >= 0) {
      // Product already in cart, increase quantity
      cart.products[cartProductIndex].quantity += 1;
    } else {
      // Product not in cart, add to products array
      cart.products.push({ product: productId });
    }

    await cart.calculateTotalPriceAndCount();

    return res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addItemToCart,
};



// Import required packages
const mongoose = require("mongoose");

// Create cart schema
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Create order detail schema
const orderDetailSchema = new mongoose.Schema(
  {
    cart: {
      type: cartSchema,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Delivered"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

// Create order detail model
const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

// Create order detail controller
const orderDetailController = {
  create: async (req, res) => {
    try {
      const { cart, customer } = req.body;
      const orderDetail = await OrderDetail.create({
        cart,
        customer,
      });
      res.status(201).json(orderDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create order detail." });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const orderDetail = await OrderDetail.findById(id).populate([
        {
          path: "cart.products.product",
          model: "Product",
        },
        {
          path: "customer",
          model: "User",
        },
      ]);
      res.json(orderDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to get order detail." });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;
      const orderDetail = await OrderDetail.findByIdAndUpdate(
        id,
        {
          orderStatus,
        },
        { new: true }
      );
      res.json(orderDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to update order detail." });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await OrderDetail.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to delete order detail." });
    }
  },
};

// Export order detail model and controller
module.exports = { OrderDetail, orderDetailController };

<!-- front -->

import { useEffect, useState } from "react";
import axios from "axios";

const OrderDetail = ({ orderId }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/order-details/${orderId}`);
        setOrderDetail(response.data);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };
    getOrderDetail();
  }, [orderId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetail) {
    return null;
  }

  return (
    <div>
      <h2>Order Detail</h2>
      <p>
        <strong>Order ID:</strong> {orderDetail._id}
      </p>
      <p>
        <strong>Order Status:</strong> {orderDetail.orderStatus}
      </p>
      <h3>Cart</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.cart.products.map((product) => (
            <tr key={product.product._id}>
              <td>{product.product.name}</td>
              <td>{product.quantity}</td>
              <td>${product.product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total:</td>
            <td>{orderDetail.cart.totalCount}</td>
            <td>${orderDetail.cart.totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p>
        <strong>Customer:</strong> {orderDetail.customer.username}
      </p>
    </div>
  );
};

export default OrderDetail;



import { useState } from "react";
import axios from "axios";

const PaymentPage = ({ cart, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/orders", {
        cart,
        name,
        email,
        address,
        paymentMethod,
      });
      history.push(`/orders/${response.data._id}`);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <option value="paypal">PayPal</option>
            <option value="credit-card">Credit Card</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default PaymentPage;







const Product = require('../models/product');
const CartItem = require('../models/cartItem');
const Purchase = require('../models/purchase');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get products by category and price range
const getProductsByCategoryAndPrice = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  try {
    const products = await Product.find({
      category,
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const cartItem = new CartItem({
      productId,
      quantity,
    });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all items in cart
const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('productId');
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item quantity in cart
const updateCartItemQuantity = async (req, res) => {
  const { cartItemId, quantity } = req.body;
  try {
    const cartItem = await CartItem.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    ).populate('productId');
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Purchase cart items
const purchaseCartItems = async (req, res) => {
  const { cartItems } = req.body;
  try {
    // Update inventory
    for (const { productId, quantity } of cartItems) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      if (product.quantity < quantity) {
        return res
          .status(400)
          .json({ error: 'Not enough inventory to complete purchase' });
      }
      product.quantity -= quantity;
      await product.save();
    }
    // Create purchase
    const purchaseItems = await Promise.all(
      cartItems.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        return {
          name: product.name,
          price: product.price,
          quantity,
        };
      })
    );
    const purchase = new Purchase({ items: purchaseItems });
    await purchase.save();
    // Clear cart



sssssssssssssssssssssssss
   
const mongoose = require('mongoose');
const purchaseItemSchema = require('./purchaseItem');

const purchaseSchema = new mongoose.Schema({
  items: [purchaseItemSchema],
  date: { type: Date, default: Date.now },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;




const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = purchaseItemSchema;


const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get all products on mount
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;


import { useState } from 'react';
import axios from 'axios';

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    // Add item to cart
    axios
      .post('/api/cart', {
        productId: product._id,
        quantity,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
      <input
        id={`quantity-${product._id}`}
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;


import { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Get cart items on mount
    axios.get('/api/cart').then((res) => {
      setCartItems(res.data.items);
      setCartTotal(res.data.total);
    });
  }, []);

  const updateCartItemQuantity = (cartItemId, quantity) => {
    // Update item quantity in cart
    axios
      .put('/api/cart', {
        cartItemId,
        quantity,
      })
      .then((res) =>
        setCartItems(
          cartItems.map((item) =>
            item._id === cartItemId ? res.data : item
          )
        )
      );
  };

  const purchaseCartItems = () => {
    // Purchase cart items
    axios.post('/api/purchase', { cartItems }).then(() => {
      setCartItems([]);
      setCartTotal(0);
    });
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          updateCartItemQuantity={updateCartItemQuantity}
        />
      ))}
      <p>Total: {cartTotal}</p>
      <button onClick={purchaseCartItems}>Purchase</button>
    </div>
  );
};

export default Cart;


import { useState } from 'react';

const CartItem = ({ item, updateCartItemQuantity }) => {
const [quantity, setQuantity] = useState(item.quantity);

const handleQuantityChange = (change) => {
// Update item quantity
const newQuantity = quantity + change;
if (newQuantity >= 1) {
setQuantity(newQuantity);
updateCartItemQuantity(item, newQuantity);
}
};

return (
<div className="cart-item">
<div className="cart-item-details">
<div className="cart-item-name">{item.name}</div>
<div className="cart-item-price">${item.price.toFixed(2)}</div>
</div>
<div className="cart-item-quantity">
<button className="cart-quantity-btn" onClick={() => handleQuantityChange(-1)}>
-
</button>
<span className="cart-quantity">{quantity}</span>
<button className="cart-quantity-btn" onClick={() => handleQuantityChange(1)}>
+
</button>
</div>
</div>
);
};

export default CartItem;