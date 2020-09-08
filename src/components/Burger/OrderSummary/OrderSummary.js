import React, {Component} from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import BurgerConstants from '../../../containers/BurgerConstants'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
    
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
                                .map(igKey=>{
                                return (
                                    <li key={igKey}>
                                        <span style={{transform: 'capitalize'}}>
                                            {igKey}
                                        </span>: 
                                        {this.props.ingredients[igKey]}
                                    </li>
                                )})
        return(
            <Aux>
                <h3>{BurgerConstants.ORDER_HEADING}</h3>
                <p>{BurgerConstants.ORDER_PARA}</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.price.toFixed(2)}$</strong></p>
                <p>{BurgerConstants.ORDER_CHCKOUT}</p>
                <Button btnType={BurgerConstants.BUTTON_TYPE_DANGER} 
                        clicked={this.props.canceled}>    
                    {BurgerConstants.BUTTON_CANCEL}
                </Button>
                <Button btnType={BurgerConstants.BUTTON_TYPE_SUCCESS}
                        clicked={this.props.continue}>
                    {BurgerConstants.BUTTON_CONTINUE}
                </Button>
            </Aux>
        )
    }
}

export default OrderSummary;