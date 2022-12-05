import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { confirmMessages, OPTIONS } from 'src/app/helpers';
import { employeeFieldForm } from 'src/app/helpers/form-error.helper';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { validateField } from 'src/app/shared/validators/form.validator';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() modelData: any;
  dataForm = new FormGroup({
    id: new FormControl(null),
    role: new FormControl('employee'),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(OPTIONS.emailPattern)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(OPTIONS.mobileNumberPattern)]),
    company: new FormControl('', [Validators.required])
  });
  errorMessages = employeeFieldForm;

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelData'] && this.modelData) {
      this.getById();
    }
  }

  getById() {
    this.spinnerService.start();
    this.employeeService.getById(this.modelData.id).subscribe({
      next: (response) => {
        this.dataForm.patchValue(response);
        this.form['id'].setValue(this.modelData.id)
        this.spinnerService.stop();
      },
      error: error => {
        this.spinnerService.stop();
        this.toastService.error('Something went wrong');
      }
    })
  }
  get form() {
    return this.dataForm.controls;
  }

  reset() {
    this.dataForm.reset();
    this.form['role'].setValue('employee');
    this.modelData = null;
  }

  onSubmit(): void {
    if (this.dataForm.invalid) {
      validateField(this.dataForm);
      return;
    }
    this.spinnerService.start();
    if (this.form['id'].value === null) this.create();
    else this.update();
  }

  create(): void {
    this.employeeService.create(this.dataForm.getRawValue()).then((response) => {
      this.spinnerService.stop();
      this.reset();
      this.toastService.success('Employee added');
    }).catch((error) => {
      this.spinnerService.stop();
      this.toastService.error('Something went wrong');
    });
  }

  update(): void {
    this.employeeService.update(this.dataForm.getRawValue()).then((response) => {
      this.spinnerService.stop();
      this.reset();
      this.toastService.success('Employee updated');
    }).catch((error) => {
      this.spinnerService.stop();
      this.toastService.error('Something went wrong');
    });
  }

  openDeleteConfirmation() {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.title = `${confirmMessages.deleteTitle}?`;
    modalRef.componentInstance.description = `${confirmMessages.deleteDescription} ?`;
    modalRef.componentInstance.okText = 'Yes';
    modalRef.componentInstance.cancelText = 'Cancel';
    modalRef.result.then(
      (result) => { this.delete(); },
      (dismiss) => {
      }
    );
  }

  delete(): void {
    this.spinnerService.start();
    this.employeeService.delete(this.modelData.id).then((response) => {
      this.reset();
      this.spinnerService.stop();
      this.toastService.success('Employee delete');
    }).catch((error) => {
      this.spinnerService.stop();
      this.toastService.error('Something went wrong');
    });
  }
}
