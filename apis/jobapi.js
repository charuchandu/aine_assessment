const exp = require("express");
const jobRouteObj = exp.Router();


jobRouteObj.use(exp.json());


//job posting
jobRouteObj.post("/jobPost", (req, res) => {

    console.log("jobObject is:", req.body);

    let jobObj = req.body

    //get job colletion object
    const jobCollectionObject = req.app.get("jobCollectionObject");

    jobCollectionObject.insertOne(jobObj)
        .then((success) => {
            res.send({ message: "job posted successfully" })
        })
        .catch(err => console.log("error in posting", err));
})

//getting notifications
jobRouteObj.get("/notifications",(req,res)=>{
    //get job collection object
    const jobCollectionObject=req.app.get("jobCollectionObject");
    jobCollectionObject.find().toArray()
    .then(
        jobArray=>res.send({message:"success",notifications:jobArray})
    )
    .catch(err=>{
        res.send({message:"err"})
    })
})

module.exports = jobRouteObj;