import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/core/services/product.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { productFieldForm } from 'src/app/helpers/form-error.helper';
import { validateField } from 'src/app/shared/validators/form.validator';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() modelData: any;
  dataForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  errorMessages = productFieldForm;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (this.modelData) {
      this.getById();
    }
  }

  get form() {
    return this.dataForm.controls;
  }

  /**
   * close modal
   */
  closeModal() {
    this.dataForm.reset();
    this.activeModal.close('close with cancel button');
  }
  /**
   * dismiss modal
   */
  dismissModal() {
    this.modalService.dismissAll('dismiss with cross click');
  }

  getById() {
    this.spinnerService.start();
    this.productService.getById(this.modelData.id).subscribe({
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
    this.productService.create(this.dataForm.getRawValue()).then((response) => {
      this.spinnerService.stop();
      this.toastService.success('Product added');
      this.closeModal();
    }).catch((error) => {
      this.spinnerService.stop();
      this.toastService.error('Something went wrong');
    });
  }

  update(): void {
    this.productService.update(this.dataForm.getRawValue()).then((response) => {
      this.spinnerService.stop();
      this.toastService.success('Product updated');
      this.closeModal();
    }).catch((error) => {
      this.spinnerService.stop();
      this.toastService.error('Something went wrong');
    });
  }
}
