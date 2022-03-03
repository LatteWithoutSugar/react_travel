import { RecommendProductsAction, FETCH_RECOMMEND_PRODUCTS_SUCCESS, FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_PRODUCTS_FAIL } from '../actions/recommendProducts'

interface RecommendProductsState {
  productList: any[],
  loading: boolean,
  error: string | null
}

const defaltState: RecommendProductsState= {
  loading: true,
  error: null,
  productList: []
}

export const recommendProductsReducer = (state=defaltState, action:RecommendProductsAction)=>{

  switch ( action.type ) {
    case FETCH_RECOMMEND_PRODUCTS_START: 
      return {...state, loading:true}
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return {...state, loading:false, productList: action.data}
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return {...state, loading:false, error:action.data}
    default: 
      return state
  }


}