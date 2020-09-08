import * as actionTypes from './actionTypes'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error : error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER_ORDER ,
        orderData : orderData,
        token : token
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderInit = (token, userId) => {
    return {
        type : actionTypes.FETCH_ORDER_INIT_START ,
        token : token,
        userId : userId
    }
}
export const fetchOrderStart = () => {
    return{
        type : actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrderSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFailed= (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAILED,
        error : error
    }
}

export const deleteOrder = (token, orderId) => {
    return {
        type: actionTypes.DELETE_ORDER_INITIATED ,
        token : token,
        orderId : orderId
    }
}

export const deleteOrderStart = () => {
    return{
        type: actionTypes.DELETE_ORDER_START
    }
}

export const deleteOrderSuccess = (responseName, orderId) => {
    return{
        type: actionTypes.DELETE_ORDER_SUCCESS,
        name : responseName,
        orderId : orderId
    }
}

export const deleteOrderFailed = (error) => {
    return{
        type: actionTypes.DELETE_ORDER_FAILED,
        error : error
    }
}