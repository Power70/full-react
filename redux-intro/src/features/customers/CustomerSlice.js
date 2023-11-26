import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
}

const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID){
                return{
                    payload: {
                        fullName, 
                        nationalID,
                        createdAt: new Date().toISOString(),
                    },
                }
            },
            reducer(state, action){
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            }
        },
        updateName(state, action){
            state.fullName = action.payload;
        },
    },
});

export const {createCustomer, updateName} = CustomerSlice.actions;
export default CustomerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action){
//     switch(action.type){
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 createdAt: action.payload.createdAt,
//             };
//         case "customer/updateName":
//             return {
//                 ...state,
//                 fullName: action.payload,
//             };
//         default:
//             return state;
//     }
    
// }

// export function createCustomer(fullName, nationalID){
//     return {
//         type: "customer/createCustomer",
//         payload: {fullName, nationalID, 
//         createdAt: new Date().toISOString()},
//     };  
// }

// export function updateName(fullName){
//     return {
//         type: "account/updateName", 
//         payload: fullName,
//     };
// }