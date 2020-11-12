import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoggingMode: boolean = true;
  isWaiting:boolean = false;
  error:string = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode()
  {
    this.isLoggingMode = !this.isLoggingMode;
  }

  onSubmit(form:NgForm){

    this.error = null;
    
    if (!form.value){
      return;
    }

    this.isWaiting = true;

    const email:string= form.value.emailControl;
    const password:string= form.value.passwordControl;

    let obs: Observable<AuthResponseData> = null;

    if (this.isLoggingMode){
      obs = this.authService.login(email, password);
    } else {
      obs = this.authService.signup(email, password)
    }

    obs.subscribe(
      response => {
        console.log(response);
        this.isWaiting = false;
        form.reset();
        this.router.navigate(['./recipes']);
      },
      errorMessage => {
        this.error = errorMessage;      
        this.isWaiting = false;
      }
    );
  }

}
