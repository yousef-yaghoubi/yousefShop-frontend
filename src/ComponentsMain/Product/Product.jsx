import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import ThreeZero from '../../ThreeZero';
import Toman from '../../Toman/Toman';
import { FaStar } from 'react-icons/fa6';
function Product({ product }) {
  return (
    <NavLink
      to={`/product/${product.title}`}
      key={product.id}
      className=" w-[90%]  xl:w-[24%] md:w-[45%] h-48 md:h-96 p-5 flex flex-row md:flex-col items-center rounded-md shadow-custom">
      <img src={product.img} className=" w-20 sm:w-32 md:w-44 md:h-44 rounded-lg" alt={`تصویر ${product.title}`} />
      <div className=" w-full relative h-full mr-4">
        <h3 className=" text-base lg:text-xl" style={{ position: 'absolute', bottom: '6em' }}>
          {product.title}
        </h3>
        <div className="flex w-full justify-between  absolute bottom-0 flex-col xxxs:flex-row">
          <div className="flex items-center text-sm md:text-base">
            <span>{product.popularity / 20 > 5 ? 5 : product.popularity / 20}</span>
            <FaStar className=" text-orange-theme" />
          </div>
          <div className="flex items-center text-sm">
            <ThreeZero Number={product.price} />
            <Toman />
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default memo(Product);
