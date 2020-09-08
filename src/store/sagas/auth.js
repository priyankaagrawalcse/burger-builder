import {put, delay, call} from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions/index'


export function* logoutSaga (action) {
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    yield call([localStorage, 'removeItem'], 'userId')
    //above call function from saga is same as the below syntax to call a function
    // yield localStorage.removeItem('token')
    // yield localStorage.removeItem('expirationDate')
    // yield localStorage.removeItem('userId')
    yield put( actions.logoutSucceed() )
}

export function* checkAuthTimedOutSaga (action) {
    yield delay(action.expiresIn * 1000)
    yield put( actions.logout() )
}

export function* authUserSaga (action) {
    yield put(actions.authStart())
    const authData = {
            email : action.email,
            password : action.password,
            returnSecureToken : true
        }
        //let accInfoUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=<my-firebase-api-key>'
        let signUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCxc_zMfWl81KTU6rGRck41TFreCbDJaqs' 
        if(!action.isSignUp){
            signUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCxc_zMfWl81KTU6rGRck41TFreCbDJaqs'
        }

        try{
            //yield will pause here and wait for promise to accept or reject
            const response = yield axios.post(signUrl, authData)
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
            yield localStorage.setItem('token', response.data.idToken)
            yield localStorage.setItem('expirationDate', expirationDate)
            yield localStorage.setItem('userId', response.data.localId)
            
            yield put(actions.authSuccess(response.data.idToken, response.data.localId))
            yield put (actions.checkAuthTimeOut(response.data.expiresIn))
        }catch (error) {
            yield put(actions.authFailed(error.response.data.error))
        }
}

export function* authCheckStateSaga (action) {
    const token = localStorage.getItem('token')
    if(!token){
        yield put(actions.logout())
    }else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if(expirationDate <  new Date()){
            yield put(actions.logout())
        }else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))    
            }

        }
    
}