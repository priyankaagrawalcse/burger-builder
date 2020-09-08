import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import BurgerConstant from '../../../containers/BurgerConstants'

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>{ BurgerConstant.CHECKOUT_PARA }</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType={BurgerConstant.BUTTON_TYPE_DANGER} clicked={props.cancelHandler}>
                { BurgerConstant.BUTTON_CANCEL }
            </Button>
            <Button btnType={BurgerConstant.BUTTON_TYPE_SUCCESS} clicked={props.continueHandler}>
                { BurgerConstant.BUTTON_CONTINUE }
            </Button>
        </div>
    )
}
export default checkoutSummary;