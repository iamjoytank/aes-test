import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User = null;
  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser)
   }

  ngOnInit(): void {
  }

}
