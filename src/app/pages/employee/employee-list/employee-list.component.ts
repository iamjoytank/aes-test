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

  collectionSize: number = 100;
  page: number = 1;
  pageSize: number = 2;
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
      start: (this.page - 1) * this.pageSize,
      limit: this.pageSize,
      ...filters,
    };
    this.spinnerService.start();
    this.employeeService.getList(params).subscribe({
      next: (result) => {
        this.dataList['rows'] = result;
        console.log(result)
        this.spinnerService.stop();
      },
      error: (error) => {
        this.spinnerService.stop();
        this.toastService.error('Something went wrong');
      },
    });
  }

  onPageChange($event: number): void {
    this.page = $event;
    this.loadData({ next: this.dataList['rows'][this.dataList['rows'].length - 1] });
  }


  edit(data) {
    this.editData = data;
  }
}
