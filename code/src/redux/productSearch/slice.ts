import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { productList } from '../../pages/Detail/mockups'

interface ProductSearchState {
  data: any,
  loading: boolean,
  error: string | null
}

const initialState: ProductSearchState = {
  data: null,
  loading: true,
  error: null
}

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  originalPrice: string;
  points: number;
  discount: number;
  coupons: number;
  rating: number;
  touristRoutePictures: {
      url: string;
  }[];
}

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  (keywords: string|undefined)=>{
    const l = productList.length
      let newList: Product[] = []
      for (let i=0; i<l; i++){
        if( typeof(keywords)==='string'){
          if(productList[i].title.indexOf(keywords)>=0){
            newList.push(productList[i])
          }
        }else{
          return productList
        }
      }
      return newList
  }
)

export const searchProductSlice = createSlice({
  name:"productSearch",
  initialState,
  reducers:{
  },
  extraReducers:{
    [searchProduct.pending.type]:(state)=>{
      state.loading=true
    },
    [searchProduct.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.data=action.payload
      state.error=null
    },
    [searchProduct.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    }
  }
})