const Order = require("./orderClass");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcome"),
    SIZE: Symbol("size"),
    BREAD: Symbol("bread"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks"),
    COMBO: Symbol("combo"),
    COMPLETE: Symbol("complete")
});

module.exports = class SandwichOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sBread = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sCombo = "";
        this.sandwichRt = 3.99;
        this.burgerRt = 3;
        this.pizzaRt = 4;
    }

    handleSandwich(sInput){
        let aReturn = [];
        switch(this.stateCur){  
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE
                aReturn.push("What size of Sandwich would you like to order? Enter 6 for 6-inch or 12 for 12-inch");
                break;            
            case OrderState.SIZE:
                this.stateCur = OrderState.BREAD
                if(sInput == 6) {
                    this.sSize = '6-inch';
                    this.sandwichRt = this.sandwichRt + 1
                }
                if(sInput == 12) {
                    this.sSize = '12-inch';
                    this.sandwichRt = this.sandwichRt + 2
                }
                aReturn.push("What type of bread would you like? Enter 1 for Italian or 2 for Italian Herbs and cheese?");
                break;
            case OrderState.BREAD:
                this.stateCur = OrderState.TOPPINGS
                if(sInput == 2) {
                    this.sBread = 'Italian Herbs and cheese';
                    this.sandwichRt = this.sandwichRt + 2
                 } else {
                    this.sBread = 'Italian';
                     this.sandwichRt = this.sandwichRt + 1;
                 }
                aReturn.push("What toppings would you like?");
                break; 
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.COMBO
                this.sToppings = sInput;
                this.sandwichRt = this.sandwichRt + 3
                aReturn.push("Would you like to make it a combo for extra $4.50?(yes/no) Combo comes with one drink and two Chocolate cookies!");
                break;
            case OrderState.COMBO:
                if(sInput.toLowerCase() == "yes"){
                    this.sandwichRt = this.sandwichRt + 4.50;
                }
                this.isDone(true);
                this.sCombo = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} sandwich with ${this.sBread} bread and ${this.sToppings}`);
                aReturn.push(`Your respond to combo option is:${this.sCombo}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total amount for your Order before tax: $ ${this.sandwichRt}`)
                break;  
        }
        return aReturn;
    }

    handleBurger(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE
                aReturn.push("What size of Burger would you like to order? Enter 4 for 4-oz or 6 for 6-oz");
                break;                
            case OrderState.SIZE:
                this.stateCur = OrderState.BREAD
                if(sInput == 4) {
                    this.sSize = '4-oz';
                    this.burgerRt = this.burgerRt + 2;
                } 
                if(sInput == 6) {
                    this.sSize = '6-oz';
                    this.burgerRt = this.burgerRt + 4;
                }
                aReturn.push("What type of bread would you like? Enter 1 for Sesame bun or 2 for Gluten Free bun");
                break;
            case OrderState.BREAD:
                this.stateCur = OrderState.TOPPINGS
                if(sInput == 1) {
                    this.sBread = 'Sesame';
                    this.burgerRt = this.burgerRt + 1.50;
                } 
                if(sInput == 2) {
                    this.sBread = 'Gluten free';
                    this.burgerRt = this.burgerRt + 2.50;
                }
                aReturn.push("What toppings would you like?");
                break; 
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.COMBO
                this.sToppings = sInput;
                this.burgerRt = this.burgerRt + 4;
                aReturn.push("Would you like to make it a combo for extra $4.50?(yes/no) Combo comes with one drink and Fries!");
                break;
            case OrderState.COMBO:
                if(sInput.toLowerCase() == "yes"){
                    this.burgerRt = this.burgerRt + 4.50;
                }
                this.isDone(true);
                this.sCombo = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} burger with ${this.sBread} bun and ${this.sToppings}`);
                aReturn.push(`Your respond to combo option is:${this.sCombo}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total amount for your Order before tax: $  ${this.burgerRt}`);
                break;  
        }
        return aReturn;
    }

    handlePizza(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("What size pizza would you like? Enter 1 for medium or 2 for Large");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                if(sInput == 1) {
                    this.sSize = 'Medium';
                    this.pizzaRt = this.pizzaRt + 2;
                }
                if(sInput == 2){
                    this.sSize = 'Large';
                    this.pizzaRt = this.pizzaRt + 4;
                } 
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                this.pizzaRt = this.pizzaRt + 5;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                if(sInput.toLowerCase() == 'yes'){
                    this.pizzaRt = this.pizzaRt + 2.50;
                }
                this.isDone(true);
                this.sDrinks = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} pizza with ${this.sToppings}`);
                aReturn.push(`Your respond to drink option is:${this.sDrinks}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total amount for your Order before tax: $ ${this.pizzaRt}`)
                break;
        }
        return aReturn;
    }

}