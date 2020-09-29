import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("First Test","simple test","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg"),
    new Recipe("Second Test","simple test","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(item:Recipe){
    this.itemSelected.emit(item);
  }

}
