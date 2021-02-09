import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { CategoryType } from "domain/category";

/**
 * redux-sage actions
 *
 *  - use this in index.tsx at watchers
 *
 **/
export const fetchCategoryActionCreator = createAction("rs/domain/category/fetch")
export const fetchCategoryActionTypeName = fetchCategoryActionCreator().type

/**
 * domain.categorys state Slice
 *
 * * this domain does not use 'normalizr', just keep it as array
 **/
// action type             
export type CategoryDataUpdateActionType = PayloadAction<CategoryType[]> 

export const categoryDataSlice = createSlice({ 
  name: "domain/categories", // a name used in action type
  initialState: {},        
  reducers: {              
    /**
     *
     *  a property name gonna be the name of action
     *  its value is the reduce
     *
     *  If you need to define the param of the action, use PayloadAction<X> to define its type.
     *  In this use case, I need to an string param, so I define 'payloadAction<string' like below
     *
     **/
    merge: (state: CategoryType[], action: CategoryDataUpdateActionType) => merge(state, action.payload),
    update: (state: CategoryType[], action: CategoryDataUpdateActionType) => action.payload,
    clear: (state: CategoryType[]) => [],
  },
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.                                                                                                                                                                                                                                
   **/
}) 

export const categoryDataSliceReducer = categoryDataSlice.reducer
export const categoryDataActions = categoryDataSlice.actions    

