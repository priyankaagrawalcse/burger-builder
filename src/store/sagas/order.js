import {put} from 'redux-saga/effects'
import axios from '../../axios'
import * as actions from '../actions/index'

export function* purchaseBurgerSaga (action) {
    yield put(actions.purchaseBurgerStart());
    try{
        const response = yield axios.post('/orders.json?auth=' +action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name,action.orderData))
    }catch(error){
        yield put(actions.purchaseBurgerFailed(error))
    }
}

export function* fetchOrderInitSaga (action) {
    yield put(actions.fetchOrderStart())
    const queryParam = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
    try{
        const response = yield axios.get('/orders.json'+queryParam)
        const fetchedOrders = []
        for(let key in response.data){
            fetchedOrders.push({...response.data[key], id:key})
        }
        yield put(actions.fetchOrderSuccess(fetchedOrders))
    }catch(error){
        yield put(actions.fetchOrderFailed(error))
    }
}

export function* deleteOrderSaga (action) {
    yield put(actions.deleteOrderStart())
    const queryParam = '?auth=' + action.token
    try{
        const response = axios.delete(`/orders/${action.orderId}.json`+queryParam)
        yield put(actions.deleteOrderSuccess(response,action.orderId))
    }catch(error){
        yield put(actions.deleteOrderFailed(error))
    }
}