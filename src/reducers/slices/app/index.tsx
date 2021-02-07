import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * app.searchKeyword state Slice
 **/
export type searchKeywordUpdateActionType = PayloadAction<string>

export const searchKeywordSlice = createSlice({ 
  name: "app/searchKeyword", // a name used in action type
  initialState: "", 
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
    update: (state: string, action: searchKeywordUpdateActionType) => action.payload,
    clear: (state: string) => "",

  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
}) 

export const searchKeywordSliceReducer = searchKeywordSlice.reducer
export const searchKeywordActions = searchKeywordSlice.actions

