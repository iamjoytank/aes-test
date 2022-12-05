import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

	private subscription: Subscription;
	message: any = {};
	timeOut: any;
	constructor(private toastService: ToastService) {

	}

	ngOnInit() {

		this.subscription = this.toastService.subject
			.subscribe(message => {
				// console.log(message)
				switch (message && message.type) {
					case 'success':
						message.cssClass = 'alert alert-success';
						break;
					case 'error':
						message.cssClass = 'alert alert-danger';
						break;
				}
				this.message = message;
				this.timeOut = setTimeout(() => this.remove(), 5000)
			});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		clearTimeout(this.timeOut);
	}
	remove() {
		this.message = null;
		this.toastService.clear();
		clearTimeout(this.timeOut);
	}
}
