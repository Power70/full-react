import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cart: [],

    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: "mediterranean",
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action){
            // payload = newItem
            state.cart.push(action.payload)
        },
        deleteItem(state, action){
            // payload = pizzaId
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action){
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action){
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice

            // A trick that can help call/reuse one of the acion creator
            if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
         
        },
        clearCart(state){
            state.cart = [];
        },
    },
});

export const {
    addItem, 
    deleteItem, 
    increaseItemQuantity, 
    decreaseItemQuantity, 
    clearCart} = cartSlice.actions;

export default cartSlice.reducer;

export const getUserName = (state) => state.user.username;

export const getCart = (state) => state.cart.cart;

export const getTotalCardQuantity = ((state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0));

export const getTotalCardPrice = ((state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0));

 // allow delete button to show only if the item is card
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;