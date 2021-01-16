const Product = require("../product/product.model");
module.exports = (sequelize, Sequelize) => {
    

    const Cart = sequelize.define("cart", {
        userId: {
          type: Sequelize.INTEGER
        },
        productId: {
          type: Sequelize.INTEGER
        },
        productName: {
          type: Sequelize.STRING
        },
        productPrice: {
          type: Sequelize.DOUBLE
        } ,   
        quantitySelected: {
            type: Sequelize.INTEGER
          } ,
          product_variety: { 
            type: Sequelize.STRING, 
            get: function() {
                return JSON.parse(this.getDataValue('product_variety'));
            }, 
            set: function(val) {
                return this.setDataValue('product_variety', JSON.stringify(val));
            }
        },
        isCheckedOut: {
            type: Sequelize.BOOLEAN
          },
    
  });

  
  return Cart
  
  };