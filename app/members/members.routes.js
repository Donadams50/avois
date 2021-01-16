module.exports = app => {
    const members = require("../members/members.controller.js");
  
    // Create a new user
    app.post("/user", members.create);
  
    // User sign in
     app.post("/signin", members.signIn);
  
  

  };