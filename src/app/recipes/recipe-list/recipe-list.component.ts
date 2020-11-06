import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes: Recipe[] = [];

  listener:Subscription;

  listChanged = new Subject<Recipe[]>();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipies();

    this.listener = this.recipeService.listChanged.subscribe(
      (list:Recipe[])=>{
        this.recipes = list;
      }
    )
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy()
  {
    this.listener.unsubscribe();
  }
}
