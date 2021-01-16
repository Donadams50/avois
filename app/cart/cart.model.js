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
          }  
    
  });
  
  return Cart
  
  };