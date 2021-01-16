// import packages into the app. Express, body-parser, 
//const sql=require("./app/Database/db")
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors()); 
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));




const db = require("./app/sequelize");
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
db.sequelize.sync()

 require("./app/product/product.routes.js")(app)
 require("./app/members/members.routes.js")(app)
 require("./app/cart/cart.routes.js")(app)


app.get("/", (req, res) => {
    res.json({ message: "Welcome to avio application." });
  });


// Connect to port
const port = process.env.PORT || 4000     

app.listen(port, ()=> console.log(`listening on port ${port}...`)); 