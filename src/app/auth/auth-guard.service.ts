import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn:"root"})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService : AuthService,
        private router: Router){

    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.authService.user.pipe(
            take(1), // to automatically remove subscription
            map(user=>{
            const isAuthenticated = !!user;  // short form for: user? true: false;
            
            if (isAuthenticated){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }


}