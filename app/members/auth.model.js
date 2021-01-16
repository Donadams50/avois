module.exports = (sequelize, Sequelize) => {
    const MEMBERS_AUTH = sequelize.define("member_auth", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
     
    });

    return MEMBERS_AUTH
  
  };