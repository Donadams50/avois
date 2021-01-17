const db = require("../sequelize");
const Carts = db.carts;
const Product = db.products;
const Op = db.Sequelize.Op;
const uuid = require('uuid')


// function to add to a users cart
exports.addToCart = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }


const {   productId, productName ,productPrice, quantitySelected , product_variety} = req.body;
  
    if ( productId && productName  && productPrice && quantitySelected && product_variety ){
        if ( productId==="" || productName==="" || productPrice === ""|| quantitySelected === "" || product_variety === {} ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
     }else{      
            
            const cart = {
                            productId : productId,
                            productName: productName ,
                            productPrice: productPrice,
                            quantitySelected: quantitySelected,
                            userId: req.user.id,
                            product_variety: product_variety,
                            isCheckedOut: false
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
        const findUserCart = await Carts.findAll({
            where: {userId: userid, isCheckedOut: false},
            include: [{
                model: Product,
                 as: 'product',
            //where:  ["id = productId"] 
           }] })
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
            const countCart = await Carts.count({where :{ userId: id, isCheckedOut:false }})
            console.log(countCart)

            res.status(200).send({"cartcount": countCart})
           
                          
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while getting cart count "})
       }
};

//get cart count by userid
exports.deleteCart = async (req, res) => {
    try{
            const id = req.user.id;
            const cartId = req.params.id
            const deleteCart = await Carts.destroy({where :{ userId: id, id:cartId }})

            res.status(200).send("Deleted succesfully")
           
                          
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while deleting cart  "})
       }
};


//check out function, after succesful payment
exports.checkOut = async (req, res) => {
    try{
            const id = req.user.id;
           
         const checkOut = await Carts.update({ isCheckedOut : true } , {where :{ userId: id}})

            res.status(200).send("Checked out succesfully")
           
                          
       }catch(err){
           console.log(err)
           res.status(500).send({message:"Error while checking out  "})
       }
};