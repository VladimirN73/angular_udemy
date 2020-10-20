import { Injectable } from "@angular/core";

import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService{

    listChanged = new Subject<Ingredient[]>();

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
      this.listChanged.next(this.getList());
    }

    addItems(ingredients: Ingredient[]){
      this.list.push(...ingredients);
      this.listChanged.next(this.getList());
    }

}