import { Component } from "react";

class BurgerConstants extends Component{

    static BREAD_TOP = 'bread-top';
    static BREAD_BOTTOM = 'bread-bottom';
    static MEAT = 'meat';
    static CHEESE = 'cheese';
    static SALAD = 'salad';
    static BACON = 'bacon';
    static ADDSOME = 'Please Add Some Ingredients';

    static CONTROLS = [
        {LABEL: 'Salad', TYPE: this.SALAD },
        {LABEL: 'Bacon', TYPE: this.BACON },
        {LABEL: 'Cheese', TYPE: this.CHEESE },
        {LABEL: 'Meat', TYPE: this.MEAT }
    ]

    static INGREDIENT_PRICES = {
        salad : 0.5,
        cheese : 0.4,
        meat : 1.3,
        bacon : 0.7
    }

    static BASE_PRICE = 4
    static MORE_INGREDIENT_COUNT = 5;
    static ORDER_HEADING = "Your Order";
    static ORDER_PARA = "A delicious burger with the following ingredients:"
    static ORDER_CHCKOUT = "Continue to checkout ?"

    static BUTTON_TYPE_DANGER = 'Danger';
    static BUTTON_TYPE_SUCCESS = 'Success';
    static BUTTON_CANCEL = 'CANCEL';
    static BUTTON_CONTINUE = 'CONTINUE';

    static CHECKOUT_PARA = "We hope it tastes well!!";
}

export default BurgerConstants;