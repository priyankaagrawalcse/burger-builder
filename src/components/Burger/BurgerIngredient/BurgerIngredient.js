import React, {Component} from "react";
import PropTypes from 'prop-types'

import classes from './BurgerIngredient.css';
import BurgerConstants from '../../../containers/BurgerConstants'


class BurgerIngredient extends Component{

    render(){
        let ingredient = null;

        switch(this.props.type){
            case(BurgerConstants.BREAD_BOTTOM):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case(BurgerConstants.BREAD_TOP):
                ingredient = (
                                <div className={classes.BreadTop}>
                                    <div className={classes.Seeds1}></div>
                                    <div className={classes.Seeds2}></div>
                                </div>
                            );
                break;
            case(BurgerConstants.MEAT):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case(BurgerConstants.CHEESE):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case(BurgerConstants.SALAD):
                ingredient = <div className={classes.Salad}></div>;
                break;
            case(BurgerConstants.BACON):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type : PropTypes.string.isRequired  
};

export default BurgerIngredient;