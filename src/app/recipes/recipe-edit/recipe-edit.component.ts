import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private id: number;
  private editMode: boolean = false; // new or edit

  constructor(private route: ActivatedRoute) {

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
      }
    );

  }

}
