module.exports = (sequelize, Sequelize) => {
    

    const PROFILE = sequelize.define("profile", {
        email: {
          type: Sequelize.STRING
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        walletBalance: {
          type: Sequelize.INTEGER
        }   
    
  });
  
  return PROFILE
  
  };