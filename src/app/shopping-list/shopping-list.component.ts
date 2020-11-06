import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  list: Ingredient[] = [];

  listener:Subscription;

  constructor(private shoppingListService :ShoppingListService) { }

  ngOnInit(): void {
    this.list = this.shoppingListService.getList();
    
    this.listener = this.shoppingListService.listChanged.subscribe(
      (list:Ingredient[])=>{
        this.list = list;
      }
    )
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  onEditItem(item:Ingredient){
    console.log(item);
    this.shoppingListService.startingEdit.next(item);
  }

}
