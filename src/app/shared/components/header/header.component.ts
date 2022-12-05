import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;
  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.userService.signOut();
  }
}
