import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Order} from "./order";
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getOrdersForCurrentUser() {
    return this.http.get<Order[]>(environment.apiUrl + '/api/order', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(map(response => response.sort((a, b) => new Date(b.dateOfCreation).getTime() - new Date(a.dateOfCreation).getTime())))
  }

  getOrder(orderId: any) {
    return this.http.get<Order>(environment.apiUrl + '/api/order/' + orderId, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }

  export(orders: Order[]) {
    let idArray = orders.flatMap(order => order.id)
    return this.http.post(environment.apiUrl + '/api/order/export', {
      idArray: idArray
    }, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).subscribe(response => {
      console.log(response)
      this.downLoadFile(response, 'text/csv')
    })
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], {type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
