import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataForm = new FormGroup({
    role: new FormControl('employee'),
    email: new FormControl('')
  });

  roles = [
    { label: 'Employee', value: 'employee' },
    { label: 'Admin', value: 'admin' }
  ]
  constructor(private userService: UserService, private router: Router, private toastService: ToastService, public ngZone: NgZone) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      let response = await this.userService.signInWithGoogle();
      if (response.user.email != 'whizkid0504@gmail.com' && this.dataForm.get('role').value === 'admin') {
        this.userService.signOut();
        this.toastService.error('Access denied');
      }
      else {
        this.dataForm.get('email').setValue(response.user.email);
        this.ngZone.run(() => {
          localStorage.setItem('role', this.dataForm.get('role').value);
          this.router.navigate(['/product'])
        })
      }
    } catch (error) {
      this.toastService.error('Something went wrong');
    }
  }
}
