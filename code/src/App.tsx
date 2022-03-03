import React, { useEffect} from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, SignIn, Register, Detail, Search, ShoppingCart, PlaceOrder } from './pages'
import { useNavigate } from 'react-router-dom';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

const RequireAuth = ({children}) => {
  const data = useSelector(state=>state.user.data)
  console.log('RequireAuth',data);
  const navigate = useNavigate();
  const isAuthenticated = data!==null
  return isAuthenticated===true ? children : navigate('/signIn')
}

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state=>state.user.data)
  
  useEffect(()=>{
    if(data){
      dispatch(getShoppingCart(data))
    }
  }, [data])
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signIn' element={<SignIn/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/detail/:id' element={<Detail/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/search/:keywords' element={<Search/>}></Route>
          <Route path='/shoppingCart' element={<RequireAuth><ShoppingCart/></RequireAuth>}></Route>
          <Route path='/placeOrder' element={<RequireAuth><PlaceOrder/></RequireAuth>}></Route>
          <Route path='*' element={<h1>404 not found 页面去火星了!</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
