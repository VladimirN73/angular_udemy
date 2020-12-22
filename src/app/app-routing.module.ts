
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const appRoutes: Routes =[
    { path:'', redirectTo: 'recipes', pathMatch: 'full' },  
    { 
      path: 'recipes',      
      loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) // lazy loading
    },
    { 
      path:'shopping-list',
      loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) // lazy loading
    },
    {
      path:'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) // lazy loading
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })], // preloading
    exports: [RouterModule]
})
export class AppRoutingModule
{

}