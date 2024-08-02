import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export default function Sswiper() {
  const navigate = useNavigate();
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{
        delay: 5000,
      }}
      className="mySwiper w-full md:h-[28em] h-56 rounded-b-xl">
      <SwiperSlide className=" text-center text-lg bg-white flex justify-center items-center cursor-pointer" onClick={() => navigate('./products')}>
        <img
          src={
            window.innerWidth < 640
              ? 'https://ucarecdn.com/6d43fd0d-14f6-4389-9050-62c935ca78ed/-/preview/417x300/'
              : 'https://ucarecdn.com/5d4b9948-1fee-4fd4-8e8b-1308fa2153df/-/preview/1000x262/'
          }
          alt="vga"
          className="block w-full h-full"
        />
      </SwiperSlide>

      <SwiperSlide className=" text-center text-lg bg-white flex justify-center items-center cursor-pointer" onClick={() => navigate('./products')}>
        <img
          src={
            window.innerWidth < 640
              ? 'https://ucarecdn.com/601e01bd-ee68-4358-a5cc-ae490cef0672/-/preview/417x300/'
              : 'https://ucarecdn.com/52d631b0-d3e0-4d30-a8cd-24e023775b2a/-/preview/1000x262/'
          }
          alt="manitor"
          className="block w-full h-full"
        />
      </SwiperSlide>

      <SwiperSlide className=" text-center text-lg bg-white flex justify-center items-center cursor-pointer" onClick={() => navigate('./products')}>
        <img
          src={
            window.innerWidth < 640
              ? 'https://ucarecdn.com/2ce0e0f6-2a39-4ccd-9999-5290f9b59140/-/preview/417x300/'
              : 'https://ucarecdn.com/0015a829-3f6a-4c55-8354-84fb3bf5c39c/-/preview/1000x262/'
          }
          alt="ram"
          className="block w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
}
