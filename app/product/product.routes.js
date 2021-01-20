module.exports = app => {
    const products = require("../product/product.controller.js");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
  
    // Create a new product
    app.post("/product", verifyToken, products.createProduct);
  

    app.post("/product/variant/:id", verifyToken, upload.single("files"), products.addVariant);
    
    // Retrieve all product
    app.get("/product",   verifyToken, products.findAllProduct);
  
    // Update  product
    app.put("/product/:id", verifyToken ,products.updateProduct);
  

  };