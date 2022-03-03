import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { productList } from '../../pages/Detail/mockups'

interface ProductDetailState {
  data: any,
  loading: boolean,
  error: string | null
}

const initialState: ProductDetailState = {
  data: null,
  loading: false,
  error: null
}

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  (id: string | undefined)=>{
    const data = productList.filter((p)=>{ return String(p.id) === id});
    return data[0]
  }
)

export const productDetailSlice = createSlice({
  name:"productDetai",
  initialState,
  reducers:{
  },
  extraReducers:{
    [getProductDetail.pending.type]:(state)=>{
      state.loading=false
    },
    [getProductDetail.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.data=action.payload
      state.error=null
    },
    [getProductDetail.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    }
  }
})