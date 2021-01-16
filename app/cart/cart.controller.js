const db = require("../sequelize");
const Carts = db.carts;
const Op = db.Sequelize.Op;
const uuid = require('uuid')


// function to add to a users cart

exports.addToCart = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }


const {   productId, productName ,productPrice, quantitySelected } = req.body;
  
    if ( productId && productName  && productPrice && quantitySelected ){
        if ( productId==="" || productName==="" || productPrice === ""|| quantitySelected === "" ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
     }else{      
            
            const cart = {
                            productId : productId,
                            productName: productName ,
                            productPrice: productPrice,
                            quantitySelected: quantitySelected,
                            userId: req.user.id
                           }
           
               try{         
                           const  addtocart =await Carts.create(cart)
                            if (addtocart._options.isNewRecord === true){
                                res.status(201).send({message:"Added to the users cart succesfully created"})
                            }else{
                                res.status(400).send({message:"Error while adding to cart "})  
                            }                
                           
                
              }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while adding to  cart "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}


// function get cart details by user id
exports.findCartByUserId = async(req, res) => {
    try{
         userid = req.user.id
        const findUserCart = await Carts.find({userId: userid} )
        res.status(200).send(findUserCart)
           
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Error while getting products"})
    }
  };

  //get cart count by userid
  exports.countCart = async (req, res) => {
    try{
        let id = req.user.id;
            const countCart = await Carts.findAndCountAll({userId:id})
            console.log(countCart)

            res.status(200).send({"cartcount": countCart})
           
                          
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting cart count "})
       }
};