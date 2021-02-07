//import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//import { NormalizedBlogType } from "domain/blog";
//import { merge } from "lodash";
//
///**
// * domain.blogs state Slice
// **/
//// action type             
//export type BlogDataUpdateActionType = PayloadAction<NormalizedBlogType> 
//
//export const blogDataSlice = createSlice({ 
//  name: "domain/blogs", // a name used in action type
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
//    merge: (state: NormalizedBlogType, action: BlogDataUpdateActionType) => merge(state, action.payload),
//    clear: (state: NormalizedBlogType) => ({}),
//  },
//  /**
//   * extraReducers property
//   *
//   * You can respond to other action types besides the types it has generated.                                  
//   **/
//}) 
//
//export const blogDataSliceReducer = blogDataSlice.reducer
//export const blogDataActions = blogDataSlice.actions
