import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import filterCategorySlice from '../../redux/filterCategorySlice';

function SwiperCategory() {
  const dispatch = useDispatch();
  return (
    <section className=" mb-12 mt-16 flex items-center justify-center">
      <div className=" w-[90%]">
        <Swiper
          keyboard={true}
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Keyboard, Autoplay]}
          breakpoints={{
            200: { slidesPerView: 2.6, spaceBetween: 30 },
            320: { slidesPerView: 3, spaceBetween: 30 },
            370: { slidesPerView: 3, spaceBetween: 50 },
            500: { slidesPerView: 3, spaceBetween: 80 },
            550: { slidesPerView: 3, spaceBetween: 80 },
            700: { slidesPerView: 4, spaceBetween: 50 },
            768: { slidesPerView: 4, spaceBetween: 50 },
            800: { slidesPerView: 5, spaceBetween: 40 },
            900: { slidesPerView: 5, spaceBetween: 50 },
            1024: { slidesPerView: 4, spaceBetween: 80 },
            1200: { slidesPerView: 5.5, spaceBetween: 60 },
            1400: { slidesPerView: 5.9, spaceBetween: 70 },
            1500: { slidesPerView: 7.5, spaceBetween: 70 },
          }}
          // modules={[ Pagination, Navigation]}
          className="mySwiper !h-36">
          <div className=" w-10/12">
            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(4))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/38bdc439-7bf2-423e-a1c0-cfa1d3925c69/-/preview/1000x1000/"
                  alt="monitor"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">مانیتور</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(5))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/da15080a-8f5c-4657-aab7-9afecf807608/-/preview/1000x1000/"
                  alt="mobile"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">موبایل </span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(7))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/41ddaea0-bfb0-4a77-a150-73c880b3f614/-/preview/1000x1000/"
                  alt="headphone"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">هنذفری و هدفون</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(6))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/738f9a9a-6661-4c96-9925-19f5dec8f8c7/-/preview/1000x1000/"
                  alt="laptop"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">لپ تاب</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(1))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/06b61afd-7d01-4feb-89a9-e6d858bc2e50/-/preview/1000x1000/"
                  alt="accesory"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">لوازم جانبی</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(8))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/2d4ae233-e97e-4aeb-929c-01ef87b81917/-/preview/1000x1000/"
                  alt="Gaming-equipment"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">وسایل گیمینگ</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(3))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/5231d308-3de8-4aa7-a259-ff7404f8ed50/-/preview/1000x1000/"
                  alt="tablet"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">تبلت</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(2))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/90e01bea-5e3d-4fda-a5a5-8628550269e5/-/preview/1000x1000/"
                  alt="wirst watch"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">عمومی</span>
              </NavLink>
            </SwiperSlide>

            <SwiperSlide className=" rounded-full">
              <NavLink
                to={'./products'}
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(9))}
                className="flex flex-col h-full justify-around items-center cursor-pointer">
                <img
                  src="https://ucarecdn.com/460fe1ab-16c4-4ee3-9890-e48dee74e2ed/-/preview/1000x1000/"
                  alt="wirst watch"
                  className=" !w-28 !h-fit rounded-full p-1 bg-white ring-2 ring-orange-theme"
                />
                <span className="font-bold text-xs">ساعت و بند هوشمند</span>
              </NavLink>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default SwiperCategory;
