import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model'

@Injectable({providedIn: 'root'})
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>(); 

    private recipes: Recipe[] = [
        new Recipe(
            "First Test",
            "simple test","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
            [
                new Ingredient("Apples", 5),
                new Ingredient("Tomatoes", 5)
            ]
        ),
        new Recipe(
            "Second Test",
            "simple test",
            "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
            [
                new Ingredient("Potato", 5),
                new Ingredient("Ananas", 5)
            ]
        )
    ];

    getRecipies()
    {
        return this.recipes.slice(); // return a copy
    }

}