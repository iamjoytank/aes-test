import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {
  if (this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

}
