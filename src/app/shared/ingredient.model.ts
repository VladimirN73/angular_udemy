export class Ingredient {
    constructor(
        public id:number,
        public name:string, 
        public amount:number){}

    static newItem(
        name:string, 
        amount:number):Ingredient {
            return new Ingredient(0, name, amount);
        }
}
