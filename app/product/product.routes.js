module.exports = app => {
    const products = require("../product/product.controller.js");

  
    // Create a new product
    app.post("/product", products.createProduct);
  
    // Retrieve all product
    app.get("/product", products.findAllProduct);
  
    // Update  product
    app.put("/product/:id", products.updateProduct);
  

  };