import React, { useEffect, useState } from 'react';
import Baner from '../Baner/Baner';
import Toman from '../../Toman/Toman';
import { FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import ThreeZero from '../../ThreeZero';
import { useDispatch } from 'react-redux';
import cartsProductSlice from '../../redux/cartsProductSlice';
import { useNavigate } from 'react-router-dom';

function ShopingCart() {
  const [cartProduct, setCartProduct] = useState();
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('Shop'));
    setCartProduct(cart);
  }, [rerender]);

  let getProduct = JSON.parse(localStorage.getItem('Shop'));

  return (
    <div className="flex justify-center">
      <div className=" w-[95%] lg:w-[70%] relative">
        <Baner
          titleH={`به سبد خرید خود خوش آمدید`}
          clas={'hidden'}
          clasTitle={'text-3x flex items-center justify-center'}
          src={'https://ucarecdn.com/dcd8805b-eab6-42bd-9c1e-5683b8fe149c/preview'}
        />
        <div className=" flex flex-col h-fit relative" id="scrollCard">
          {cartProduct !== undefined && cartProduct !== null && cartProduct.length != 0 ? (
            cartProduct?.map((element) => (
              <div
                key={element.id}
                className=" flex-col md:flex-row w-full border border-solid border-white-50 items-center p-6 mb-4 bg-white rounded-xl select-none flex justify-around">
                <div className=" flex flex-col md:flex-row items-center">
                  <img
                    src={element.img}
                    alt={element.title}
                    className="rounded-xl border-2 border-solid border-white-50 w-40 h-40 cursor-pointer"
                    onClick={() => navigate(`../product/${element.title}`)}
                  />
                  <div className="flex h-28 justify-around flex-col my-4 md:mr-4">
                    <h1 className=" text-2xl cursor-pointer" onClick={() => navigate(`../product/${element.title}`)}>
                      {element.title}
                    </h1>
                    <span className="w-full max-w-96 cursor-pointer" onClick={() => navigate(`../product/${element.title}`)}>
                      {element.productDesc.slice(0, 75)}...
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly h-full md:items-center w-full md:w-auto items-start">
                  <div className="flex justify-around w-full flex-col items-center">
                    <div className="flex flex-row mt-4">
                      <p>{element.popularity / 20} / 5</p>
                      <FaStar color="#bcbf0f" />
                    </div>
                    <div className=" w-32 h-2"></div>
                  </div>
                  <div className=" h-28 flex justify-around md:items-center w-full md:flex-col">
                    <div className="flex flex-row items-center w-32 justify-around md:w-full">
                      <p>{<ThreeZero Number={element.price * element.quantity} />}</p>
                      <Toman />
                    </div>
                    <div className=" flex flex-row items-center justify-around w-20">
                      <FaPlus
                        onClick={() => {
                          let quan = getProduct.find((product) => product.id === element.id);
                          quan.quantity = quan.quantity + 1;
                          localStorage.setItem('Shop', JSON.stringify(getProduct));
                          dispatch(cartsProductSlice.actions.addCartProduct(getProduct));
                          setRerender((prev) => !prev);
                        }}
                        className=" cursor-pointer text-orange-theme"
                      />
                      <p className=" text-xl">{element.quantity}</p>
                      {element.quantity == 1 ? (
                        <GoTrash
                          color="red"
                          onClick={() => {
                            let remove = getProduct.find((product) => product.id === element.id);
                            getProduct = getProduct.filter((array) => {
                              return array != remove;
                            });

                            localStorage.setItem('Shop', JSON.stringify(getProduct));
                            dispatch(cartsProductSlice.actions.addCartProduct(getProduct));
                            setRerender((prev) => !prev);
                          }}
                          className=" cursor-pointer"
                        />
                      ) : (
                        <FaMinus
                          onClick={() => {
                            let quan = getProduct.find((product) => product.id === element.id);
                            quan.quantity = quan.quantity - 1;
                            localStorage.setItem('Shop', JSON.stringify(getProduct));
                            dispatch(cartsProductSlice.actions.addCartProduct(getProduct));
                            setRerender((prev) => !prev);
                          }}
                          className=" text-orange-theme cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-96 bg-white rounded-xl shadow-custom flex flex-col items-center justify-center">
              <img src="https://ucarecdn.com/9e1e6011-27c8-481a-8c84-f60c49d321ff/preview" alt="shoping cart" className=" w-48 h-48" />
              <h2 className=" font-yekanBakhLight font-extrabold text-xl">سبد خرید شما خالی است!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopingCart;
