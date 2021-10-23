import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()


export class AuthGuard implements CanActivate {
    [x: string]: any;
    
    constructor(private authenticationservice: AuthService){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authenticationservice.isAuthenticatedUser(false)){
            return true;
        }
        this.router.navigate(['/login/registerkey'], { queryParams: { returnUrl: state.url }});
        return false;
        }
       
}