module.exports = app => {
    const carts = require("../cart/cart.controller.js");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, } = jwtTokenUtils;
  
     app.post("/cart", verifyToken,  carts.addToCart);
     app.get("/cart", verifyToken,     carts.findCartByUserId);
     app.get("/cartcount", verifyToken,    carts.countCart); 
     app.delete("/cart/:id",  verifyToken,  carts.deleteCart);
     app.post("/checkout",  verifyToken,  carts.checkOut);

  };
  