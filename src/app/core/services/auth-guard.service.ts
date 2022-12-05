import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanLoad {
	constructor(private router: Router,private userService: UserService) { }

	canLoad(route: Route, segemets: UrlSegment[]): Observable<boolean> {
		return this.userService.isAuthenticated.pipe(
			take(1),
			tap((allowed) => {
				console.log('isLogged in', this.userService.isLoggedIn())
				if (!allowed) {
					let returnUrl = segemets[0].path;
					this.router.navigate(['/login'], { queryParams: { returnUrl } });
					return false;
				} else {
					if (this.userService.isLoggedIn()) {
						return true;
					} else {
						this.router.navigate(['/login']);
						return false;
					}
				}
			})
		);
	}
}
