import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { shoppingCart } from '../../pages/ShoppingCart/mockups'

interface ShoppingCartState {
  items: any[],
  loading: boolean,
  error: string | null
}

const initialState: ShoppingCartState = {
  items: [],
  loading: true,
  error: null
}

//shoppingCart的数据获取
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  (email: string | undefined)=>{
    const data = shoppingCart.filter((p)=>{ return p.email === email});
    return data[0].productList
  }
)

//shoppingCart的数据获取
export const checkOut = createAsyncThunk(
  "shoppingCart/checkOut",
  (email: string|undefined)=>{
    const data = shoppingCart.filter((p)=>{ return p.email === email});
    return data[0].productList
  }
)

export const shoppingCartSlice = createSlice({
  name:"shoppingCart",
  initialState,
  reducers:{
  },
  extraReducers:{
    [getShoppingCart.pending.type]:(state)=>{
      state.loading=true
    },
    [getShoppingCart.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.items=action.payload
      state.error=null
    },
    [getShoppingCart.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    },
    [checkOut.pending.type]:(state)=>{
      state.loading=true
    },
    [checkOut.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.items=action.payload
      state.error=null
    },
    [checkOut.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    }
  }
})