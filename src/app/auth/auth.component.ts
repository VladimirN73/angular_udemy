import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService} from '../auth/auth.service';
import { AlertComponent} from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective;

  isLoggingMode: boolean = true;
  isWaiting:boolean = false;
  error:string = null;

  private closeSub:Subscription =null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentfactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
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
        this.showErrorAlert(errorMessage); // show alert programmatically
      }
    );
  }

  onHandleError(){
    this.error = null;
  }

  // create alert programmatically
  private showErrorAlert(message: string){
    const factory = this.componentfactoryResolver.resolveComponentFactory(AlertComponent);

    const view = this.alertHost.viewContainerRef;

    view.clear();

    const component = view.createComponent(factory).instance;

    component.message=message;

    this.closeSub = component.close.subscribe(() => {
      this.closeSub.unsubscribe();
      view.clear();
    })
    
  }

}
