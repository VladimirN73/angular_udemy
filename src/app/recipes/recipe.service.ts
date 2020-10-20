import { Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService{

    recipeSelected = new Subject<Recipe>(); 

    private recipes: Recipe[] = [
        new Recipe(
            1,
            "First Test",
            "simple test","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
            [
                new Ingredient("Apples", 5),
                new Ingredient("Tomatoes", 5)
            ]
        ),
        new Recipe(
            2,
            "Wiener Schnitzel",
            "simple test",
            "https://cdn.pixabay.com/photo/2014/05/28/12/20/wiener-schnitzel-356436_1280.jpg",
            [
                new Ingredient("Fleisch", 5),
                new Ingredient("Pommes", 5)
            ]
        )
    ];

    getRecipies()
    {
        return this.recipes.slice(); // return a copy
    }

    getRecipe(id:number)
    {
        const item = this.recipes.find(
            (s) => {
              return s.id === id;
            }
          );
          return item;
    }

}