import React, { memo } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Toman from '../../Toman/Toman';
import ThreeZero from '../../ThreeZero';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';
function SwiperProduct({ allProduct }) {
  return (
    <div className="w-full h-fit mt-7 rounded-xl border border-solid border-neutral-300 flex flex-col items-center">
      <div className="flex flex-row justify-between w-11/12 my-4 mt-7">
        <h1 className=" font-yekanBakhBold text-sm md:text-xl">پر فروش ترین ها</h1>
        <h2>
          <NavLink to={'./products'} className="flex text-orange-theme items-center cursor-pointer font-yekanBakhBold text-sm md:text-sm">
            {' '}
            نمایش همه
            <FaChevronLeft />
          </NavLink>
        </h2>
      </div>
      <div className=" w-11/12 h-full">
        <Swiper
          navigation={true}
          keyboard={true}
          autoplay
          loop={true}
          modules={[Navigation, Pagination, Keyboard, Autoplay]}
          breakpoints={{
            200: { slidesPerView: 1.5, spaceBetween: 40 },
            320: { slidesPerView: 1.7, spaceBetween: 50 },
            370: { slidesPerView: 2.2, spaceBetween: 50 },
            500: { slidesPerView: 2.7, spaceBetween: 80 },
            550: { slidesPerView: 2.7, spaceBetween: 80 },
            700: { slidesPerView: 3, spaceBetween: 50 },
            768: { slidesPerView: 3, spaceBetween: 50 },
            800: { slidesPerView: 4, spaceBetween: 40 },
            900: { slidesPerView: 4, spaceBetween: 50 },
            1024: { slidesPerView: 4, spaceBetween: 80 },
            1200: { slidesPerView: 5.5, spaceBetween: 60 },
            1400: { slidesPerView: 5.9, spaceBetween: 70 },
            1500: { slidesPerView: 4, spaceBetween: 10 },
          }}
          // modules={[ Pagination, Navigation]}
          className=" h-44 md:h-80 mt-4">
          {allProduct ? allProduct.map((product) => (
                <SwiperSlide className=" rounded-xl" key={product.id}>
                  <NavLink to={`/product/${product.title}`} className="flex flex-col w-full h-full items-center">
                    <img src={product.img} alt={product.title} className=" !w-20 !h-20 md:!w-40 md:!h-40" />
                    <h3 className=" font-yekanBakhBold text-sm md:text-base mt-6 flex justify-center">
                      {product.title.length > 15 ? `${product.title.slice(0, 15)}...` : product.title.slice(0, 15)}
                    </h3>
                    <div className="flex flex-col md:flex-row justify-between xl:justify-around w-full absolute bottom-3 items-center text-sm 2xl:text-base">
                      <span className="hidden md:flex flex-row font-bold">
                        {product.popularity / 20 > 5 ? 5 : product.popularity / 20} <FaStar color="orange" />
                      </span> 
                      <span className="flex flex-row items-center">
                        <ThreeZero Number={product.price} />
                        <Toman />
                      </span>
                    </div>
                  </NavLink>
                </SwiperSlide>
              ))
            : [1, 2, 3, 4, 5, 6, 7]?.map((element, index) => (
                <SwiperSlide className="flex flex-col w-[23em] h-80 items-center relative" key={index}>
                  <Skeleton animation="wave" variant="rounded" className="!w-20 !h-20 md:!w-40 md:!h-40" />

                  <Skeleton animation="wave" variant="rounded" className="mt-6 !w-20 !h-6 flex justify-center"></Skeleton>

                  <div className="flex flex-row h-10 md:flex-row justify-between xl:justify-around w-full absolute bottom-3 items-center">
                    <Skeleton animation="wave" variant="rounded" className="hidden md:flex flex-row !w-14 !h-5 bg-slate-500"></Skeleton>
                    <Skeleton animation="wave" variant="rounded" className="flex flex-row items-center !w-16 !h-5 bg-slate-500"></Skeleton>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default memo(SwiperProduct);
