import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { NormalizedAnimeType } from "domain/anime";
import { merge } from "lodash";


/**
 * redux-sage actions
 *
 *  - use this in index.tsx at watchers
 *
 * test fetch anime api 
 *
 **/
export const fetchAnimeActionCreator = createAction("rs/domain/anime/fetch")
export const fetchAnimeActionTypeName = fetchAnimeActionCreator().type

/**
 * domain.animes state Slice
 **/
// action type             
export type updateAnimeActionType = PayloadAction<NormalizedAnimeType> 

export const updateAnimeDataSlice = createSlice({ 
  name: "domain/animes", // a name used in action type
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
    merge: (state: NormalizedAnimeType, action: PayloadAction<NormalizedAnimeType>) => merge(state, action.payload),
    clear: (state: NormalizedAnimeType) => ({}),
  },
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.                                  
   **/
}) 

export const updateAnimeDataSliceReducer = updateAnimeDataSlice.reducer
export const updateAnimeDataActions = updateAnimeDataSlice.actions

