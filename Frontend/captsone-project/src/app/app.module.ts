import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EmployeeMainComponent } from './employee/employee-main/employee-main.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { DisplayItemsComponent } from './user/user-main/display-items/display-items.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './user/user-main/shopping-cart/shopping-cart.component';
import { OrderPlacedComponent } from './user/user-main/order-placed/order-placed.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EmployeeMainComponent,
    AdminMainComponent,
    UserMainComponent,
    DisplayItemsComponent,
    ShoppingCartComponent,
    OrderPlacedComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
