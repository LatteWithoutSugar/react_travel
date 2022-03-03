import { languageReducer } from './reducers/language'
import { recommendProductsReducer } from './reducers/recommendProducts'
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { searchProductSlice } from './productSearch/slice'
import { userSlice } from './user/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { placeOrderSlice } from './order/slice'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: searchProductSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  placeOrder: placeOrderSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware=>[...getDefaultMiddleware(), actionLog]),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store