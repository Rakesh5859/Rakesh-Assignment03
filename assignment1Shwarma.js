const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Richard's Shawarma.");
                aReturn.push("What would you like to order?");
                aReturn.push("1. scrambled eggs");
                aReturn.push("2. Shawarma");
                aReturn.push("3. Burger");
                break;
            case OrderState.ITEM:
                this.stateCur = OrderState.SIZE;
                sInput = sInput.toLowerCase();
                switch(sInput){
                    case '1':
                    case 'pizza':
                        this.sItem = 'scrambled eggs';
                        this.sPrice = 65;
                        break;
                    case '2':
                    case 'shawarma':
                        this.sItem = 'Shawarma';
                        this.sPrice = 10;
                        break;
                    case '3':
                    case 'sandwich':
                        this.sItem = 'Burger';
                        this.sPrice = 10;
                        break;
                }
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                this.sPrice = this.sPrice * ((sInput.toLowerCase() == 'large') ? 3 :
                                ((sInput.toLowerCase() == 'medium') ? 2 : 1));
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks or Desserts with that?");
                aReturn.push("1. Coke ");
                aReturn.push("2. 7Up");
                aReturn.push("3. Desserts");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    switch(sInput){
                        case '1':
                        case sInput.toLowerCase() == 'Coke':
                            this.sOthers = 'Coke';
                            this.sPrice = this.sPrice + 2;
                            break;
                        case '2':
                        case sInput.toLowerCase() == '7Up':
                            this.sOthers = '7Up';
                            this.sPrice = this.sPrice + 4;
                            break;
                        case '3':
                        case sInput.toLowerCase() == 'Desserts':
                            this.sOthers = 'Desserts';
                            this.sPrice = this.sPrice + 8;
                            break;
                    }
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} size ${this.sItem} with ${this.sToppings}`);
                if(this.sOthers){
                    aReturn.push(`and ${this.sOthers}`);
                }

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your order will be ready by: ${d.toTimeString()}`);
                aReturn.push(`Total Order Price: $ ${this.sPrice}`);
                break;
        }

        return aReturn;
    }
}