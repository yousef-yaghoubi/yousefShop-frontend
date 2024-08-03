import React, { useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';
import { IoHomeOutline, IoReturnUpBackOutline } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { LiaSmsSolid } from 'react-icons/lia';
import { BsBagCheck, BsCurrencyDollar } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full mt-4 relative items-center px-4">
      <div className="flex items-center gap-x-5">
        <img
          src="https://ucarecdn.com/0e9ba612-d486-4f31-a44a-e5dcc5a9f1a6/-/preview/512x512/"
          alt="Admin Profile"
          className=" w-[50px] rounded-[50%]"
        />

        <div className="flex flex-col gap-y-[10px]">
          <h1 className="text-[1.3rem]">فلان فلانزاده</h1>
          <h3 className=" text-[rgb(128, 128, 128)] text-sm">ادمین سایت</h3>
        </div>
        
      </div>
      <div className="flex lx:hidden" onClick={() => setShowMenu(true)}>
        <CgMenuLeft size={23} />
      </div>
      <div className=" absolute left-8 flex-row w-fit justify-between items-center hidden lx:flex">
        <button
          className="border-none rounded-ten font-yekanBakhBold bg-orange-theme h-12 items-center text-white w-56 px-4 cursor-pointer flex justify-between"
          onClick={() => navigate('../')}>
          <IoReturnUpBackOutline className="icon text-2xl" />
          برگشت به صفحه اصلی
        </button>
      </div>
      <div
        className={`h-full top-0 right-0 fixed flex flex-row bg-opacity-30 bg-[#28282887] backdrop-blur-sm z-50  ${
          showMenu ? 'w-[100%]' : 'w-0'
        } transition-all duration-300 ease-in-out`}>
        <div
          className={` h-[100%] top-0  right-0 relative bg-white flex-col items-center ${
            showMenu ? 'w-[80%] flex ' : 'w-0 hidden'
          } transition-all duration-700 ease-in-out`}>
          <div className="sidebar bg-orange-theme w-full sticky top-0 h-[100dvh] flex flex-col">
            <h1 className="sidebar-title text-white text-xl text-right border-b-4 border-solid border-orange-theme p-4">به داشبورد خود خوش آمدید</h1>

            <ul className="sidebar-links mt-5 flex flex-col items-center overflow-auto">
              <NavLink
                to="/panel//"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center  "
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <IoHomeOutline className="icon ml-[10px] mb-4 text-2xl" />
                  صفحات اصلی
                </div>
              </NavLink>
              <NavLink
                to="/panel/products"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50"
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <MdOutlineProductionQuantityLimits className="icon ml-[10px] mb-4 text-2xl" />
                  محصولات
                </div>
              </NavLink>
              <NavLink
                to="/panel/users"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50"
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <FiUsers className="icon ml-[10px] mb-4 text-2xl" />
                  کاربران
                </div>
              </NavLink>
              <NavLink
                to="/panel/comments"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50"
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <LiaSmsSolid className="icon ml-[10px] mb-4 text-2xl" />
                  کامنت ها
                </div>
              </NavLink>
              <NavLink
                to="/panel/orders"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50"
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <BsBagCheck className="icon ml-[10px] mb-4 text-2xl" />
                  سفارشات
                </div>
              </NavLink>
              <NavLink
                to="/panel/offers"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50"
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <BsCurrencyDollar className="icon ml-[10px] mb-4 text-2xl" />
                  تخفیف ها
                </div>
              </NavLink>
              <NavLink
                to="../"
                className="relative p-0 pt-4 pr-3 rounded-md text-white w-4/5 text-lg flex items-center hover:text-white active:bg-orange-theme-50"
                onClick={() => setShowMenu(false)}>
                <div className=" text-white flex">
                  <IoReturnUpBackOutline className="icon ml-[10px] mb-4 text-2xl" />
                  بازگشت به صفحه اصلی
                </div>
              </NavLink>
            </ul>
          </div>
        </div>
        <MdClose className={`${showMenu ? 'flex' : 'hidden'} mr-4 mt-4 w-6 h-6 text-white`} onClick={() => setShowMenu(false)} />
      </div>
    </div>
  );
}

export default Header;
