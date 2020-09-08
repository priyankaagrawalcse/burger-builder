import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Checkout extends Component{

    checkoutCancelHandler = () => {
       this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }

    render(){
        let chckout = <Redirect to='/' />
        if(this.props.ing){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            chckout = (<div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ing}
                                    cancelHandler={this.checkoutCancelHandler} 
                                    continueHandler={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data'} component={ContactData} />)
            </div>)
        }
        return chckout;
    }

}

const mapStateToProps = state =>{
    return{
        ing : state.burgerBuilder.ingredients,
        tPrice : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout)