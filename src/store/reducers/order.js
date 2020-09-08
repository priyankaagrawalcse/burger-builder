import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders : [],
    loading : false,
    purchased : false
}   

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_ORDER_INIT: return updateObject(state, {loading : false})
        case actionTypes.FETCH_ORDER_START: return updateObject(state, {loading : true})
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDER_FAILED: return updateObject(state, {loading : false})
        case actionTypes.PURCHASE_INIT : return updateObject(state, {purchased : false})
        case actionTypes.PURCHASE_BURGER_START : return updateObject(state, {loading : true})
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAILED : return updateObject(state, {loading : false})
        case actionTypes.DELETE_ORDER_START : return updateObject(state, {loading : true})
        case actionTypes.DELETE_ORDER_SUCCESS : return OrderdeletedSuccess(state, action)
        case actionTypes.DELETE_ORDER_FAILED : return updateObject(state, {loading : false})
        default : return state;
    }
}
const OrderdeletedSuccess = (state, action) => {
    const updatedOrder = state.orders.filter(order => {
        if(order.id !== action.orderId) return true
        else return false
    })
    return updateObject(state, {
        orders : updatedOrder,
        loading : false
    })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders : action.orders,
        loading : false
    })
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id : action.orderId})
    return updateObject(state, {
        orders : state.orders.concat(newOrder),
        loading : false,
        purchased : true
    })
}

export default reducer;