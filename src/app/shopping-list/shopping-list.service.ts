import { Injectable } from "@angular/core";

import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService{

    listChanged = new Subject<Ingredient[]>();
    startingEdit = new Subject<Ingredient>();

    private list: Ingredient[] = [
        new Ingredient(1, "Apples", 5),
        new Ingredient(2, "Tomatoes", 5)
      ];

    getList()
    {
        return this.list.slice(); // return a copy
    }

    addItem(name:string, amount:number){
      this.list.push(new Ingredient(this.list.length,name,amount));
      this.listChanged.next(this.getList());
    }

    addItemX(item:Ingredient){
      this.list.push(item);
      this.listChanged.next(this.getList());
    }

    addItems(ingredients: Ingredient[]){
      this.list.push(...ingredients);
      this.listChanged.next(this.getList());
    }

    deleteItem(item:Ingredient){
      const index: number = this.list.indexOf(item);
      this.list.splice(index);
      this.listChanged.next(this.getList());
    }
}