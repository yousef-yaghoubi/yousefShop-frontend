import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { LiaSmsSolid } from 'react-icons/lia';
import { BsBagCheck, BsCurrencyDollar } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar bg-orange-theme w-64 sticky top-0 h-[100dvh] hidden lx:flex flex-col">
      <h1 className="sidebar-title text-white text-xl text-right border-b-4 border-solid border-orange-theme p-4">به داشبورد خود خوش آمدید</h1>

      <ul className="sidebar-links mt-5 flex flex-col items-center overflow-auto">
        <NavLink to="/panel//" className="relative font-yekanBakhBold p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center  ">
          <div className=" text-white flex">
            <IoHomeOutline className="icon ml-[10px] mb-4 text-2xl" />
            صفحات اصلی
          </div>
        </NavLink>
        <NavLink
          to="/panel/products"
          className="relative font-yekanBakhBold p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50">
          <div className=" text-white flex">
            <MdOutlineProductionQuantityLimits className="icon ml-[10px] mb-4 text-2xl" />
            محصولات
          </div>
        </NavLink>
        <NavLink
          to="/panel/users"
          className="relative font-yekanBakhBold p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50">
          <div className=" text-white flex">
            <FiUsers className="icon ml-[10px] mb-4 text-2xl" />
            کاربران
          </div>
        </NavLink>
        <NavLink
          to="/panel/comments"
          className="relative font-yekanBakhBold p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50">
          <div className=" text-white flex">
            <LiaSmsSolid className="icon ml-[10px] mb-4 text-2xl" />
            کامنت ها
          </div>
        </NavLink>
        <NavLink
          to="/panel/orders"
          className="relative font-yekanBakhBold p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50">
          <div className=" text-white flex">
            <BsBagCheck className="icon ml-[10px] mb-4 text-2xl" />
            سفارشات
          </div>
        </NavLink>
        <NavLink
          to="/panel/offers"
          className="relative font-yekanBakhBold p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50">
          <div className=" text-white flex">
            <BsCurrencyDollar className="icon ml-[10px] mb-4 text-2xl" />
            تخفیف ها
          </div>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
