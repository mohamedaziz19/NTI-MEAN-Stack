
const connectDB = require('./config/db.config')
connectDB() 

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')  
app.use(cors({ origin: "http://localhost:4200" }));

const userController = require('./routers/user.router')
const productController = require('./routers/product.router') 
const path = require('path');
const orderController = require("./routers/order.router");

app.use("/orders", orderController);
app.use('/user' , userController)
app.use('/products' , productController)
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});


const port = 3000
app.listen(port , () => {
  console.log(`Server is running on port ${port}`)})