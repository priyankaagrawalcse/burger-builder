import * as actionTypes from './actionTypes'

export const addIngredient = (ingName) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : ingName
    };
};

export const removeIngredient = (ingName) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName
    };
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
}

export const setError = () => {
    return {
        type : actionTypes.SET_ERROR
    }
}

export const initIngredients = () => {
    return {
        type : actionTypes.INIT_INGREDIENTS
    }
}