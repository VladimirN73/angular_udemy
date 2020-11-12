import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService} from '../shared/data-storage.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy{
    collapsed = true;
    isAuthenticated = false;

    private userSub: Subscription;

    constructor(
      private dataService: DataStorageService,
      private authService: AuthService){

    }
    ngOnInit(): void {
      this.userSub =  this.authService.user.subscribe( user=>{
        this.isAuthenticated = !user ? false : true;
      });
    
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }

    onSave(){
      this.dataService.storeRecipes();
    }

    onLoad(){
      this.dataService.fetchRecipes().subscribe();
    }

    onLogout(){
      this.authService.logout();
    }
}
