import React from 'react'
import { withRouter } from 'react-router-dom'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import BurgerConstants from '../../containers/BurgerConstants'

const burger = (props) => {
   let dynamicIngredients = Object.keys(props.ingredients)
            .map(igName=>{
                return [...Array(props.ingredients[igName])]
                .map((_,i)=>
                    <BurgerIngredient key={igName+i} type={igName} />
                )
            })
            .reduce((arr, el)=>{
                return arr.concat(el)
            }, [])
    if(dynamicIngredients.length === 0){
        dynamicIngredients = <p>{BurgerConstants.ADDSOME}</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type={BurgerConstants.BREAD_TOP} />
            {dynamicIngredients}
            <BurgerIngredient type={BurgerConstants.BREAD_BOTTOM} />
        </div>
    )
}
export default withRouter(burger);