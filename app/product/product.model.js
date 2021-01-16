Cart = require("../cart/cart.model");
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        product_name: {
        type: Sequelize.STRING
      },
      product_description: {
        type: Sequelize.STRING
      },
      product_varieties: { 
        type: Sequelize.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('product_varieties'));
        }, 
        set: function(val) {
            return this.setDataValue('product_varieties', JSON.stringify(val));
        }
    },
    });
   
    return Product;
  };