import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }

  getList(params) {
    return this.api.get(params, 'product') as Observable<Product[]>;
  }

  getById(id) {
    return this.api.getById(`product/${id}`);
  }

  create(payload) {
    return this.api.post(payload, 'product');
  }

  update(payload) {
    return this.api.update(payload, 'product');
  }

  delete(id) {
    return this.api.delete(id, 'product');
  }
}
