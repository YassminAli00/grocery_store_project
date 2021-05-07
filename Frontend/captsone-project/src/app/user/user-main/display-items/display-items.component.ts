import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { Item } from '../model.item';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements OnInit {

   allItems:Array<Item>= new Array();

  constructor( public userServ:UserService, public router:Router, public sharedServ:SharedService ) { }

  ngOnInit(): void {
    this.userServ.retrieveItems().subscribe(result=>this.allItems=result);
  }

  saveToCart(iName:any,price:any,quant:any, maxQuant:any){
    this.sharedServ.setCartItems(iName, Number(price), Number(quant), Number(maxQuant));
  }

  gotoCart(){
    this.router.navigate(["shoppingCart"])
  }
}
