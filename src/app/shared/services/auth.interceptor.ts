import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService, StorageItem } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private AUTH_HEADER = "Authorization";

    constructor(public router: Router,
        private spinner: NgxSpinnerService,
        private localStorageService:LocalStorageService
        ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        // if we need to set any token. 
        const token = this.localStorageService.getItem(StorageItem.ID_TOKEN);
        if (token) {
            //req = req.clone({ headers: req.headers.set('id_token', '' + token) });
            req = req.clone({
                headers: req.headers.set(this.AUTH_HEADER, "Bearer " + token)
            });
            if (!req.headers.has("Content-Type")) {
                req = req.clone({
                    headers: req.headers.set("Content-Type", "application/json")
                });
            }
        }
        // else {
        //     // not a login user, navigate to login page. 
        //     this.router.navigateByUrl("/login/registerkey");
        // }

        return next.handle(req).pipe(
            catchError((error) => {
                let handled: boolean = false;
                //console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else if (req.url && req.url.indexOf('api/authenticate') === -1) {
                        switch (error.status) {
                            case 401:      //login
                                this.router.navigateByUrl("/401page");
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                            case 403:     //forbidden
                                this.router.navigateByUrl("/403page");
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                        }
                    }
                    this.spinner.hide();
                }

                if (handled) {
                    console.log('return back ');
                    this.spinner.hide();
                    return of(error);
                } else {
                    console.log('throw error back to to the subscriber');
                    this.spinner.hide();
                    return throwError(error);
                }
            }),
            finalize(() => this.spinner.hide())
        )
    }
    // intercept(
    //     req: HttpRequest<any>,
    //     next: HttpHandler
    // ): Observable<HttpEvent<any>> {
    //     if (!req.headers.has("Content-Type")) {
    //         req = req.clone({
    //             headers: req.headers.set("Content-Type", "application/json")
    //         });
    //     }
    //     // add to header if required. 
    //    // req = this.addAuthenticationToken(req);

    //     return next.handle(req).pipe(
    //         catchError((error: HttpErrorResponse) => {
    //             if (error && error.status === 401) {
    //                 // 401 errors are most likely going to be because we have an expired token that we need to refresh.
    //                 if (this.refreshTokenInProgress) {
    //                     // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
    //                     // which means the new token is ready and we can retry the request again
    //                     return this.refreshTokenSubject.pipe(
    //                         filter(result => result !== null),
    //                         take(1),
    //                         switchMap(() => next.handle(this.addAuthenticationToken(req)))
    //                     );
    //                 }
    //                  else {
    //                     this.refreshTokenInProgress = true;

    //                     // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
    //                     this.refreshTokenSubject.next(null);

    //                     return this.refreshAccessToken().pipe(
    //                         switchMap((success: boolean) => {
    //                             this.refreshTokenSubject.next(success);
    //                             return next.handle(this.addAuthenticationToken(req));
    //                         }),
    //                         // When the call to refreshToken completes we reset the refreshTokenInProgress to false
    //                         // for the next time the token needs to be refreshed
    //                         finalize(() => (this.refreshTokenInProgress = false))
    //                     );
    //                 }
    //             } else {
    //                 return throwError(error);
    //             }
    //         })
    //     ) as Observable<HttpEvent<any>>;
    // }

    // // private refreshAccessToken(): Observable<any> {
    // //     return of("secret token");
    // // }

    // // private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // //     // If we do not have a token yet then we should not set the header.
    // //     // Here we could first retrieve the token from where we store it.
    // //     if (!this.token) {
    // //         return request;
    // //     }
    // //     // If you are calling an outside domain then do not add the token.
    // //     if (!request.url.match(/www.mydomain.com\//)) {
    // //         return request;
    // //     }
    // //     return request.clone({
    // //         headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    // //     });
    // // }
}