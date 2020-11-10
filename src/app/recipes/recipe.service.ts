import { Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService{

    recipeSelected = new Subject<Recipe>(); 
    listChanged = new Subject<Recipe[]>();

    private list: Recipe[] = [];

    constructor(){
        //this.setDefaultRecipes();
        
    }

    setDefaultRecipes(){
        this.list = [
            new Recipe(
                1,
                "First Test",
                "simple test","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
                [
                    Ingredient.newItem("Apples", 1),
                    Ingredient.newItem("Tomatoes", 2)
                ]
            ),
            new Recipe(
                2,
                "Wiener Schnitzel",
                "simple test",
                "https://cdn.pixabay.com/photo/2014/05/28/12/20/wiener-schnitzel-356436_1280.jpg",
                [
                    Ingredient.newItem("Fleisch", 3),
                    Ingredient.newItem("Pommes", 4)
                ]
            )
        ];
    }

    setRecipes(recipes:Recipe[])
    {
        this.list = recipes;
        this.listChanged.next(this.getRecipies());
    }

    getRecipies()
    {
        return this.list.slice(); // return a copy
    }

    getRecipe(id:number)
    {
        const item = this.list.find(
            (s) => {
              return s.id === id;
            }
        );
        return item;
    }

    saveRecipe(item: Recipe){
        if (item.id < 1 ){
            // new item
            item.id = this.list.length + 1;
            this.list.push(item);
        }
                
        this.listChanged.next(this.getRecipies());
    }

    deleteItem(item:Recipe) {
        const index: number = this.list.indexOf(item);
        this.list.splice(index);
        this.listChanged.next(this.getRecipies());
    }
}