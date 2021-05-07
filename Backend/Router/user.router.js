let express= require("express");
let router= express.Router();
let UserController= require("../controller/user.controller.js");

router.get("/displayAllItems", UserController.getAllItems);
router.get("/retrieveUser/:usr", UserController.getUser);
router.put("/updateFund", UserController.updateUserFund);
router.put("/updateQuantity", UserController.updateItemQuant);
router.post("/saveOrder", UserController.saveOrder);
//router.put("/raiseTicket", UserController.raiseTicket);


module.exports= router;