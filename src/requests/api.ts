//import axios, { AxiosInstance, CancelTokenStatic, AxiosError, AxiosResponse } from 'axios'
//import { apiConfig } from 'configs/apiConfig';
//import { ErrorResponseDataType, RequestMethodEnum, Error401ResponseDataTypeEnum } from './types';
//import { getCookie } from 'src/utils';
//
//
//declare type AxiosInstanceWithCancelToken = AxiosInstance & {
//  CancelToken?: CancelTokenStatic
//  isCancel?: (value: any) => boolean
//}
//
//
//const instance: AxiosInstanceWithCancelToken = axios.create(apiConfig)
//instance.CancelToken = axios.CancelToken
//instance.isCancel = axios.isCancel
//
//// for the sake of 'withCredentials' (github issues saied that instance axios with 'withCredentials' does not work)
//// but this might not be true. so make sure if it works with instance 
//// for now, change instance to global axios
//axios.defaults.baseURL = apiConfig.baseURL
//axios.defaults.timeout = apiConfig.timeout
//axios.defaults.transformResponse = apiConfig.transformResponse
//axios.defaults.withCredentials = apiConfig.withCredentials
//
//
//// replce x-csrf-token with refresh one when endpoint is /token/refresh
//axios.interceptors.request.use((config) => {
//
//  // set csrf token if there is access token
//  const csrfAccessToken = getCookie('csrf_access_token')
//  if (csrfAccessToken) {
//    console.log('set csrf access token to header')
//    config.headers['X-CSRF-TOKEN'] = csrfAccessToken
//  }
//
//
//  if (config.url == '/token/refresh' && config.method == RequestMethodEnum.POST) {
//    config.headers['X-CSRF-TOKEN'] = getCookie('csrf_refresh_token')
//  }
//
//  return config
//
//}, null)
//
//console.log('axios defaults')
//console.log(axios.defaults)
//
//export const api = axios
//
//// base static cancel token class
//// you can get token factory object by calling source() 
//// source factory should be new object for each request. sharing the same source factory causes cancel all request shared by the source factory and prevent restart the reqeust again
//// then you can generate token by source.token
////  - the token must be provided to request as argument of 'cancelToken' when request
//// then you can cancel the request by source.cancel('msg')
