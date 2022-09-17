import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService, StorageItem } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  [x: string]: any;
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private localStorageService: LocalStorageService
  ) {

  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User): boolean {

    // get password from local storage. 
    const password = this.localStorageService.getItem('password');
    if (password) {
      return user.email === 'admin@gmail.com' && user.password === password;
    } else {
      return user.email === 'admin@gmail.com' && user.password === 'Admin@123';
    }
  }


  getToken() {
    return this.localStorageService.getItem(StorageItem.ID_TOKEN);
  }

  get isLoggedIn(): boolean {
    let authToken = this.localStorageService.getItem(StorageItem.ID_TOKEN);
    return (authToken !== null) ? true : false;
  }

  isAuthenticatedUser(isPageRedirect: boolean = false): boolean {
    let authToken = this.localStorageService.getItem(StorageItem.ID_TOKEN);
    if (authToken === null && isPageRedirect) {
      this.router.navigate(['/login/login']);
    }
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = this.localStorageService.removeAllItem();
    if (removeToken == null) {
      this.localStorageService.setLanguageItem("en");
      this.router.navigate(['/login/login']);
    }
  }

  // User profile
  //   getUserProfile(id:string): Observable<any> {
  //     let api = `${this.endpoint}/user-profile/${id}`;
  //     return this.http.get(api, { headers: this.headers }).pipe(
  //       map((res: Response) => {
  //         return res || {}
  //       }),
  //       catchError(this.handleError)
  //     )
  //   }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}