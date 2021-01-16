module.exports = app => {
    const carts = require("../cart/cart.controller.js");

  
     app.post("/cart",  carts.addToCart);
     app.get("/cart",     carts.findCartByUserId);
     app.get("/cartcount",     carts.countCart); 
    //  app.delete("/cart/:id",  verifyToken,  cart.deleteCart);
  

  };