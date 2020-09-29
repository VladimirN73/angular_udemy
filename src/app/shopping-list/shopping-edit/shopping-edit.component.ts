import { CommentStmt } from '@angular/compiler';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() addItem = new EventEmitter<Ingredient>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    const name =this.nameInputRef.nativeElement.value;
    const amount =this.amountInputRef.nativeElement.value;  
    this.addItem.emit(new Ingredient(name, amount));
  }
}
