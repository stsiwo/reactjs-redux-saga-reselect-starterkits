import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { NormalizedAnimeType } from "domain/anime";
import { merge } from "lodash";
import { DomainStateSubType, DomainPaginationType } from "states/types";
import { clearAllSortAndFilterActionCreator } from "../app";


/**
 * redux-sage actions
 *
 *  - use this in index.tsx at watchers
 *
 **/
export const fetchAnimeActionCreator = createAction("rs/domain/anime/fetch")
export const fetchAnimeActionTypeName = fetchAnimeActionCreator().type

/**
 * domain.animes state Slice
 *
 * * 'createReducer' usage:
 *  - Most importantly, you need to ensure that you either mutate the state argument or return a new state, but not both.
 *  - source: https://redux-toolkit.js.org/api/createReducer
 *
 * *
 *
 *
 **/
// action type             
export type updateAnimeActionType = PayloadAction<NormalizedAnimeType>

export const updateAnimeDataSlice = createSlice({
  name: "domain/animes/data", // a name used in action type
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
  },
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.                                  
   **/
})

export const updateAnimeDataSliceReducer = updateAnimeDataSlice.reducer
export const updateAnimeDataActions = updateAnimeDataSlice.actions

/**
 * update anime pagination state
 *
 **/
export type updateAnimePaginationDataActionType = PayloadAction<DomainPaginationType>

export const updateAnimePaginationDataSlice = createSlice({
  name: "domain/animes/pagination", // a name used in action type
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
    update: (state: DomainPaginationType, action: PayloadAction<DomainPaginationType>) => action.payload,
    clear: (state: DomainPaginationType) => ({
      limit: 10,
      offset: 0,
      total: 0,
    })
  },
  extraReducers: (builder) => {
    builder.addCase(
      clearAllSortAndFilterActionCreator,
      (state: DomainPaginationType) => ({
      limit: 10,
      offset: 0,
      total: 0,
    })
    )
  }
})

export const updateAnimePaginationDataSliceReducer = updateAnimePaginationDataSlice.reducer
export const updateAnimePaginationDataActions = updateAnimePaginationDataSlice.actions


/**
 * update anime curItems ('result' prop of normalizr) state
 *
 **/
export type updateAnimeCurItemsDataActionType = PayloadAction<string[]>

export const updateAnimeCurItemsDataSlice = createSlice({
  name: "domain/animes/curItems", // a name used in action type
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
    update: (state: string[], action: PayloadAction<string[]>) => action.payload
  },
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.                                  
   **/
})

export const updateAnimeCurItemsDataSliceReducer = updateAnimeCurItemsDataSlice.reducer
export const updateAnimeCurItemsDataActions = updateAnimeCurItemsDataSlice.actions

