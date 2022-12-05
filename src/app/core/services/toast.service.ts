import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public subject = new Subject<any>();
  staticAlertClosed = true;
  constructor() { }

  getAlert(): Observable<any> {
    console.log("toast");
    return this.subject.asObservable().pipe();
  }

  success(message: string) {
    this.subject.next({
      type: 'success',
      text: 'Success message',
      description: message,
      icon: 'fa-check',
    });
  }

  error(message: string) {
    this.subject.next({
      type: 'error',
      text: 'Error message',
      description: message,
      icon: 'fa-times',
    });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next({});
  }
}
