const Order = require("./orderClass");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcome"),
    SIZE: Symbol("size"),
    BREAD:   Symbol("bread"),
    TOPPINGS:   Symbol("toppings"),
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
        this.sandwichRt = 9.99;
        this.burgerRt = 8.59;
        this.pizzaRt = 12.99;
    }

    handleSandwich(sInput){
        let aReturn = [];
        switch(this.stateCur){  
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE
                aReturn.push("What size of Sandwich would you like to order? 6-inch or 12-inch");
                break;            
            case OrderState.SIZE:
                this.stateCur = OrderState.BREAD
                this.sSize = sInput;
                aReturn.push("What type of bread would you like? Italian or Italian Herbs and cheese or Flatbread?");
                break;
            case OrderState.BREAD:
                this.stateCur = OrderState.TOPPINGS
                this.sBread = sInput;
                aReturn.push("What toppings would you like?");
                break; 
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.COMBO
                this.sToppings = sInput;
                aReturn.push("Would you like to make it a combo for extra $4.50?(yes/no) Combo comes with one drink and two Chocolate cookies!");
                break;
            case OrderState.COMBO:
                this.upgradeSandwich(sInput);
                this.isDone(true);
                this.sCombo = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} sandwich with ${this.sToppings}`);
                aReturn.push(`Your respond to combo option is:${this.sCombo}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total amount for your Order is $: ${this.sandwichRt}`)
                break;  
        }
        return aReturn;
    }

    handleBurger(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE
                aReturn.push("What size of Burger would you like to order? 4-oz or 6-oz");
                break;                
            case OrderState.SIZE:
                this.stateCur = OrderState.BREAD
                this.sSize = sInput;
                aReturn.push("What type of bread would you like? Sesame bun or Gluten Free bun");
                break;
            case OrderState.BREAD:
                this.stateCur = OrderState.TOPPINGS
                this.sBread = sInput;
                aReturn.push("What toppings would you like?");
                break; 
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.COMBO
                this.sToppings = sInput;
                aReturn.push("Would you like to make it a combo for extra $4.50?(yes/no) Combo comes with one drink and Fries!");
                break;
            case OrderState.COMBO:
                this.upgradeBurger(sInput);
                this.isDone(true);
                this.sCombo = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} burger with ${this.sToppings}`);
                aReturn.push(`Your respond to combo option is:${this.sCombo}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total amount for your Order is $: ${this.burgerRt}`);
                break;  
        }
        return aReturn;
    }

    handlePizza(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("What size pizza would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.upgradePizza(sInput);
                this.isDone(true);
                this.sDrinks = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} pizza with ${this.sToppings}`);
                aReturn.push(`Your respond to combo option is:${this.sDrinks}`)
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total amount for your Order is $: ${this.pizzaRt}`)
                break;
        }
        return aReturn;
    }

    upgradeSandwich(input) {
        if(input.toLowerCase == "yes"){
            this.sandwichRt = this.sandwichRt + 4.50;
        }
    }

    upgradeBurger(input) {
        if(input.toLowerCase == "yes"){
            this.burgerRt = this.burgerRt + 4.50;
        }
    }

    upgradePizza(input) {
        if(input.toLowerCase == "yes"){
            this.pizzaRt = this.pizzaRt + 2.50;
        }
    }
}