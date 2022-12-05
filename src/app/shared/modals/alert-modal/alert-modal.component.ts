import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-alert-modal',
	templateUrl: './alert-modal.component.html',
})
export class AlertModalComponent {
	@Input() title: string = '';
	@Input() description: string = '';
	@Input() cancelText: string = '';
	@Input() okText: string = '';
	@Input() image: string = '';
	@Input() okButtonColor: string = 'btn-primary';
	@Input() cancelButtonColor: string = 'btn-light';

	constructor(public activeModal: NgbActiveModal) {}
}
