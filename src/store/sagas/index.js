import  { takeEvery, all, takeLatest }  from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { 
    logoutSaga, 
    checkAuthTimedOutSaga, 
    authUserSaga, 
    authCheckStateSaga 
} from './auth'
import {initIngredientsSaga} from './burgerBuilder'
import { 
    purchaseBurgerSaga, 
    fetchOrderInitSaga,
    deleteOrderSaga 
} from './order'

export function* watchAuth () {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimedOutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT , logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder () {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder () {
    yield takeLatest(actionTypes.PURCHASE_BURGER_ORDER, purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDER_INIT_START, fetchOrderInitSaga)
    yield takeEvery(actionTypes.DELETE_ORDER_INITIATED, deleteOrderSaga)
}
