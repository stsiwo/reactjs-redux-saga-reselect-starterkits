import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatusEnum, SortType } from "src/app";
import { CategoryType } from "domain/category";

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

/**
 * app.fetchStatus state Slice
 **/
export type fetchStatusUpdateActionType = PayloadAction<FetchStatusEnum>

export const fetchStatusSlice = createSlice({
  name: "app/fetchStatus", // a name used in action type
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
    update: (state: FetchStatusEnum, action: fetchStatusUpdateActionType) => action.payload,
    clear: () => FetchStatusEnum.INITIAL,

  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
})

export const fetchStatusSliceReducer = fetchStatusSlice.reducer
export const fetchStatusActions = fetchStatusSlice.actions

/**
 * app.categoryFetchStatus state Slice
 **/
export type categoryFetchStatusUpdateActionType = PayloadAction<FetchStatusEnum>

export const categoryFetchStatusSlice = createSlice({
  name: "app/categoryFetchStatus", // a name used in action type
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
    update: (state: FetchStatusEnum, action: categoryFetchStatusUpdateActionType) => action.payload,
    clear: () => FetchStatusEnum.INITIAL,

  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
})

export const categoryFetchStatusSliceReducer = categoryFetchStatusSlice.reducer
export const categoryFetchStatusActions = categoryFetchStatusSlice.actions

/**
 * app.curCategory state Slice
 **/
export type curCategoryUpdateActionType = PayloadAction<CategoryType>

export const curCategorySlice = createSlice({
  name: "app/curCategory", // a name used in action type
  initialState: null,
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
    update: (state: CategoryType, action: curCategoryUpdateActionType) => action.payload,
    clear: (state: CategoryType) => null
  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
})

export const curCategorySliceReducer = curCategorySlice.reducer
export const curCategoryActions = curCategorySlice.actions

/**
 * app.curSort state Slice
 **/
export type curSortUpdateActionType = PayloadAction<SortType>

export const curSortSlice = createSlice({
  name: "app/curSort", // a name used in action type
  initialState: null,
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
    update: (state: SortType, action: curSortUpdateActionType) => action.payload,
    clear: (state: SortType) => null 
  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
})

export const curSortSliceReducer = curSortSlice.reducer
export const curSortActions = curSortSlice.actions

/**
 * app.sortList state Slice
 **/
export type sortListUpdateActionType = PayloadAction<SortType[]>

export const sortListSlice = createSlice({
  name: "app/sortList", // a name used in action type
  initialState: [
    {
      key: "createdAt", // asc
      label: "Recent"
    },
    {
      key: "-createdAt", // desc
      label: "Old"
    },
    {
      key: "titles", // desc
      label: "Title Asc"
    },
    {
      key: "-titles", // desc
      label: "Title Desc"
    },
    {
      key: "averageRating", // desc
      label: "Higher Rating"
    },
    {
      key: "-averageRating", // desc
      label: "Lower Rating"
    },
  ],
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
    update: (state: SortType[], action: sortListUpdateActionType) => action.payload,
    clear: (state: SortType[]) => []
  }
  /**
   * extraReducers property
   *
   * You can respond to other action types besides the types it has generated.
   **/
})

export const sortListSliceReducer = sortListSlice.reducer
export const sortListActions = sortListSlice.actions
