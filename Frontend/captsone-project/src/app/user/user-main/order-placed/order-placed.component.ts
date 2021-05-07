import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  continueShopping(){
    this.router.navigate(["displayItems"]);
  }

}
