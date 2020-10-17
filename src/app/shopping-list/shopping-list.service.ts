import { EventEmitter, Injectable } from "@angular/core";

import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService{

    listChanged = new EventEmitter<Ingredient[]>();

    private list: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 5)
      ];

    getList()
    {
        return this.list.slice(); // return a copy
    }

    addItem(name:string, count:number){
      this.list.push(new Ingredient(name,count));
      this.listChanged.emit(this.getList());
    }

    addItems(ingredients: Ingredient[]){
      this.list.push(...ingredients);
      this.listChanged.emit(this.getList());
    }

}