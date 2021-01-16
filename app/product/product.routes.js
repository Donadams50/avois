module.exports = app => {
    const products = require("../product/product.controller.js");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken } = jwtTokenUtils;
   
  
    // Create a new product
    app.post("/product", verifyToken, products.createProduct);
  
    // Retrieve all product
    app.get("/product",  verifyToken, products.findAllProduct);
  
    // Update  product
    app.put("/product/:id", verifyToken ,products.updateProduct);
  

  };