import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { OPTIONS } from 'src/app/helpers';
import { Employee } from 'src/app/model/employee';
import { combineLatest, map } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  dataList: any = {
    rows: [],
    count: 1,
  };
  headerList = ['Name', 'Company Name', 'Mobile Number', 'Email'];
  OPTIONS = OPTIONS;
  editData: Employee = null;
  constructor(
    private spinnerService: SpinnerService,
    private employeeService: EmployeeService, private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(filters = {}): void {
    let params = {
      ...filters,
    };
    this.spinnerService.start();
    this.employeeService.getList(params).subscribe({
      next: (result) => {
        this.dataList['rows'] = result;
        this.spinnerService.stop();
      },
      error: (error) => {
        this.spinnerService.stop();
        this.toastService.error('Something went wrong');
      },
    });
  }

  edit(data) {
    this.editData = data;
  }
}
