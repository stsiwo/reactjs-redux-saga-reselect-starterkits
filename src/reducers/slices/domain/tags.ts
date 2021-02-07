//import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//import { NormalizedTagType } from "domain/tag";
//import { merge } from "lodash";
//
///**
// * domain.tags state Slice
// **/
//// action type             
//export type TagDataUpdateActionType = PayloadAction<NormalizedTagType> 
//
//export const tagDataSlice = createSlice({ 
//  name: "domain/tags", // a name used in action type
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
//    merge: (state: NormalizedTagType, action: TagDataUpdateActionType) => merge(state, action.payload),
//    clear: (state: NormalizedTagType) => ({}),
//  },
//  /**
//   * extraReducers property
//   *
//   * You can respond to other action types besides the types it has generated.                                                                                                                                                                                                                                
//   **/
//}) 
//
//export const tagDataSliceReducer = tagDataSlice.reducer
//export const tagDataActions = tagDataSlice.actions    
//
