import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { checkOut } from '../shoppingCart/slice'

interface OrderState {
  data: any[],
  loading: boolean,
  error: string | null
}

const initialState: OrderState = {
  data: [],
  loading: false,
  error: null
}

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  (order:any[])=>{
    console.log('placeOrderSlice', order);
    return order
  }
)

export const placeOrderSlice = createSlice({
  name:"order",
  initialState,
  reducers:{
  },
  extraReducers:{
    [placeOrder.pending.type]:(state)=>{
      state.loading=false
    },
    [placeOrder.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.data=action.data
      state.error=null
    },
    [placeOrder.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    },
    [checkOut.pending.type]:(state)=>{
      state.loading=false
    },
    [checkOut.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.data=action.data
      state.error=null
    },
    [checkOut.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    }
  }
})