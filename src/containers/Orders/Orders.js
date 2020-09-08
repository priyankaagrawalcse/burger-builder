import React, {Component} from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios'
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    deleteOrder = () => {
        this.props.onDeleteOrder(this.props.token, this.props.userId)
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            if(this.props.orders.length !== 0){
                orders = this.props.orders.map(order=>{
                    return <Order ingredients={order.ingredients} 
                                    key={order.id} 
                                    price={order.price}
                                    clickToRemove={() => this.props.onDeleteOrder(this.props.token, order.id)}/>
                })
            }else{
                orders = <p style={{color : 'red'}}><strong>You have not ordered anything yet !!!</strong></p>
            }
            
        }
        return(
            <div>
                { orders }
            </div>
        );
    }
}

const mapsStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapsDispatchToProps = dispatch => {
    return{
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrderInit(token, userId)),
        onDeleteOrder : (token, orderId) => dispatch(actions.deleteOrder(token, orderId))
    }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(withErrorHandler(Orders, axios))