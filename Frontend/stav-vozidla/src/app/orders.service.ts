import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Order} from "./order";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersForCurrentUser(){
    return this.http.get<Order[]>(environment.appUrl + '/api/order', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }
}
