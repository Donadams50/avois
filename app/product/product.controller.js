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

exports.addVariant = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
    console.log(JSON.parse(req.body.product_variety))
  console.log(req.file)

    const product_variety = JSON.parse(req.body.product_variety)
  
    if ( product_variety ){
        if (  product_variety ==={} ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
     }else{      
      //  const urls = []
        
        //  product_varieties.images = urls
             const id = req.params.id;
             const  findProduct =await Products.findOne({where: {id:id}})
            
             const old_variant = JSON.parse(findProduct.dataValues.product_varieties);
                     product_variety.images[0] = req.file.url    
                     old_variant.push(product_variety)
            
            const product = {
                            product_name : findProduct.dataValues.product_name,
                            product_description: findProduct.dataValues.product_description ,
                            product_varieties: old_variant
                           }
           
               try{         
                updateproduct =await Products.update(product, { where: { id: id} })
                            if (updateproduct){
                                res.status(201).send({message:"Variant added succesfully"})
                            }else{
                                res.status(400).send({message:"Error while adding varaint "})  
                            }                
                           
                
              }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while adding variant "})
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