import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { Recipe } from '../recipes/recipe.model';

import { RecipeService} from '../recipes/recipe.service';

@Injectable({providedIn:"root"})
export class DataStorageService {

    myapi="https://angular-udemy-47a3f.firebaseio.com/";

    error = new Subject<string>();

    constructor(
        private http:HttpClient,
        private recipeService: RecipeService){
        
    }

    storeRecipes() {

        const data = this.recipeService.getRecipies();

        this.http
          .put(
            this.myapi + 'recipes.json',
            data
            )
          .subscribe(responseData => {
            console.log(responseData);
          }, error=>{
              this.error.next(error.message);
          });
    }

    public fetchRecipesOld() 
    {
        return this.http
            .get<Recipe[]>(this.myapi + 'recipes.json')
            .pipe(map(recipes=>{
                return recipes.map(recipe=>{
                    if (!recipe.ingredients){
                        recipe.ingredients = [];
                    }
                    return recipe;
                })
            }))
            .subscribe(response => {
                console.log(response);
                this.recipeService.setRecipes(response);
            });
    }

    public fetchRecipes() 
    {
        return this.http
            .get<Recipe[]>(this.myapi + 'recipes.json')
            .pipe(
                map(recipes=>{
                    return recipes.map(recipe=>{
                        if (!recipe.ingredients){
                            recipe.ingredients = [];
                        }
                        return recipe;
                    })
                }),
                tap(recipes=>{
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
}