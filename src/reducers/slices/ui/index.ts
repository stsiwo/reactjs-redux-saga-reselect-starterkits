import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
/**
 * if use 'createSlice', you CAN mutate its state directly safely. this is because 
 * the reducers are passed to 'createReducer' (builtin function by redux/toolkit). it create a new object using the state.
 **/

/**
 *
 * an action to reset cache with no after effect (e.g., requestTracker, domains)
 *
 **/
export const toggleLeftNavMenuActionCreator = createAction("rs/ui/leftNavMenu/toggle")
export const toggleLeftNavMenuActionTypeName = toggleLeftNavMenuActionCreator().type


/**
 * ui.leftNavMenu state Slice
 **/
export const leftNavMenuSlice = createSlice({ 
  name: "ui/leftNavMenu", // a name used in action type
  initialState: false, 
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
    open: (state: boolean) => true,
    close: (state: boolean) => false,
    toggle: (state: boolean) => !state,
  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
}) 

export const leftNavMenuSliceReducer = leftNavMenuSlice.reducer
export const leftNavMenuActions = leftNavMenuSlice.actions


/**
 * ui.rightNavMenu state Slice
 **/
export const rightNavMenuSlice = createSlice({ 
  name: "ui/rightNavMenu", // a name used in action type
  initialState: false, 
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
    open: (state: boolean) => true,
    close: (state: boolean) => false,
    toggle: (state: boolean) => !state,
  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
}) 

export const rightNavMenuSliceReducer = rightNavMenuSlice.reducer
export const rightNavMenuActions = rightNavMenuSlice.actions


/**
 * ui.searchModal state Slice
 **/
export const searchModalSlice = createSlice({ 
  name: "ui/searchModal", // a name used in action type
  initialState: false, 
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
    open: (state: boolean) => true,
    close: (state: boolean) => false,
    toggle: (state: boolean) => !state,
  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
}) 

export const searchModalSliceReducer = searchModalSlice.reducer
export const searchModalActions = searchModalSlice.actions
