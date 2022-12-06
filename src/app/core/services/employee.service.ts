import { Injectable } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: ApiService) { }

  getList(params) {
    return this.api.get(params, 'user');
  }
  search(params) {
    return this.api.searchByName(params, 'user') as Observable<Employee[]>;
  }
  getCount() {
    return this.api.getCount('user');
  }
  getById(id) {
    return this.api.getById(`user/${id}`);
  }
  checkUser(payload) {
    return this.api.checkEmailQuery(payload.email, `user`);
  }
  create(payload) {
    return this.api.post(payload, 'user');
  }

  update(payload) {
    return this.api.update(payload, 'user');
  }

  delete(id) {
    return this.api.delete(id, 'user');
  }
}
