import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtService, UserService, } from './services';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
	imports: [CommonModule],
	providers: [
		AuthGuard,
		UserService
	],
	declarations: [],
})
export class CoreModule { }
