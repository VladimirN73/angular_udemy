import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  list: Ingredient[] = [];

  constructor(private shoppingListService :ShoppingListService) { }

  ngOnInit(): void {
    this.list = this.shoppingListService.getList();
    this.shoppingListService.listChanged.subscribe(
      (list:Ingredient[])=>{
        this.list = list;
      }
    )
  }
}
