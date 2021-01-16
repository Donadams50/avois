const db = require("../sequelize");
const Products = db.products;
const Op = db.Sequelize.Op;
const uuid = require('uuid')

// function to create new product
exports.createProduct = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }


const {   product_name, product_description ,product_varieties } = req.body;
  
    if ( product_name && product_description  && product_varieties  ){
        if ( product_name==="" || product_description==="" || product_varieties.length < 1 ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
     }else{      
            
            const product = {
                            product_name : req.body.product_name,
                            product_description: req.body.product_description ,
                            product_varieties: req.body.product_varieties
                           }
           
               try{         
                     saveproduct =await Products.create(product)
                            if (saveproduct._options.isNewRecord === true){
                                res.status(201).send({message:"Product created"})
                            }else{
                                res.status(400).send({message:"Error while creating PRODUCT "})  
                            }                
                           
                
              }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating product "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}

// function to sign in
exports.findAllProduct = async(req, res) => {
    try{
        const findAllProducts = await Products.findAll() 
        res.status(200).send(findAllProducts)
           
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Error while getting products"})
    }
  };

  // function to update existing product
exports.updateProduct = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }


const {   product_name, product_description , product_varieties } = req.body;
  
    if ( product_name && product_description  && product_varieties  ){
        if ( product_name==="" || product_description==="" || product_varieties.length < 1 ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
     }else{      
            const id = req.params.id
            const product = {
                            product_name : req.body.product_name,
                            product_description: req.body.product_description ,
                            product_varieties: req.body.product_varieties
                           }
           
               try{         
                           updateproduct =await Products.update(product, { where: { id: id} })
                           console.log(updateproduct)
                            if (updateproduct){
                                res.status(200).send({message:"Product updated succesfully"})
                            }else{
                                res.status(400).send({message:"Error while updating PRODUCT "})  
                            }                
                           
                
              }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while updating product "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}