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
    return this.http.get<Order[]>(environment.apiUrl + '/api/order', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }

  export() {
    return this.http.get(environment.apiUrl + '/api/order/export', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'text/csv'}),
    }).subscribe(response => {
      console.log(response)
      this.downLoadFile(response, 'text/csv')
    })
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
