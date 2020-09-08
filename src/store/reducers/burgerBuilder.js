import * as actionTypes from '../actions/actionTypes'
import constant from '../../containers/BurgerConstants'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients : null,
    totalPrice : constant.BASE_PRICE,
    error : false,
    building : false
}

const reducer = (state = initialState, action) => {
    
    switch (action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action)            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action)
        case actionTypes.SET_INGREDIENT: return setIngredients(state, action)
        case actionTypes.SET_ERROR: return error(state, action)
        default: 
            return state;
    }
}

const addIngredients = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + constant.INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedState)
}

const removeIngredients = (state, action) => {
    const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients,updatedIng)
    const updatState = {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - constant.INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state, updatState)
}

const setIngredients = (state, action) => {
    //to keep ingredients inorder, it is shattered
    return updateObject(state, {
        ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat
        },
        totalPrice : constant.BASE_PRICE,
        error : false,
        building : false
    })
}

const error = (state, action) => {
    return updateObject(state, {error:true})
}

export default reducer