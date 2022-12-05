import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtService, } from './services';

@NgModule({
	imports: [CommonModule],
	providers: [
		JwtService,
	],
	declarations: [],
})
export class CoreModule { }
