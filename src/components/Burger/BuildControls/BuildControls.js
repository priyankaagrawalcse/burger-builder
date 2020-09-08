import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import BurgerConstants from '../../../containers/BurgerConstants'

import classes from './BuildControls.css'

const buildControls = (props) =>{
    return( 
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {BurgerConstants.CONTROLS.map(value=>{
                return(
                    <BuildControl key={value.LABEL}
                                label={value.LABEL}
                                added={()=>props.ingredientAdded(value.TYPE)} 
                                remove={()=>props.ingredientRemoved(value.TYPE)} 
                                islessDisabled={props.isLessDisabled[value.TYPE]} 
                                ismoreDisabled={props.isMoreDisabled[value.TYPE]} />
                )
            })}
            <button className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered}>{props.isAuth ? "Order Now" : "SignUp to Order"}</button>
        </div>
   )
};
export default buildControls;