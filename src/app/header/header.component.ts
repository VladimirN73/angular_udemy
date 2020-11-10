import { Component, Output, EventEmitter } from '@angular/core';
import { DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    collapsed = true;

    constructor(private dataService: DataStorageService){

    }


    onSave(){
      this.dataService.storeRecipes();
    }

    onLoad(){
      this.dataService.fetchRecipes().subscribe();
    }
}
