import express from "express";
import fleet from "../model/fleet.Model.js";
let route = express.Router();




route.post("/createfleet",async function (req,res){
 let data = req.body;
  console.log(data,"the api is running");
 let createData = await fleet.create(data)
 res.json({successs:true,massage: "the api is working",data:createData})
});




export default route;