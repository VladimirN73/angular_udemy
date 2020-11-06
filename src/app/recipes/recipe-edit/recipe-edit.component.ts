import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  myForm: FormGroup;
  private id: number;
  editMode: boolean = false; // new or edit

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) {

   }

  ngOnInit(): void {    
    
    this.route.params.subscribe(
      (params: Params)=>{
        const str = params['id'];
        if (str == undefined)
        {
          this.editMode = false;
        }
        else
        {
          this.id = +str;
          this.editMode = true;
        }        
        console.log("editMode:" + this.editMode);
        this.initForm();
      }
    );
  }

  private initForm(){

    let name = '';
    let url = '';
    let desc = '';
    let items = new FormArray([]);

    if (this.editMode) {
      const item = this.recipeService.getRecipe(this.id);
      name = item.name;
      url = item.imagePath;
      desc  = item.description;      
    }

    this.myForm = new FormGroup({
      'xName': new FormControl(name, [Validators.required]),
      'xImageUrl': new FormControl(url),
      'xDesc': new FormControl(desc),
      'xItems': items
      });

    if (this.editMode) {
      const item = this.recipeService.getRecipe(this.id);
      if (item.ingredients!=null && item.ingredients.length>0){
        for (let x of item.ingredients) {
          this.addIngredient(x.name, x.amount);
        }
      }
    }
  }

  onSubmit(){

    console.log(this.myForm);

    let item = new Recipe(0, null,null,null,null);

    if (this.editMode) {
      item = this.recipeService.getRecipe(this.id);
    }

    item.name = this.myForm.value['xName'];
    item.imagePath = this.myForm.value['xImageUrl'];
    item.description = this.myForm.value['xDesc'];
    item.ingredients = this.myForm.value['xItems'];
    
      
    this.recipeService.saveRecipe(item);   
    
    this.onCancel();
    
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});

  }

  onAddIngredient(){
    this.addIngredient(null, null);
  }

  private addIngredient(name:string, amount:number) {
    let container = this.getContainer();
    container.push( new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount':new FormControl(amount,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  getControls(){
    const ret = this.getContainer().controls; 
    return ret;
  }

  getContainer() {
    const container = <FormArray>this.myForm.get('xItems');
    return container;
  }

  onDeleteIngredient(i:number){
    //let items = this.getControls();
    //items.splice(i,1);
    this.getContainer().removeAt(i);
  }

}
