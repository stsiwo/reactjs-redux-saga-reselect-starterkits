//import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//import { NormalizedCategoryType } from "domain/category";
//import { merge } from "lodash";
//
///**
// * domain.categorys state Slice
// **/
//// action type             
//export type CategoryDataUpdateActionType = PayloadAction<NormalizedCategoryType> 
//
//export const categoryDataSlice = createSlice({ 
//  name: "domain/categorys", // a name used in action type
//  initialState: {},        
//  reducers: {              
//    /**
//     *
//     *  a property name gonna be the name of action
//     *  its value is the reduce
//     *
//     *  If you need to define the param of the action, use PayloadAction<X> to define its type.
//     *  In this use case, I need to an string param, so I define 'payloadAction<string' like below
//     *
//     **/
//    merge: (state: NormalizedCategoryType, action: CategoryDataUpdateActionType) => merge(state, action.payload),
//    clear: (state: NormalizedCategoryType) => ({}),
//  },
//  /**
//   * extraReducers property
//   *
//   * You can respond to other action types besides the types it has generated.                                                                                                                                                                                                                                
//   **/
//}) 
//
//export const categoryDataSliceReducer = categoryDataSlice.reducer
//export const categoryDataActions = categoryDataSlice.actions    
//
