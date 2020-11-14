import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { CoreModule } from '../core.module'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild([{ path:'auth', component: AuthComponent }]),
  ],
  providers: [],
  bootstrap: []
})
export class AuthModule { }
