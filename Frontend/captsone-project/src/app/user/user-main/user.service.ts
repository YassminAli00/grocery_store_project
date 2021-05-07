import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model.user';
import { Item } from './model.item';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ipAddress:string= "http://localhost:9090";
  

  constructor(public http:HttpClient) { }

    retrieveItems():Observable<Item[]>{
      return this.http.get<Item[]>(this.ipAddress+"/user/displayAllItems");
    }

    retrieveUser(usrName:any):Observable<User[]>{
      return this.http.get<User[]>(this.ipAddress+"/user/retrieveUser/"+usrName);
    }

    updateUserFund(userInfo:any):any{
      //console.log("from updateFund");
      return this.http.put(this.ipAddress+"/user/updateFund/", userInfo, {responseType:"text"});
    }

    updateItemQuantity(itemInfo:any):any{
      //console.log("from update Qant");
      return this.http.put(this.ipAddress+"/user/updateQuantity/", itemInfo, {responseType:"text"});
    }

    saveOrder(orderDetailsRef:any):any{
      return this.http.post(this.ipAddress+"/user/saveOrder", orderDetailsRef, {responseType:"text"}).subscribe(result=>console.log(result),error=>console.log(error));
    }

    updateTicketStatus(ticketRef:any):any{
      return this.http.put(this.ipAddress+"/user/raiseTicket",ticketRef,{responseType:"text"});
    }
  
}
