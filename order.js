require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app=express();
app.use(express.json());
const Order = require("./model/order");

app.get("/",(req,res)=>{
    res.send("<h1>Project is running</h1>")
});

app.post("/orders/create",async(req,res)=>{
    try {
        const {order_id,item_name,cost,order_date,delivery_date} = req.body;

        if(!order_id && !item_name && !cost && !order_date && !delivery_date) {
            res.status(400).send("All fields are required");
        }

        let existOrder = await Order.findOne({order_id});

        if(existOrder){
            res.status(400).send("Order id already exists");
        }

        if(typeof cost==="string"){
            parseInt(cost)
        }


        const saveData = await Order.create({
            order_id,
            item_name,
            cost,
            order_date,
            delivery_date
        });

        if(saveData){
            res.status(200).json({"message":"Order has been created successfully",data:saveData})
        } else {
            res.status(400).send("Something went wrong!")
        }
    } catch (e) {
        console.log("Error=",e);
    }
})


/* Update Order */

app.post("/orders/update",async(req,res)=>{
    try {
        const {order_id,delivery_date} = req.body;

        if(!order_id) {
            res.status(400).send("Order id is required");
        }

        if(!delivery_date) {
            res.status(400).send("Delivery date is required");
        }

        let existOrder = await Order.findOne({order_id});

        if(!existOrder){
            res.status(400).send("Invalid order id");
        }

        const updateData = await Order.updateOne({order_id:order_id},{delivery_date:delivery_date});

        if(updateData){
            res.status(200).json({"message":"Order has been updated successfully"})
        } else {
            res.status(400).send("Something went wrong!")
        }
    } catch (e) {
        console.log("Error=",e);
    }
})

/* Orders list*/

app.post("/orders/list",async(req,res)=>{
    try {
        let order_date=new Date(req.body.order_date);

        if(!order_date) {
            res.status(400).send("Order date is required");
        }

        const getRecords = await Order.find({ order_date: { $gte: order_date, $lt: new Date(order_date.getTime() + 24 * 60 * 60 * 1000) } });

        if(getRecords){
            res.status(200).json({"message":"Order list has been fetched successfully",data:getRecords})
        } else {
            res.status(400).send("Something went wrong!")
        }
    } catch (e) {
        console.log("Error=",e);
    }
})

/* Get Records  Search*/

app.get("/orders/search/:id",async(req,res)=>{
    try {
        const order_id = req.params.id;

        if(!order_id) {
            res.status(400).send("Order id is required");
        }

        const getData = await Order.find({order_id:order_id});

        if(getData){
            res.status(200).json({"message":"Order has been fetched successfully",data:getData})
        } else {
            res.status(400).send("No data found!")
        }
    } catch (e) {
        console.log("Error=",e);
    }
})

/* Delete Record */


app.delete("/orders/delete",async(req,res)=>{
    try {
        const {order_id} = req.body;

        if(!order_id) {
            res.status(400).send("Order id is required");
        }

        let existOrder = await Order.findOne({order_id});

        if(!existOrder){
            res.status(400).send("Invalid order id");
        }

        const deleteData = await Order.deleteOne({order_id:order_id});

        if(deleteData && deleteData.deletedCount>0){
            res.status(200).json({"message":"Order has been removed successfully"})
        } else {
            res.status(400).send("Something went wrong!")
        }
    } catch (e) {
        console.log("Error=",e);
    }
})

module.exports=app;