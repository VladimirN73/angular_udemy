import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  item: Recipe;

  constructor(
    private shoppingListService : ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.item = this.recipeService.getRecipe(+params['id']);
      }
    );
  }

  addToShoppingList()
  {
    this.shoppingListService.addItems(this.item.ingredients);
  }

}
