const exp=require("express");
const employerRouteObj=exp.Router();

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
        folder: 'employerfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configure multer
var multerObj = multer({ storage: clStorage });


const bcrypt=require("bcryptjs");

//import json web token
const jwt=require("jsonwebtoken");

employerRouteObj.use(exp.json());


//employer registration
employerRouteObj.post("/eregister",multerObj.single("photo"),(req,res)=>{
    //get cdn links from cloudinary
    console.log(req);
    let profilepic=req.file.path;

    
    console.log("employerObject is:",req.body.employerObject);

    let employer=JSON.parse(req.body.employerObject);
    employer.photo=profilepic;
    console.log(employer);

    const employerObj=employer;
    console.log(employerObj);

    //get user colletion object
    const employerCollectionObject=req.app.get("employerCollectionObject");

    employerCollectionObject.findOne({username:employerObj.username})
    .then(employerObject=>{
        if(employerObject==null){

            bcrypt.hash(employerObj.password,5)
            .then(hashedPassword=>{
                employerObj.password=hashedPassword;
                employerCollectionObject.insertOne(employerObj)
                .then((success)=>{
                    res.send({message:"employer registration successfully"})
                })
                .catch(err=>console.log("error in inserting",err));
            }) 
        }
        else{
            res.send({message:"employerer already existed"})
        }
    })
    .catch(
        err=>console.log("err in reading employer",err)
    )

})

//user login
employerRouteObj.post("/login",(req,res)=>{
    let employerCredentialsObject=req.body;
    console.log(employerCredentialsObject);

   //get user colletion object
   const employerCollectionObject=req.app.get("employerCollectionObject");

   employerCollectionObject.findOne({username:employerCredentialsObject.username})
   .then(
       employerObject=>{
           if(employerObject==null){
               res.send({message:"invalid username",status:"failed"})
           }
           else{
               bcrypt.compare(employerCredentialsObject.password,employerObject.password,(err,result)=>{
                   if(err){
                       console.log(err);
                   }
                   else if(result==false){
                       res.send({message:"invalid password",status:"failed"});
                   }
                   else{
                       jwt.sign({username:employerObject.username},"secret",{expiresIn:100},(err,signedToken)=>{
                           if(err){
                               console.log(err);
                           }
                           else{
                               res.send({message:signedToken,username:employerObject.username,photo:employerObject.photo,status:"success",email:employerObject.email,company:employerObject.company});
                           }
                       });
                   }
               })
           }
       }
   )
   .catch(
       err=>{
           console.log("err in employer login",err);
       }
   )
})

module.exports=employerRouteObj;