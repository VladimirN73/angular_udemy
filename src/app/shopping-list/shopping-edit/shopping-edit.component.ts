import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {

    }

    onSubmit(form: NgForm){
      console.log("on submit");
      console.log(form);

      const value = form.value;

      const name =value.nameControl;
      const amount = value.amountControl;  
      
      this.shoppingListService.addItem(name, amount);
    }
}
