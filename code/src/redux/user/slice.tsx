import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { users } from '../../pages/SignIn/mockups'

interface UserState {
  data: string | null,
  loading: boolean,
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
}

export const signIn = createAsyncThunk(
  "user/signIn",
  (paramaters:{
    email: string,
    password: string
  })=>{
    const newData = users.filter((p)=>{
      return p.email === paramaters.email &&  p.password === paramaters.password
    })
    return newData[0].email
  }
)

export const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    logOut:(state)=>{
      state.data=null
      state.error=null
      state.loading=false
    }
  },
  extraReducers:{
    [signIn.pending.type]:(state)=>{
      state.loading=true
    },
    [signIn.fulfilled.type]:(state, action)=>{
      state.loading=false
      state.data=action.payload
      state.error=null
    },
    [signIn.rejected.type]:(state, action)=>{
      state.loading=false
      state.error=action.payload
    }
  }
})