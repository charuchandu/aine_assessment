const exp=require("express");
const seekerRouteObj=exp.Router();

//import cloudinary modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');



//configure cloudinary
cloudinary.config({
    cloud_name: "dsovo9zd2",
    api_key: "783754171231941",
    api_secret: "-cNgfluzLOdJDdoiQjDcw4G1aHM"
});




//configure storage setting
var clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'seekerfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configure multer
var multerObj = multer({ storage: clStorage });


const bcrypt=require("bcryptjs");

//import json web token
const jwt=require("jsonwebtoken");

seekerRouteObj.use(exp.json());


//seeker registration
seekerRouteObj.post("/sregister",multerObj.single("photo"),(req,res)=>{
    //get cdn links from cloudinary
    console.log(req);
    let profilepic=req.file.path;

    
    console.log("seekerObject is:",req.body.seekerObject);

    let seeker=JSON.parse(req.body.seekerObject);
    seeker.photo=profilepic;
    console.log(seeker);

    const seekerObj=seeker;
    console.log(seekerObj);

    //get seeker colletion object
    const seekerCollectionObject=req.app.get("seekerCollectionObject");

    seekerCollectionObject.findOne({username:seekerObj.username})
    .then(seekerObject=>{
        if(seekerObject==null){

            bcrypt.hash(seekerObj.password,5)
            .then(hashedPassword=>{
                seekerObj.password=hashedPassword;
                seekerCollectionObject.insertOne(seekerObj)
                .then((success)=>{
                    res.send({message:"seeker registration successfully"})
                })
                .catch(err=>console.log("error in inserting",err));
            }) 
        }
        else{
            res.send({message:"seeker already existed"})
        }
    })
    .catch(
        err=>console.log("err in reading seeker",err)
    )

})

//seeker login
seekerRouteObj.post("/login",(req,res)=>{
    let seekerCredentialsObject=req.body;
    console.log(seekerCredentialsObject);

   //get user colletion object
   const seekerCollectionObject=req.app.get("seekerCollectionObject");

   seekerCollectionObject.findOne({username:seekerCredentialsObject.username})
   .then(
       seekerObject=>{
           if(seekerObject==null){
               res.send({message:"invalid username",status:"failed"})
           }
           else{
               bcrypt.compare(seekerCredentialsObject.password,seekerObject.password,(err,result)=>{
                   if(err){
                       console.log(err);
                   }
                   else if(result==false){
                       res.send({message:"invalid password",status:"failed"});
                   }
                   else{
                       jwt.sign({username:seekerObject.username},"secret",{expiresIn:100},(err,signedToken)=>{
                           if(err){
                               console.log(err);
                           }
                           else{
                               res.send({message:signedToken,username:seekerObject.username,photo:seekerObject.photo,status:"success",email:seekerObject.email});
                           }
                       });
                   }
               })
           }
       }
   )
   .catch(
       err=>{
           console.log("err in seeker login",err);
       }
   )
})

module.exports=seekerRouteObj;