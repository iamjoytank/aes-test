import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataForm = new FormGroup({
    role: new FormControl('employee')
  });
  
  roles = [
    { label: 'Employee', value: 'employee' },
    { label: 'Admin', value: 'admin' }
  ]
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.signInWithGoogle().then((response) => {
      localStorage.setItem('role', this.dataForm.get('role').value);
      this.router.navigate(['/product'])
    });
  }
}
