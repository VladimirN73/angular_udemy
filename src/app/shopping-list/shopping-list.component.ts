import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  list: Ingredient[] = [];

  listener:Subscription;

  constructor(
    private shoppingListService :ShoppingListService,
    private logService: LoggingService) { }

  ngOnInit(): void {
    this.list = this.shoppingListService.getList();
    
    this.listener = this.shoppingListService.listChanged.subscribe(
      (list:Ingredient[])=>{
        this.list = list;
      }
    )

    this.logService.printLog('ShoppingListComponent.OnInit');    
  }

  onEditItem(item:Ingredient){
    console.log(item);
    this.shoppingListService.startingEdit.next(item);
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
