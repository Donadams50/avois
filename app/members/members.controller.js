const db = require("../sequelize");
const Members = db.profiles;
const Auth = db.member_auths;
const Op = db.Sequelize.Op;
const passwordUtils =require('../Helpers/passwordUtils');
const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
const { signToken } = jwtTokenUtils;
const uuid = require('uuid')


// function to create new user
exports.create = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
console.log(req.body)

const {   email, password , firstName, lastName } = req.body;
  
    if ( email && password  && lastName && firstName ){
        if ( email==="" || password==="" || firstName==="" || lastName===""  ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
     }else{
            
            
            const members = {
                            email: req.body.email,
                            firstName: req.body.firstName ,
                            lastName: req.body.lastName
                           }

           
            try{
                const [isUserExist, savedmember] = await Members.findOrCreate({
                    where: { email: email.toLowerCase() },
                    defaults:members
                  });
                  console.log(savedmember)
                  if (savedmember) {
                    const password1 = await passwordUtils.hashPassword(req.body.password.toLowerCase());
                              console.log(password1)
                                    const auth = {
                                                  email:email,
                                                  password:password1 
                                                } 
                              
                            savedpassword =await Auth.create(auth)
                                 if (savedpassword._options.isNewRecord === true){
                                       res.status(201).send({message:"User  created"})
                                }else{
                                        res.status(400).send({message:"Error while creating member "})  
                                 }
                  }else{
                    res.status(400).send({message:"Email already exist "})

                  }           
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}

// function to sign in
exports.signIn = async(req, res) => {
    if (!req.body){
      res.status(400).send({message:"Content cannot be empty"});
  }
  console.log(req.body)

  const {   email, password  } = req.body;
  
  if ( email && password ){
      if ( email==="" || password==="" ){
          res.status(400).send({
              message:"Incorrect entry format"
          });
      }else{
          
          
  
           // const newTutorial = await Tutorial.create(tutorial)

          try{
           const User = await Members.findOne({email: email} )
           const Auths = await Auth.findOne({email: email} )
           console.log(User)
             if(User){
              const retrievedPassword = Auths.password
              const id = User.id;
              const  {  email,  lastName, firstName} = User
              const isMatch = await passwordUtils.comparePassword(password.toLowerCase(), retrievedPassword);
              console.log(isMatch )
               if (isMatch){
                const tokens = signToken( id, email, lastName, firstName) 
          
              let user = {}
               
                    user.profile = { id, email, lastName, firstName} 
                    user.token = tokens;                
                    res.status(200).send(user)                         
            }else{
                res.status(400).json({message:"Incorrect Login Details"})
            }
      
      
             }else{
              res.status(400).send({message:" User does not exists"})
        }
                     
              
          }catch(err){
              console.log(err)
              res.status(500).send({message:"Error while signing in "})
          }
      }
  }else{
      res.status(400).send({
          message:"Incorrect entry format"
      });
  }
  };