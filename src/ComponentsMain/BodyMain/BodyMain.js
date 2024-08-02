import React, { useState, useEffect, useRef } from 'react';
import Baner from '../Baner/Baner';
import Sswiper from '../Swiper/Sswiper';
import BanerImage from '../BanerImage/BanerImage';
import SwiperCategory from '../SwiperCategory/SwiperCategory';
import SwiperProduct from '../SwiperProduct/SwiperProduct';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import filterCategorySlice from '../../redux/filterCategorySlice';

function BodyMain() {
  const [arrayCart, setArrayCart] = useState(null);
  const [cart, setCart] = useState(null);
  const allProduct = useSelector((state) => state.allProducts.allProduct);
  const swiperref = useRef();
  const dispatch = useDispatch();

  let prevCart = JSON.parse(localStorage.getItem('Shop'));

  useEffect(() => {
    if (cart !== null && (prevCart === undefined || prevCart === null)) {
      setArrayCart([cart]);
    }
    if (cart !== null && prevCart !== undefined && prevCart !== null) {
      prevCart = [...prevCart, cart];
      localStorage.setItem('Shop', JSON.stringify(prevCart));
    }
  }, [cart]);

  useEffect(() => {
    if (arrayCart !== null && cart !== null && (prevCart === undefined || prevCart === null)) {
      localStorage.setItem('Shop', JSON.stringify(arrayCart));
    }
  }, [arrayCart]);

  return (
    <>
      <div className=" flex items-center flex-col">
        <Sswiper />
        <div className=" w-full mx-4" ref={swiperref}>
          <SwiperCategory />
        </div>
        <div className=" w-[95%] md:w-[87%]">
          <div className="w-full flex flex-col md:flex-row justify-between items-center">
            <div className="w-[90%] sm:w-[70%] md:w-[32%] mb-2 cursor-pointer">
              <NavLink to={'./products'} onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(7))}>
                <img
                  src="https://ucarecdn.com/a0d22e14-2292-45c9-8a8c-b61bbc5d7538/-/preview/1000x454/"
                  alt="baner headphone"
                  className="rounded-2xl"
                />
              </NavLink>
            </div>

            <div className="w-[90%] sm:w-[70%] md:w-[32%] mb-2 cursor-pointer">
              <NavLink to={'./products'} onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(5))}>
                <img src="https://ucarecdn.com/1313fcef-808c-4416-96a8-7cd2c724d29b/-/preview/1000x458/" alt="baner mobile" className="rounded-2xl" />
              </NavLink>
            </div>

            <div className="w-[90%] sm:w-[70%] md:w-[32%] mb-2 cursor-pointer">
              <NavLink to={'./products'} onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(6))}>
                <img src="https://ucarecdn.com/d34e904a-9be0-4083-b53d-c3c50b974702/-/preview/1000x456/" alt="baner laptop" className="rounded-2xl" />
              </NavLink>
            </div>
          </div>

          <SwiperProduct allProduct={allProduct} addtocart={setCart} />

          <div className="flex justify-evenly w-full gap-12">
            <Link to={'../products/all'} onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(6))}>
              <img
                src={
                  window.innerWidth > 768
                    ? 'https://ucarecdn.com/981181c5-3714-4f14-a4f0-2abf535c96c0/-/preview/1000x370/'
                    : 'https://ucarecdn.com/5608890a-9367-4b2a-a104-b04a483d002a/-/preview/300x350/'
                }
                alt="gaming laptop"
                className="mt-6 w-full rounded-lg cursor-pointer"
              />
            </Link>

            <Link to={'../products/all'} onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(6))}>
              <img
                src={
                  window.innerWidth > 768
                    ? 'https://ucarecdn.com/6997d947-c66e-44a3-a5d7-0150fb4a158f/-/preview/1000x370/'
                    : 'https://ucarecdn.com/61f654d1-a882-404b-a291-2a9aad875557/-/preview/300x350/'
                }
                alt="gaming laptop"
                className="mt-6 w-full rounded-lg cursor-pointer"
              />
            </Link>
          </div>

          <BanerImage />

          <Baner
            titleH={'در یوسف شاپ گوش به زنگ شما هستیم!'}
            titleSpan={'شنبه تا پنجشنبه از ۱۰ صبح تا ۸ شب'}
            tel1={'09058972658'}
            tel2={'09223439560'}
          />
        </div>
      </div>
    </>
  );
}

export default BodyMain;
