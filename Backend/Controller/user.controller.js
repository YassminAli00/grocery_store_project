const ItemModel= require("../model/item.model.js");
const UserModel = require("../model/user.model.js");
const OrderModel = require("../model/order.model.js");

orderId= 15;
//this returns a json array to front end to display the content of array
let getAllItems= (req,res)=> {
    ItemModel.find({}, (err,result)=> {
        if(!err){
            res.json(result);
        }else{
            res.json(err);
        }
    })
}

//this returns the record of the required user
let getUser= (req,res)=> {
    let user= req.params.usr;
    UserModel.find({userName:user}, (err,result)=> {
        if(!err){
            res.json(result)
        }else{
            res.json(err);
        }
    })
}

let updateUserFund= (req,res)=> {
    let userN= req.body.usr;
    let updatedFund= req.body.fund;

    UserModel.updateOne({userName:userN}, {$set:{fund:updatedFund}}, (err,result)=> {
        if(!err){
            if(result.nModified > 0){
                console.log("Fund updated successfully");   
            }else{
                console.log("Fund is not updated");
            }   
        }else{
            console.log("Error generated in Fund update"+err);
        }
        res.send();
    })
}

let updateItemQuant= (req,res)=> {
    let iName= req.body.itemName;
    let updatedMaxQuant= req.body.maxQ;

    ItemModel.updateOne({itemName:iName}, {$set:{maxQuant:updatedMaxQuant}}, (err,result)=> {
        if(!err){
            if(result.nModified > 0){
                console.log("Quantity updated successfully");
            }else{
                console.log("Quantity is not updated");
            }  
        }else{
            console.log("Error generated in Quantity update"+err);
        }
        res.send();
    })
}


//place an order by saving it to ordersTable
let saveOrder= (req, res)=> {
    let orderItems= req.body.items;
    let username= req.body.usrN;
    let orderTotal= req.body.total;
    let D= req.body.date;

    orderId+=1;
    let order= new OrderModel({
        _id:orderId,  //this needs to be auto generated id
        itemsNames:orderItems, //this is an array of item ids
        userName:username,
        status:"order received",
        total:orderTotal, 
        date:D
    });

    order.save((err,result)=> {
        if(!err){
            res.send("Saved Order Successfully")
        }else{
            res.send("Error..Cannot place an order"+err)
        }
    });  
}

//raising ticket for 
let raiseTicket= (req,res)=> {
    let userId= req.body.uid;

    UserModel.find({_id:userId}, (err,data)=> {
        if(!err){
            data.ticket= true;
            res.send("Ticket is raised successfully");
        }else{
            res.send("Error raising the ticket");
        }
    })
}

module.exports= {getAllItems, getUser, updateUserFund, updateItemQuant, saveOrder, raiseTicket};