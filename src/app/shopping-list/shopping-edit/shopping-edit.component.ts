import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: false }) myForm : NgForm;
    listener:Subscription;
    editMode:boolean = false;
    editItem:Ingredient; 

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
      this.listener = this.shoppingListService.startingEdit.subscribe(
        (item:Ingredient)=>{
          this.editMode = true;
          this.editItem = item;

          this.myForm.setValue({
            nameControl: this.editItem.name,
            amountControl: this.editItem.amount
          });
        }
      )
    }

    onSubmit(form: NgForm){
      console.log("on submit");
      console.log(form);

      const value = form.value;

      const name =value.nameControl;
      const amount = value.amountControl;  
      
      if (this.editMode) {
        this.editItem.name = name;
        this.editItem.amount = amount;
      } else {
        this.shoppingListService.addItem(name, amount);
      }

      form.resetForm();
      this.editMode = false;
      this.editItem = null;
    }

    onClear(){
      this.myForm.reset();
      this.editMode = false;
      this.editItem = null;
    }

    onDelete(){
      if (this.editMode){
        this.shoppingListService.deleteItem(this.editItem);
      }
      this.onClear();
    }

    ngOnDestroy(): void {
      this.listener.unsubscribe();
    }
}
