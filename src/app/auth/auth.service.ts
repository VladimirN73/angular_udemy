import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { User} from './user.model';

export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn:"root"})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenTimer: any;
 
    private apikey="AIzaSyAxGRNOYL2z6w8UNgQAyapqr_KREFEiCCc";
    private apiSignUp:string="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apikey;
    private apiLogin :string="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apikey;

    constructor(
        private http:HttpClient,
        private router: Router){                    
    }

    signup(strEmail:string, strPassword:string){
        return this.http
            .post<AuthResponseData>(
                this.apiSignUp,
                {
                    email : strEmail,
                    password : strPassword,
                    returnSecureToken : true
                })
            .pipe(
                catchError(this.handleError), 
                tap(this.handleAuth)
            );        
    }

    autoLogin()
    {
        const userData :{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData){
            return;
        }

        const loggedUser = new User(
            userData.email, 
            userData.id, 
            userData._token,
            new Date(userData._tokenExpirationDate));
            
        if (loggedUser.token){
            this.user.next(loggedUser);

            const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expDuration);
        }
    }

    login(strEmail:string, strPassword:string){
        return this.http
            .post<AuthResponseData>(
                this.apiLogin,
                {
                    email : strEmail,
                    password : strPassword,
                    returnSecureToken : true
                })
            .pipe(
                catchError(this.handleError), 
                tap(x=>this.handleAuth(x))
            );        
    }

    logout()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenTimer){
            clearTimeout(this.tokenTimer);
        }

        this.tokenTimer = null;
    }

    autoLogout(durationImMilliseconds: number){
        console.log("Auto-Logout in:" + durationImMilliseconds/1000/60 + " min");
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        }, durationImMilliseconds) 

    }

    private handleAuth(x : AuthResponseData){
        const expDate = new Date(new Date().getTime() + +x.expiresIn*1000); 
        const loggedUser = new User(x.email, x.localId, x.idToken, expDate); 

        this.user.next(loggedUser);

        localStorage.setItem('userData', JSON.stringify(loggedUser));

        this.autoLogout(+x.expiresIn*1000);
    }

    private handleError(errorResponse: HttpErrorResponse){

        let errorMessage="Unknown error";

        if (!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        
        switch(errorResponse.error.error.message){
            case 'EMAIl_EXISTS'     :errorMessage = "this email exists already"; break;
            case 'EMAIL_NOT_FOUND'  :errorMessage = "email not found"; break;
            case 'INVALID_PASSWORD' :errorMessage = "invalid password"; break;
            case 'USER_DISABLED'    :errorMessage = "user disabled";
        }

        return throwError(errorMessage);
    }

}