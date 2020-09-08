import React, { Component } from "react";
import {connect} from 'react-redux'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import BurgerConstants from '../BurgerConstants'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import axios from '../../axios'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component{
    state = {
        purchasing : false,
    }

    componentDidMount(){
        this.props.OnInitIngredients()
    }

    purchaseContinueHandler = () => {
        this.props.OnInitPurchase();
        this.props.history.push('/checkout');
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing : true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    //we can use this syntax for a method as we are not refering to this object here
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }


    render(){
        const lessDisabledInfo ={...this.props.ingredients};
        for(let type in lessDisabledInfo){
            lessDisabledInfo[type] = lessDisabledInfo[type] <= 0;
        }
        const moreDisabledInfo = {...this.props.ingredients};
        for(let type in moreDisabledInfo){
            moreDisabledInfo[type] = moreDisabledInfo[type] >= BurgerConstants.MORE_INGREDIENT_COUNT;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p style={{color: 'red', textAlign: 'center', fontWeight: 'bolder'}}>
                                                Due to some error, Ingredients cannot be loaded
                                                <br/>
                                                Please try after sometime.
                                        </p> 
                                    : <Spinner />
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientAdded={this.props.OnIngredientAdded}
                        ingredientRemoved={this.props.OnIngredientRemoved} 
                        isLessDisabled={lessDisabledInfo}
                        isMoreDisabled={moreDisabledInfo} 
                        price={this.props.tPrice}
                        orderAble={this.state.orderAble}
                        isAuth = {this.props.isAuthenticated}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ingredients} 
                                price={this.props.tPrice}
                                canceled={this.purchaseCancelHandler}
                                continue={this.purchaseContinueHandler} />
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ingredients : state.burgerBuilder.ingredients,
        tPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDisapatchToProps = dispatch => {
    return{
        OnIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        OnIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        OnInitIngredients : () => dispatch(actions.initIngredients()),
        OnInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDisapatchToProps)(ErrorHandler(BurgerBuilder, axios));