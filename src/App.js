import React, { useState, useEffect, useRef } from 'react';
import { useRoutes } from 'react-router-dom';
import Routes from './Routes';
import { useLocation } from 'react-router-dom';
import Favicon from 'react-favicon';
import Footer from './ComponentsMain/Footer/Footer';
import useGetData from './ReactQuery/useGetData';
import allProductSlice from './redux/allProductSlice';
import { useDispatch } from 'react-redux';
import cartsProductSlice from './redux/cartsProductSlice';
import authSlice from './redux/authSlice';
function App() {
  const location = useLocation();
  const router = useRoutes(Routes);
  const dispatch = useDispatch();
  const [faviconUrl, setFaviconUrl] = useState('https://ucarecdn.com/24272dc0-165a-4043-9ee9-88f45c3e51bd/-/preview/513x487/');
  const divRef = useRef();
  const product = useGetData('products');

  let carts = JSON.parse(localStorage.getItem('Shop'));
  let profile = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (carts !== null && carts !== undefined) {
      dispatch(cartsProductSlice.actions.addCartProduct(carts));
    }
  }, []);

  useEffect(() => {
    if (profile !== null && profile !== undefined) {
      dispatch(authSlice.actions.addAuth(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (product.data) {
      dispatch(allProductSlice.actions.addProductInAll(product.data));
    }
  }, [product.data]);

  return (
    <div>
      <div ref={divRef} id="divUp"></div>
      <Favicon url={faviconUrl} />
      {router}
      {location.pathname.search('panel') == 1 || location.pathname.search('login') == 1 ? <></> : <Footer uref={divRef} />}
    </div>
  );
}

export default App;
