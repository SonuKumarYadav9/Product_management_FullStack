# Product_management_FullStack
# Features
Customers can see the list of products with their price and category
App should have a facility that allows user to filter products based on their category and price range
Customers should be able to add products to the cart
When clicked on cart button list of products added in the cart should be visible with their quantity and price
User should be able to increase and decrease the quantity using '+' and '-' buttons in cart
Added products can be purchased using mock payment(just update a key in DB)
Customers can access their purchase history with given time-frame.

In the project directory, you can run:

Do NPM i to dependencies and after that you will able to run this app with this 
commands=>

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:5000 to view it in your local.

# VideoLink 
https://drive.google.com/file/d/1L1jNS7mQYVVdbZVUf4xJ2ygUWoZxWHnC/view?usp=sharing

 # The Website look like This
 # Register

![register](https://user-images.githubusercontent.com/106573507/221603507-b3a5e3bb-bfb1-427c-9959-38f8d5ed8508.JPG)

# Login

![Login](https://user-images.githubusercontent.com/106573507/221604219-21281b8b-115a-43e4-b472-8bdea737e585.JPG)

# Products
![productLIST](https://user-images.githubusercontent.com/106573507/221604603-aea46179-fffb-4b23-85a4-00f7265b7920.JPG)

# Front Page
![Front](https://user-images.githubusercontent.com/106573507/221604766-677ef5b0-069d-40ee-816a-0eed9c0b8ecc.JPG)
# Filter Section
![Filter Serch](https://user-images.githubusercontent.com/106573507/221604901-9089b459-87f9-4206-bbf7-5482a6d00287.JPG)
# Profile Section 
![Profile](https://user-images.githubusercontent.com/106573507/221605619-17c96d20-1ac0-4383-bad1-4a30647cca99.JPG)
# Add Products 
![addProduct](https://user-images.githubusercontent.com/106573507/221605882-eadc8f09-b515-4488-bcb2-9e9d209b5966.JPG)

# carts
![carts](https://user-images.githubusercontent.com/106573507/221605347-0e5188a1-179d-4073-8ac1-2d397c945b78.JPG)

# postman Collection
{
	
	"item": [
		{
			"name": "register",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "name",
							"value": "Sonu",
							"type": "text"
						},
						{
							"key": "email",
							"value": "s@gmail.com",
							"type": "text"
						},
						{
							"key": "password",
							"value": "12345",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "eMFe04fwQ/Passprt pic.png"
						}
					]
				},
				"url": {
					"raw": "localhost:5000/register",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "Login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n        \"email\":\"s@gmail.com\",\r\n    \"password\":\"12345\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:5000/login",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Add Products",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2Y3NTNjN2YyOWRhN2NmN2IyMTViMmEiLCJpYXQiOjE2Nzc0NzE2MjAsImV4cCI6MTY3NzY0NDQyMH0.SGFA6fs7WdY9mfO67nP6BnKp7MtLzdI9F099DR2_sBs",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "name",
							"value": "I phone 15",
							"type": "text"
						},
						{
							"key": "price",
							"value": "200000",
							"type": "text"
						},
						{
							"key": "quantity",
							"value": "2",
							"type": "text"
						},
						{
							"key": "category",
							"value": "mobile",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "8dAUJHi1v/i phones.jpg"
						}
					]
				},
				"url": {
					"raw": "localhost:5000/add/product",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"add",
						"product"
					]
				}
			},
			"response": []
		},
		{
			"name": "products By Filter",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:5000/products/filterby?category=mobile&max_price=1000&min_price=500",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"products",
						"filterby"
					],
					"query": [
						{
							"key": "category",
							"value": "mobile"
						},
						{
							"key": "max_price",
							"value": "1000"
						},
						{
							"key": "min_price",
							"value": "500"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "All Products with price,category",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:5000/products",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"products"
					]
				}
			},
			"response": []
		},
		{
			"name": "Addto Cart",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productId\": \"63fc2fa2ae0ea0acf597d9f5\",\r\n    \"quantity\":1\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:5000/add/cart",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"add",
						"cart"
					]
				}
			},
			"response": []
		},
		{
			"name": "All Carts",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2Y3NTNjN2YyOWRhN2NmN2IyMTViMmEiLCJpYXQiOjE2NzcyMjI3NjYsImV4cCI6MTY3NzM5NTU2Nn0.U1EIFNYPkdwc667iDtl9HAilE0R4XLrFIDIIMMr8yJA",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:5000/carts",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"carts"
					]
				}
			},
			"response": []
		},
		{
			"name": "savePrchase Order",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "New Request",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "localhost:5000/remove/63fc16e202be988efac57d71",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"remove",
						"63fc16e202be988efac57d71"
					]
				}
			},
			"response": []
		},
		{
			"name": "all PUrchased",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "findUSER",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		}
	]
}
