import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store' 
import { mockupData } from '../../pages/Home/mockups'

export const FETCH_RECOMMEND_PRODUCTS_START = "Fetch_Recommend_Products_Start"
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "Fetch_Recommend_Products_Success"
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "Fetch_Recommend_Products_Fail"

interface FetchRecommendProductStartAction{
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction{
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  data: any
}

interface FetchRecommendProductFailAction{
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
  data: any
}

export type RecommendProductsAction = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction

export const fetchRecommendProductStartAction = ():FetchRecommendProductStartAction=>{
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START
  }
}

export const fetchRecommendProductSuccessAction = (data):FetchRecommendProductSuccessAction=>{
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    data: data
  }
}

export const fetchRecommendProductFailAction = (data):FetchRecommendProductFailAction=>{
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    data: data
  }
}

export const giveMeDataAction = (): ThunkAction<void,RootState,unknown,RecommendProductsAction>=>(dispatch, getState)=>{
  dispatch(fetchRecommendProductStartAction())
  try {
    dispatch(fetchRecommendProductSuccessAction(mockupData))
  } catch (error) {
    dispatch(fetchRecommendProductFailAction(error))
  }
}