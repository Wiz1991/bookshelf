import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Injectable()
export class OrderService {
  private readonly BASE_HREF = 'http://localhost:3000/orders';
  constructor(private readonly httpClient: HttpClient) {}

  addOne(order: Omit<Order, 'id'>) {
    return this.httpClient.post<Order>(this.BASE_HREF, order);
  }

  getOrders(userId: string) {
    return this.httpClient.get<Order[]>(this.BASE_HREF, {
      params: {
        userId,
      },
    });
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.BASE_HREF}/${id}`);
  }
}
