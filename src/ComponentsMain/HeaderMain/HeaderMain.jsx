import React, { memo, useEffect, useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaAngleLeft, FaStar } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CgShoppingBag } from 'react-icons/cg';
import { RiSearch2Line } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { TbMenuDeep } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import BtnMenu from '../BtnMenu/BtnMenu';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../../ComponentsPanel/DeleteModal/DeleteModal';
import useGetData from '../../ReactQuery/useGetData';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from '../../redux/authSlice';
import ThreeZero from '../../ThreeZero';
import Toman from '../../Toman/Toman';
import { ThreeDots, useLoading } from '@agney/react-loading';

const HeaderMain = memo(() => {
  const location = useLocation();
  const [shwoMenu, setShwoMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenuProfile, setShowMenuProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCloseAccont, setShowCloseAccont] = useState(false);
  const [quanShop, setQuanShop] = useState(null);
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [query, setQuery] = useState(null);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dataFetchSearch = useGetData(query !== null ? `products/q=${query}` : '');
  const shop = useSelector((state) => state.cartsProduct.cart);
  const profileUser = useSelector((state) => state.auth.authorization);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileUser !== null) {
      const profileId = profileUser / 87461946194645613;
      fetch(`https://yousefshopapi.liara.run/api/users/id=${profileId}`)
        .then((res) => res.json())
        .then((result) => {
          setProfile(result[0].id);
        });
    }
  }, [profileUser]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (shop != undefined && shop != null) {
      setQuanShop(shop.length);
    }
  }, [shop]);

  const handleScroll = () => {
    const newScrollYPosition = window.pageYOffset;
    setScrollYPosition(newScrollYPosition);
  };

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="70" color="#ff9100" />,
  });

  return (
    <>
      <div className="flex justify-center w-full">
        <div
          className={` h-16 lg:h-20 z-20 top-0 flex justify-between items-center transition-all duration-500 ${
            location.pathname == '/shopingcart'
              ? shop != null && shop != undefined && shop.length > 1 && scrollYPosition > 20
                ? 'fixed w-[90%] bg-[#58585830] top-4 backdrop-blur-[20px] rounded-2xl'
                : ' bg-[#f6f8fa] w-full'
              : scrollYPosition > 20
              ? ' fixed w-[90%] bg-[#58585830] top-4 backdrop-blur-[20px] rounded-2xl'
              : ' bg-[#f6f8fa] w-full'
          }`}>
          <div className=" header-right flex flex-row items-center w-full justify-around xs:w-[54%] xs:justify-between xs:mr-[4%]  md:w-fit ">
            <div className=" flex justify-center items-center md:hidden ">
              <TbMenuDeep
                onClick={() => setShwoMenu(true)}
                className={` w-[1.5em] h-[1.5em] sm:w-[2em] sm:h-[2em] ${
                  shwoMenu ? ' opacity-0 z-10' : 'opacity-100 z-20'
                } transition-[opacity] duration-500 ease-linear absolute`}
              />
            </div>

            <img
              src="https://ucarecdn.com/7284a935-3f33-4c75-a0cd-5162863555ae/-/preview/500x500/"
              alt="logo"
              className=" w-16 lg:w-24 cursor-pointer"
              onClick={() => navigate('../')}
            />
          </div>

          <ul className=" w-1/2 h-full font-semibold justify-around items-center font-yekanBakhLight select-none hidden md:flex min-w-[30em]">
            <li>
              <Link to={'/products/all'} className="transition-colors ease-in-out duration-500 hover:text-orange-theme">
              همه محصولات
              </Link>
            </li>
            <li>
              <Link to={'/#'} className="transition-colors ease-in-out duration-500 hover:text-orange-theme bg-transparent">
                تماس با من
              </Link>
            </li>
            <li>
              <Link to={'/#'} className="transition-colors ease-in-out duration-500 hover:text-orange-theme bg-transparent">
                درباره من
              </Link>
            </li>
            <li>
              <Link to={'/panel'} className="transition-colors ease-in-out duration-500 hover:text-orange-theme bg-transparent">
                می خواهید فروشنده شوید؟
              </Link>
            </li>
          </ul>

          <div className=" flex flex-row justify-around items-center ml-4 w-1/3 max-w-[19em] ">
            <div className=" hidden lg:flex">
              <Link to={'tel:09058972658'}>09058972658</Link>
            </div>

            <div
              onClick={() => {
                setShowSearch(true);
              }}
              className="relative">
              <BtnMenu clas={'hidden'}>
                <BsSearch />
              </BtnMenu>
            </div>

            <NavLink to={'/shopingcart'} className=" bg-transparent">
              <BtnMenu clas={'flex w-1/3 relative'}>
                <div className=" bg-orange-theme w-fit px-1 h-5 text-white rounded-full flex items-center justify-center absolute -top-2 -right-[2px]">
                  <span className=" text-base">{quanShop == null ? 0 : quanShop}</span>
                </div>
                <CgShoppingBag />
              </BtnMenu>
            </NavLink>

            <span onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)}>
              <BtnMenu clas={'hidden'}>
                <AiOutlineUser />
              </BtnMenu>
            </span>

            <div
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
              className={` transition-all duration-500 ${
                showProfile == true ? 'top-20 opacity-100 z-50 visible' : ' top-36 opacity-0 z-0 invisible'
              } w-44 h-52 bg-[#f5f5f5] absolute left-2  rounded-ten before:w-[15px] before:h-[15px] before:top-[-5px] before:left-8 before:absolute before:bg-[#f5f5f5] before:z-10 before:transform before:rotate-45 before:rounded-[3px]`}>
              {profile == profileUser / 87461946194645613 ? (
                <>
                  <ul className=" font-yekanBakhLight font-bold flex flex-col justify-around h-full p-2">
                    <NavLink to={'/profile'} className="bg-[#f5f5f5] hover:bg-orange-200 transition-all duration-500 rounded-md p-2 ease-in">
                      پروفایل
                    </NavLink>
                    <li className="p-2 hover:bg-orange-200 transition-all duration-500 rounded-md  ease-in">امنیت</li>
                    <li className="p-2 hover:bg-orange-200 transition-all duration-500 rounded-md  ease-in">تنظیمات</li>
                    <li
                      className=" text-red-600 cursor-pointer"
                      onClick={() => {
                        setShowProfile(false);
                        setShowCloseAccont(true);
                      }}>
                      خروج از حساب کاربری
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <div className=" font-yekanBakhLight font-bold flex flex-col justify-around h-full p-4">
                    <NavLink to={'/login'} className=" text-xs text-orange-theme cursor-pointer bg-[#f5f5f5]">
                      ورود یا ساخت حساب کاربری
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`h-full top-0 right-0 fixed flex flex-row bg-opacity-30 bg-[#28282887] backdrop-blur-sm z-50  ${
            shwoMenu ? 'w-[100%]' : 'w-0'
          } transition-all duration-300 ease-in-out`}>
          <div
            className={` h-[100%] top-0  right-0 relative bg-white flex-col items-center ${
              shwoMenu ? 'w-[80%] flex ' : 'w-0 hidden'
            } transition-all duration-700 ease-in-out`}>
            <div className="flex w-40 h-8 items-center justify-between">
              <Link to={'../'}>
                <img
                  src="https://ucarecdn.com/0dbacbc5-192b-4d7f-af8f-c02b853708f2/-/preview/513x487/"
                  className="w-12 h-12 absolute top-2 left-5"
                  alt="logo"
                />
              </Link>
              {/* <span>یوسف شاپ</span> */}
              <MdClose className={`${shwoMenu ? 'flex' : 'hidden'} absolute top-6 right-4 w-6 h-6`} onClick={() => setShwoMenu(false)} />
            </div>
            <ul className=" font-yekanBakhLight font-bold w-full flex flex-col p-4">
              <li className="mt-4">
                <span
                  onClick={() => {
                    setShowSearch(true);
                    setShwoMenu(false);
                  }}>
                  جستجو
                </span>
              </li>
              <li className="mt-4">
                <Link to={'/products/all'}>همه محصولات</Link>
              </li>
              <li className="mt-4">درباره ما</li>
              <li className="mt-4">تماس با ما</li>
              <li className="mt-4">
                <NavLink to={'/panel'}>می خواهید فروشنده شوید؟</NavLink>
              </li>
              <li className="mt-4 w-32 flex justify-between xs:hidden" onClick={() => setShowMenuProfile((prev) => !prev)}>
                <span>پروفایل</span>
                <FaAngleLeft className={`transition-all duration-300 ${showMenuProfile == true ? ' -rotate-90' : 'rotate-0'}`} />
              </li>

              <div
                className={` max-h-0 w-[100%] xs:w-72 transition-[max-height] duration-700 ease-out overflow-hidden ${
                  showMenuProfile == true ? ' !max-h-56 transition-[max-height] ease-in' : ' '
                }`}>
                {profile != null && profile != -1 ? (
                  <>
                    <ul className=" font-yekanBakhLight font-bold flex flex-col justify-around h-full p-2">
                      <NavLink to={'/profile'} className="bg-white hover:bg-orange-200 transition-all duration-500 rounded-md p-2 ease-in">
                        پروفایل
                      </NavLink>
                      <li className="p-2 hover:bg-orange-200 transition-all duration-500 rounded-md  ease-in">امنیت</li>
                      <li className="p-2 hover:bg-orange-200 transition-all duration-500 rounded-md  ease-in">تنظیمات</li>
                      <li
                        className=" text-red-600 cursor-pointer"
                        onClick={() => {
                          setShowProfile(false);
                          setShowCloseAccont(true);
                        }}>
                        خروج از حساب کاربری
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <div className=" font-yekanBakhLight font-bold flex flex-col justify-around h-full p-4">
                      <Link to={'/login'} className=" text-sm text-orange-theme cursor-pointer">
                        ورود یا ساخت حساب کاربری
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {showCloseAccont && (
        <DeleteModal
          modalNotShow={() => setShowCloseAccont(false)}
          modalShow={() => {
            localStorage.removeItem('profile');
            dispatch(authSlice.actions.addAuth(null));
            setProfile(null);
            setShowCloseAccont(false);
          }}>
          <h3>آیا می خواهید از حساب خود خارج شوید؟</h3>
        </DeleteModal>
      )}
      <div className={`backGroundModal activeModal duration-300 ${showSearch == false ? ' max-w-0' : ' max-w-full'}`}>
        <div
          className={` ${
            query == null || query == '' ? 'h-40 top-32 w-5/6 rounded-[20px]' : 'h-full w-full md:w-5/6 md:h-5/6 top-0 md:top-32 md:rounded-[20px]'
          } bg-white transition-all duration-500 absolute flex flex-col items-center justify-around`}>
          <div className=" w-full h-32 bg-white flex flex-col items-center justify-around rounded-[20px]">
            <div className="w-full flex justify-end pt-2 pl-6">
              <IoIosCloseCircleOutline size={20} color="#ff9100" cursor="pointer" onClick={() => setShowSearch(false)} />
            </div>
            <div
              className={`w-4/5 h-12 border border-solid border-[#bdbdbd] rounded-ten flex justify-between p-1 items-center ${
                showSearch == false ? 'hidden' : 'flex'
              }`}>
              <input
                type="text"
                placeholder="دنبال چه میگردید؟"
                ref={inputRef}
                onChange={(e) => {
                  setTimeout(() => {
                    setQuery(e.target.value);
                  }, 2000);
                }}
                autoFocus
                className={`w-4/5 outline-none pr-4 font-yekanBakhLight font-bold`}
              />
              <div className="pl-4">
                <RiSearch2Line size={25} />
              </div>
            </div>
          </div>
          <div
            className={` w-full xs:w-5/6 h-4/5 xs:bg-[#f3f3f3] mb-4 rounded-lg ${
              query == null || query == '' ? 'hidden' : 'flex'
            } flex-col items-center overflow-y-auto`}>
            {dataFetchSearch.isPending == false ? (
              dataFetchSearch.data?.length > 0 ? (
                dataFetchSearch.data?.map((element) => (
                  <div className={showSearch == false ? 'hidden' : 'flex w-11/12 pt-2'} key={element.id}>
                    <div className=" flex-col h-28 md:flex-row w-full border border-solid border-white-50 items-center p-6 mb-4 bg-white rounded-xl select-none flex justify-center">
                      <div className=" flex flex-row items-center w-full">
                        <img
                          src={element.img}
                          alt="logo"
                          className=" rounded-xl  border-2 border-solid border-white-50 w-20 h-20 cursor-pointer"
                          onClick={() => {
                            navigate(`../product/${element.title}`);
                            setShowSearch(false);
                          }}
                        />
                        <div className="flex justify-around flex-col my-4 mr-8">
                          <span
                            className=" text-base font-yekanBakhBold cursor-pointer"
                            onClick={() => {
                              navigate(`../product/${element.title}`);
                              setShowSearch(false);
                            }}>
                            {element.title}
                          </span>
                        </div>
                      </div>
                      <div className="hidden lg:flex w-60 justify-evenly h-full md:items-center md:w-auto items-start" style={{ width: '14em' }}>
                        <div className="flex justify-around w-full flex-col items-center">
                          <div className="flex flex-row">
                            <p>{element.popularity / 20} / 5</p>
                            <FaStar color="#bcbf0f" />
                          </div>
                        </div>
                        <div className=" h-28 flex justify-around md:items-center w-full md:flex-col">
                          <div className="flex flex-row items-center w-32 justify-around md:w-full">
                            <p>{<ThreeZero Number={element.price} />}</p>
                            <Toman />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className={`m-auto flex-col ${showSearch == false && query == null ? 'hidden' : 'flex'}`}>
                    <img src="https://ucarecdn.com/3be62bba-ab2e-4b64-968c-e577df8a19d9/-/preview/450x450/" alt="empty" className="w-60" />
                    <span className="font-yekanBakhBold">کالایی متناسب با سرچ شما وجود ندارد.</span>
                  </div>
                </>
              )
            ) : (
              <section {...containerProps} className="flex justify-center w-full h-80 content-center">
                {indicatorEl} {/* renders only while loading */}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default HeaderMain;
