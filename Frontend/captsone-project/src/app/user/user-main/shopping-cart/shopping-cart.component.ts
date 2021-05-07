import { Component, OnInit } from '@angular/core';
import { Item } from '../model.item';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service'
import { User } from '../model.user';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  //creating cartItems is important in order to use it in html to display Items in the cart
  cartItems:Array<Item>= new Array();
  Total:number= 0;
  usersArr:Array<User>= new Array(); 
  updateMsg:string= "";
  //userName:string= this.userServ.usrName;
  saveMsg:string=""

  //this value is hard coded..it must be updated when user login
  usrName:string= "jas60";

  constructor(public sharedServ:SharedService, public router:Router, public userServ:UserService) { }

  ngOnInit(): void {
    this.userServ.retrieveUser(this.usrName).subscribe(result=>this.usersArr=result);
    //updating this.cartItems everytime shared resource changes
    this.cartItems= this.sharedServ.getCartItems();
    this.Total= this.sharedServ.Total;
  }

  updateQuantity(Id:any, quant:any, price:any){
    this.sharedServ.updateQuantity(Id,Number(quant), Number(price));
    this.cartItems= this.sharedServ.getCartItems();
    this.Total= this.sharedServ.Total;
  }

  removeFromCart(Id:any){
    this.sharedServ.removeFromCart(Id);
    this.Total= this.sharedServ.Total;
  }

  placeOrder(){
    if(this.Total == 0){
      alert("Cart is empty")
    }

    let currentFund= this.usersArr[0].fund;

    if(this.Total > currentFund){
      alert("Not Enough fund in your account");
      
    }else{

      let itemsNames:Array<string>= new Array();
      for(let i= 0; i < this.cartItems.length; i++){
          //populating itemsNames to use it later in saving order step
          itemsNames.push(this.cartItems[i].itemName);
      }

      //saving new ordr in the database
      let today = new Date();
      let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.userServ.saveOrder({"items":itemsNames, "usrN":this.usrName, "total":this.Total, "date":currentDate});
      

        let updatedFund= currentFund - this.sharedServ.Total;
        this.usersArr[0].fund= updatedFund;

        this.userServ.updateUserFund({"usr":this.usrName, "fund":updatedFund}).subscribe((result:string)=> {
        this.updateMsg=result});

      
        for(let i= 0; i < this.cartItems.length; i++){
          let newMaxQuant= this.cartItems[i].maxQuant - this.cartItems[i].quantity;
          let iName= this.cartItems[i].itemName;
          this.userServ.updateItemQuantity({"itemName": iName, "maxQ": newMaxQuant}).subscribe((result:string)=>{
          this.updateMsg=result});
        }

        //restore all shopping cart storage after placing an order
        this.cartItems=[];
        this.sharedServ.cartItems= [];
        this.sharedServ.Total= 0;

        //navigate to the review page
        this.router.navigate(["orderPlaced"])

    }
  }

  refund(userName:string, total:number){
    //array of json to hold user information
    let refundedUser:Array<User>= new Array();
    //retrieving user information using userName
    this.userServ.retrieveUser(userName).subscribe(result=>refundedUser=result);
    //getting the current fund saved in database
    let currentFund= refundedUser[0].fund;
    //refund by adding the order total to currentfund
    let updatedFund= currentFund + total;
    //updating the fund in the database
    this.userServ.updateUserFund({"usr":this.usrName, "fund":updatedFund}).subscribe((result:string)=> {
      this.updateMsg=result});
  }
}
