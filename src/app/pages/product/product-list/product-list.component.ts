import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core';
import { ProductService } from 'src/app/core/services/product.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { confirmMessages, OPTIONS } from 'src/app/helpers';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  dataList: any = {
    rows: [],
    count: 1,
  };
  headerList = ['Name', 'Company Name', 'Mobile Number', 'Email'];
  OPTIONS = OPTIONS;
  constructor(
    private modalService: NgbModal,
    private spinnerService: SpinnerService, private toastService: ToastService,
    private productService: ProductService, public userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(filters = {}): void {
    let params = {
      ...filters,
    };
    this.spinnerService.start();
    this.productService.getList(params).subscribe({
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


  addEdit(item) {
    const modalRef = this.modalService.open(ProductDetailsComponent, {
      centered: true,
      size: 'lg',
    });
    if (item) {
      modalRef.componentInstance.modelData = item;
    }
    modalRef.result.then(
      (result) => {
        this.loadData();
      },
      (dismiss) => {
      }
    );
  }

  openDeleteConfirmation(item) {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.title = `${confirmMessages.deleteTitle}?`;
    modalRef.componentInstance.description = `${confirmMessages.deleteDescription} ?`;
    modalRef.componentInstance.okText = 'Yes';
    modalRef.componentInstance.cancelText = 'Cancel';
    modalRef.result.then(
      (result) => {
        this.delete(item);
      },
      (dismiss) => { }
    );
  }

  delete(item): void {
    this.spinnerService.start();
    this.productService.delete(item.id).then((response) => {
      this.spinnerService.stop();
      this.toastService.success('Employee delete');
    }).catch((error) => {
      this.spinnerService.stop();
      this.toastService.error('Something went wrong');
    });
  }
}
