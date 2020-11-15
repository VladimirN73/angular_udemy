
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes-resolver.service'
import { AuthGuard} from '../auth/auth-guard.service';

const appRoutes: Routes =[
    { 
        path:'', //due to lazy loading in app.module, here we shall use '' instead of 'recipes'
        component: RecipesComponent,
        canActivate:[AuthGuard],
        children: [
            { path:'',    component: RecipeStartComponent},
            { path:'new', component: RecipeEditComponent},
            { path:':id', component: RecipeDetailsComponent, resolve:[RecipeResolverService]},        
            { path:':id/edit', component: RecipeEditComponent, resolve:[RecipeResolverService]},
        ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule
{

}