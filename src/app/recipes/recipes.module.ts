import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from '../recipes/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from '../recipes/recipe-details/recipe-details.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
    declarations: [ 
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
    ],
    exports: [
    ],
    providers: [
    ],
    bootstrap: []
  })
export class RecipesModule{

}