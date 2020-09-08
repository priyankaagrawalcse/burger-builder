import React from 'react'
import classes from './Order.css'
import Button from '../UI/Button/Button'
import BurgerConstant from '../../containers/BurgerConstants'

const order = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
                                .map(igKey=>{
                                return (
                                    <span key={igKey} style={{
                                        transform: 'capitalize',
                                        display : 'inline-block',
                                        margin: '0 8px',
                                        border: '1px solid #ccc',
                                        padding: '5px'
                                    }}>
                                        {igKey +" : ("+ props.ingredients[igKey]+")"}
                                    </span>
                                )}) 
   return (<div className={classes.Order}>
       <p style={{color:'blue'}}><strong>Your order is successfull !!!</strong></p>
        <p><strong>Ingredients : </strong></p>
        {ingredientSummary}
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        <Button btnType={BurgerConstant.BUTTON_TYPE_DANGER} clicked={props.clickToRemove}>
                Delete
            </Button>
    </div>)
}
export default order