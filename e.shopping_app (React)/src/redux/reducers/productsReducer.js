import { ActionTypes } from "../constants/action-types";

const intialState = {
    products: [],
};

export const productsReducer = ( state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: payload };
        default:
            return state;
    }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
    console.log(type);
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, ...payload };
        default:
            return state;
    }
};
