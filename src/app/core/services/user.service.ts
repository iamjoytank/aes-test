import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, authState, signOut, GoogleAuthProvider } from '@angular/fire/auth';
import { User } from 'src/app/model/user';
import { ReplaySubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

  constructor(public router: Router, public ngZone: NgZone, private auth: Auth) {
    authState(this.auth).subscribe((user: any) => {
      this.currentUser = user;
      this.isAuthenticatedSubject.next(true);
      if (this.isLoggedIn() && this.router.url.includes('login')) {
        this.router.navigate(['/']);
      }
    })
  }
  async oAuthProvider(provider) {
    return await signInWithPopup(this.auth, provider)
  }

  async signInWithGoogle() {
    return await this.oAuthProvider(new GoogleAuthProvider())
  }
  signOut() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('role');
      this.router.navigate(['login']);
    })
  }
  purgeAuth() {
    this.isAuthenticatedSubject.next(false);
  }
  isLoggedIn(): boolean {
    const user = this.currentUser;
    return !!user;
  }
  isAdmin(): boolean {
    return this.isLoggedIn() && this.currentUser.email === 'whizkid0504@gmail.com' && localStorage.getItem('role') === 'admin' ? true : false;
  }
}
