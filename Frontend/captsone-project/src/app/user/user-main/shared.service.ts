import { Injectable } from '@angular/core';
import { Item } from './model.item';


@Injectable({
  providedIn: 'root'
})

export class SharedService {
  cartItems:Array<Item>= new Array();
  Total:number= 0;

  constructor() { }

  setCartItems(iName:any,price:any,quant:any, maxQuant:any){
    
    if (quant == 0){
      alert("Select quantity")
    }

    let selectedItem:Item= new Item(iName, price, quant, maxQuant);
    let found:Boolean= false;

    this.cartItems.forEach( (i) => {
      if(i.itemName == iName){
        let temp= i.quantity + quant
        if(temp > i.maxQuant){
          alert("Item Quantity is not available. Please Reduce Quantity")
        }else{
          //remove the value of item from total
          this.Total-= i.quantity * price;
          i.quantity+= quant;
          //adding the new value if the quantity is updated
          this.Total+= i.quantity * price;
          alert("Items are added to Shopping Cart");
        }
        found= true;
      }
    });

    if(!found){
      this.cartItems?.push(selectedItem);
      this.Total+= selectedItem.quantity * price;
      alert("Items are added to Shopping Cart");
    }

    
  }


  getCartItems():Array<Item>{
    return this.cartItems;
  }


  updateQuantity(iName:string,quant:number, price:number){
    this.cartItems.forEach( (i) => {
      if(i.itemName == iName){
        //remove the value of item from total
        this.Total-= i.quantity * price;
        i.quantity= quant;
        //adding the new value if the quantity is updated
        this.Total+= i.quantity * price;
      }
    });
  }


  removeFromCart(iName:any){
   for(let i= 0; i < this.cartItems.length; i++){
     if(this.cartItems[i].itemName == iName){
       this.Total-= (this.cartItems[i].quantity * this.cartItems[i].price);
       this.cartItems.splice(i,1);
     }
   }
  }

}
