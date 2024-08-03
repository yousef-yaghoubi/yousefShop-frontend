import React, { useEffect, useState, Suspense } from 'react';
import HeaderMain from '../HeaderMain/HeaderMain';
import { PiSortAscendingBold } from 'react-icons/pi';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { GoSortDesc } from 'react-icons/go';
import Toman from '../../Toman/Toman';
import Slider from '@mui/material/Slider';
import { Toaster, toast } from 'sonner';
import Skeleton from '@mui/material/Skeleton';
import { useLoading, ThreeDots } from '@agney/react-loading';
import DetealModal from '../../ComponentsPanel/DetealModal/DetealModal';
import { MdDone, MdClose } from 'react-icons/md';
import useGetData from '../../ReactQuery/useGetData';
import { useDispatch, useSelector } from 'react-redux';
import filterCategorySlice from '../../redux/filterCategorySlice';
const Product = React.lazy(() => import('../Product/Product'));

function AllProducts() {
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const categoryID = useSelector((state) => state.category.filterCate);
  const dispatch = useDispatch();
  const [filterColor, setFilterColor] = useState(1);
  const [valuePrice, setValuePrice] = useState([0, 100000000]);
  const [valuePriceOrg, setValuePriceOrg] = useState([0, 100000000]);
  const [filterSide, setFilterSide] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const fetchProducts = useGetData(
    `products/category${categoryID ? categoryID : 0}/filter${filterColor}/from${valuePriceOrg[0]}/to${valuePriceOrg[1]}`,
  );

  useEffect(() => {
    if (location.pathname.search('/saleDESC') != -1) {
      setFilterColor(1);
    } else if (location.pathname.search('/priceASC') != -1) {
      setFilterColor(2);
    } else if (location.pathname.search('/priceDESC') != -1) {
      setFilterColor(3);
    }
  }, [location]);

  useEffect(() => {
    if (categoryID != 0 && categoryID != undefined) {
      const searchFSide = filterSide.find((prev) => prev == 2);
      if (searchFSide != 1) {
        setFilterSide((prev) => [...prev, 2]);
      }
    }
  }, [categoryID]);

  useEffect(() => {
    let time = setTimeout(() => {
      setValuePriceOrg(valuePrice);
    }, 1000);

    return function () {
      clearTimeout(time);
    };
  }, [valuePrice]);

  const removeFilter = () => {
    setValuePriceOrg([0, 100000000]);
    setValuePrice([0, 100000000]);
    setFilterSide([]);
    dispatch(filterCategorySlice.actions.editFilterCategory(0));
  };

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="70" color="#ff9100" />,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <HeaderMain />
      <div className=" mt-16  w-11/12">
        <Toaster
          position="top-center"
          dir="rtl"
          visibleToasts={1}
          richColors
          expand={true}
          toastOptions={{
            style: {
              height: '4em',
              paddingRight: '1em',
              marginTop: '6em',
              marginBottom: '3em',
            },
          }}
        />
        <p className=" text-xs md:text-sm lg:text-base mr-2 lg:mr-4 font-yekanBakhLight font-bold text-gray-600">
          <NavLink to={'/'}>یوسف شاپ</NavLink> /{' '}
          <NavLink className=" bg-white">
            {categoryID == 0
              ? 'همه محصولات'
              : categoryID == 1
              ? 'لوازم جانبی'
              : categoryID == 3
              ? 'کالا های عمومی'
              : categoryID == 4
              ? 'مانیتور'
              : categoryID == 5
              ? 'موبایل'
              : categoryID == 6
              ? 'لپ تاپ'
              : categoryID == 7
              ? 'هنذفری و هدفون'
              : categoryID == 8
              ? 'وسایل گیمینگ'
              : 'ساعت و بند هوشمند'}
          </NavLink>
        </p>
        <div className=" flex flex-row w-full h-fit gap-8 mt-8">
          <aside className=" w-[270px] h-fit bg-slate-100 p-4 rounded-lg hidden lg:flex flex-col sticky top-28">
            <div className="flex justify-between items-center border-b-2 border-solid border-orange-theme pb-[0.6rem]">
              <h2 className=" text-xl flex">
                <FaFilter className="text-orange-theme" /> فیلتر ها
              </h2>
              <span
                className="text-xs font-semibold cursor-pointer"
                onClick={() => {
                  removeFilter();
                  toast.success('فیلتر ها حذف شدند');
                }}>
                حذف فیلتر ها
              </span>
            </div>
            <div>
              <li
                className=" list-none flex items-center font-yekanBakhLight font-bold mt-6 text-[15px] cursor-pointer justify-between"
                onClick={() => setShowPrice((prev) => !prev)}>
                <span className="flex flex-row items-center">
                  محدوده قیمت
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${filterSide.find((prev) => prev == 1) == 1 ? 'flex' : 'hidden'}`}></div>
                </span>
                <FaAngleLeft className={`transition-all duration-300 ${showPrice == true ? ' -rotate-90' : 'rotate-0'}`} />
              </li>

              <div className={` max-h-0 transition-[max-height] duration-700 ease-out overflow-hidden ${showPrice == true ? ' !max-h-40' : ' '}`}>
                <div className="flex flex-col h-56">
                  <Slider
                    className="!w-40 mr-4"
                    value={valuePrice}
                    min={0}
                    max={100000000}
                    step={500000}
                    onChange={(e, newValue) => setValuePrice(newValue)}
                  />
                  <div className="flex items-center justify-around my-2 relative">
                    <span className=" text-lg font-bold">از:</span>
                    <div className=" w-4/5 rounded-md border-2 pr-2 border-solid border-orange-theme bg-white">
                      <Toman clas={'!absolute left-5 top-1'} />
                      <input
                        type="text"
                        value={valuePrice[0].toLocaleString()}
                        onChange={(e) => {
                          setValuePrice((prev) => [Number(e.target.value.replace(/,/g, '')), prev[1]]);
                        }}
                        className=" w-4/5 outline-none p-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-around my-2 relative">
                    <span className=" text-lg font-bold">تا:</span>
                    <div className=" w-4/5 rounded-md border-2 pr-2 border-solid border-orange-theme bg-white">
                      <Toman clas={'!absolute left-5 top-1'} />
                      <input
                        type="text"
                        value={valuePrice[1].toLocaleString()}
                        onChange={(e) => {
                          setValuePrice((prev) => [prev[0], Number(e.target.value.replace(/,/g, ''))]);
                        }}
                        className=" w-4/5 outline-none p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <li
                className=" list-none flex items-center font-yekanBakhLight font-bold mt-6 text-[15px] cursor-pointer justify-between"
                onClick={() => setShowCategory((prev) => !prev)}>
                <span className="flex flex-row items-center">
                  دسته بندی
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${filterSide.find((prev) => prev == 2) == 2 ? 'flex' : 'hidden'}`}></div>
                </span>
                <FaAngleLeft className={`transition-all duration-300 ${showCategory == true ? ' -rotate-90' : 'rotate-0'}`} />
              </li>
              <div
                className={`flex flex-col max-h-0 transition-[max-height] duration-700 ease-out overflow-hidden mr-3 ${
                  showCategory == true ? ' !max-h-72' : ' '
                }`}>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(1))}>
                  <span>لوازم جانبی</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 1 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(2))}>
                  <span>کالای عمومی</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 2 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(3))}>
                  <span>تبلت</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 3 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(4))}>
                  <span>مانیتور</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 4 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(5))}>
                  <span>موبایل</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 5 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(6))}>
                  <span>لپ تاپ</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 6 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(7))}>
                  <span>هنذفری و هدفون</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 7 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(8))}>
                  <span>وسایل گیمینگ</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 8 ? 'flex' : 'hidden'}`}></div>
                </div>
                <div
                  className="my-1 flex items-center cursor-pointer bg-slate-100"
                  onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(9))}>
                  <span>ساعت و بند هوشمند</span>
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 9 ? 'flex' : 'hidden'}`}></div>
                </div>
              </div>

              <li className=" list-none flex items-center font-yekanBakhLight font-bold mt-6 text-[15px] cursor-pointer justify-between">
                <span className="flex flex-row items-center">
                  لورم ایپسوم 2
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${filterSide.find((prev) => prev == 3) == 3 ? 'flex' : 'hidden'}`}></div>
                </span>
                <FaAngleLeft className={`  transition-all duration-300 `} />
              </li>

              <li className=" list-none flex items-center font-yekanBakhLight font-bold mt-6 text-[15px] cursor-pointer justify-between">
                <span className="flex flex-row items-center">
                  لورم یپسوم 3
                  <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${filterSide.find((prev) => prev == 4) == 4 ? 'flex' : 'hidden'}`}></div>
                </span>
                <FaAngleLeft className={`  transition-all duration-300 `} />
              </li>
            </div>
          </aside>

          <main className=" w-full h-full">
            <div className=" h-14 w-full bg-white border-b-2 border-solid border-orange-theme flex items-center relative ">
              <div className="hidden lg:flex">
                <div className="flex text-sm">
                  <PiSortAscendingBold className=" text-xl" />
                  <span className=" font-semibold">مرتب سازی بر اساس:</span>
                </div>
                <div className="flex justify-between items-center text-sm lg:text-base">
                  <div>
                    <NavLink
                      to={'./saleDESC'}
                      className={`mr-6 cursor-pointer bg-white font-yekanBakhBlack ${filterColor == 1 ? 'text-orange-theme' : ''}`}
                      onClick={() => setFilterColor(1)}>
                      پرفروش ترین
                    </NavLink>
                    <NavLink
                      to={'./priceASC'}
                      className={`mr-6 cursor-pointer bg-white font-yekanBakhBlack ${filterColor == 2 ? 'text-orange-theme' : ''}`}
                      onClick={() => setFilterColor(2)}>
                      {' '}
                      ارزان ترین
                    </NavLink>
                    <NavLink
                      to={'./priceDESC'}
                      className={`mr-6 cursor-pointer bg-white font-yekanBakhBlack ${filterColor == 3 ? 'text-orange-theme' : ''}`}
                      onClick={() => setFilterColor(3)}>
                      {' '}
                      گران ترین
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                <div className="flex p-1 items-center w-20 justify-between mx-1" onClick={() => setShowFilter(true)}>
                  <FaFilter className="text-orange-theme" />
                  فیلتر ها
                </div>
                <div className="flex p-1 items-center w-[10em] justify-between mx-1" onClick={() => setShowSort(true)}>
                  <GoSortDesc />
                  ترتیب:
                  <span className=" font-bold text-xs sm:text-sm">
                    {filterColor == 1 ? 'پر فروش ترین' : filterColor == 2 ? 'ارزان ترین' : filterColor == 3 ? 'گران ترین' : ''}
                  </span>
                </div>
              </div>
              <div className="font-bold w-16 text-xs flex justify-evenly left-0 absolute top-0 xxs:top-5">
                <span> {fetchProducts.data ? fetchProducts.data.length : 0}</span>
                <span>کالا</span>
              </div>
            </div>

            <div className="pt-10 h-fit w-full flex md:justify-evenly gap-2 md:gap-[2%] xl:gap-y-16 flex-wrap">
              <div className="w-full md:w-[90%] flex flex-col content-center flex-wrap md:flex-row gap-x-[10%] xl:gap-x-[1%] gap-y-3">
                {fetchProducts.isPending == false ? (
                  fetchProducts.data.length > 0 ? (
                    fetchProducts.data?.map((product) => (
                      <Suspense
                        key={product.id}
                        fallback={
                          <div className=" w-[90%]  xl:w-[24%] md:w-[45%] h-48 md:h-96 p-5 flex flex-row md:flex-col items-center rounded-md shadow-custom">
                            <Skeleton variant="rounded" className=" w-20 sm:w-32 md:w-44 md:h-44 rounded-lg !bg-[#f3f3f3b8]" animation="wave" />

                            <div className="w-full relative h-full mr-4">
                              <h3 className="text-base lg:text-xl mt-2 md:mt-10">
                                <Skeleton variant="rounded" className="!w-full !h-8 !bg-[#f3f3f3b8]" animation="wave" />
                              </h3>
                              <div className="flex w-full justify-between  absolute bottom-0 flex-col xxxs:flex-row">
                                <div className="flex items-center text-sm md:text-base">
                                  <Skeleton variant="rounded" className=" !w-12 !h-6 !bg-[#f3f3f3b8]" animation="wave" />
                                </div>
                                <div className="flex items-center text-sm">
                                  <Skeleton variant="rounded" className=" !w-32 !h-6 !bg-[#f3f3f3b8]" animation="wave" />
                                </div>
                              </div>
                            </div>
                          </div>
                        }>
                        <Product product={product}></Product>
                      </Suspense>
                    ))
                  ) : (
                    <div className="flex flex-col items-center w-full mt-8">
                      <img src="https://ucarecdn.com/3be62bba-ab2e-4b64-968c-e577df8a19d9/-/preview/450x450/" alt="no product" className="w-52" />
                      <h3 className=" font-yekanBakhLight font-bold">متناسب با فیلتر های شما کالایی وجود ندارد.</h3>
                    </div>
                  )
                ) : (
                  <section {...containerProps} className="flex justify-center w-full h-80 content-center">
                    {indicatorEl} {/* renders only while loading */}
                  </section>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      {showSort && (
        <DetealModal onHide={() => setShowSort(false)}>
          <div>
            <ul className="w-44 h-20 flex flex-col justify-around">
              <li
                className="flex flex-row justify-between w-full text-sm font-bold cursor-pointer"
                onClick={() => {
                  setFilterColor(1);
                  navigate('./saleDESC');
                  setShowSort(false);
                }}>
                <span>پرفروش ترین</span> <MdDone className={` text-green-600 text-xl ${filterColor == 1 ? 'flex' : 'hidden'}`} />{' '}
              </li>
              <li
                className="flex flex-row justify-between w-full text-sm font-bold cursor-pointer"
                onClick={() => {
                  setFilterColor(2);
                  navigate('./priceASC');
                  setShowSort(false);
                }}>
                <span>ارزان ترین</span> <MdDone className={` text-green-600 text-xl ${filterColor == 2 ? 'flex' : 'hidden'}`} />{' '}
              </li>
              <li
                className="flex flex-row justify-between w-full text-sm font-bold cursor-pointer"
                onClick={() => {
                  setFilterColor(3);
                  navigate('./priceDESC');
                  setShowSort(false);
                }}>
                <span>گران ترین</span> <MdDone className={` text-green-600 text-xl ${filterColor == 3 ? 'flex' : 'hidden'}`} />{' '}
              </li>
            </ul>
          </div>
        </DetealModal>
      )}

      <div
        className={`h-full top-0 right-0 fixed flex flex-row bg-opacity-30 bg-[#28282887] backdrop-blur-sm z-50  ${
          showFilter ? 'w-[100%]' : 'w-0'
        } transition-all duration-300 ease-in-out`}>
        <div
          className={` h-[100%] top-0  right-0 relative bg-white  ${
            showFilter ? 'w-[80%] flex flex-col ' : 'w-0 hidden'
          } transition-all duration-700 ease-in-out p-4`}>
          <div className="flex justify-between items-center border-b-2 border-solid border-orange-theme pb-[0.6rem]">
            <h2 className=" text-xl flex">
              <FaFilter className="text-orange-theme" /> فیلتر ها
            </h2>
            <span
              className="text-xs font-semibold cursor-pointer"
              onClick={() => {
                removeFilter();
                toast.success('فیلتر ها حذف شدند');
              }}>
              حذف فیلتر ها
            </span>
          </div>

          <div>
            <li
              className="w-32 list-none flex items-center font-yekanBakhLight font-bold mt-6 text-[15px] cursor-pointer justify-between"
              onClick={() => setShowPrice((prev) => !prev)}>
              <span className="flex flex-row items-center">
                محدوده قیمت
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${filterSide.find((prev) => prev == 1) == 1 ? 'flex' : 'hidden'}`}></div>
              </span>
              <FaAngleLeft className={`transition-all duration-300 ${showPrice == true ? ' -rotate-90' : 'rotate-0'}`} />
            </li>

            <div
              className={` max-h-0 w-[100%] xs:w-72 transition-[max-height] duration-700 ease-out overflow-hidden ${
                showPrice == true ? ' !max-h-56 transition-[max-height] ease-in' : ' '
              }`}>
              <div className="flex flex-col h-40">
                <Slider
                  className=" !w-[90%] mr-3"
                  value={valuePrice}
                  min={0}
                  max={100000000}
                  step={500000}
                  onChange={(e, newValue) => setValuePrice(newValue)}
                />
                <div className="flex items-center justify-around my-2 relative">
                  <span className=" text-lg font-bold">از:</span>
                  <div className=" w-4/5 rounded-md border-2 pr-2 border-solid border-orange-theme bg-white">
                    <Toman clas={'!absolute left-5 top-1'} />
                    <input
                      type="text"
                      value={valuePrice[0].toLocaleString()}
                      onChange={(e) => {
                        setValuePrice((prev) => [Number(e.target.value.replace(/,/g, '')), prev[1]]);
                      }}
                      className=" w-4/5 outline-none p-2"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-around my-2 relative">
                  <span className=" text-lg font-bold">تا:</span>
                  <div className=" w-4/5 rounded-md border-2 pr-2 border-solid border-orange-theme bg-white">
                    <Toman clas={'!absolute left-5 top-1'} />
                    <input
                      type="text"
                      value={valuePrice[1].toLocaleString()}
                      onChange={(e) => {
                        setValuePrice((prev) => [prev[0], Number(e.target.value.replace(/,/g, ''))]);
                      }}
                      className=" w-4/5 outline-none p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <li
              className="w-32 list-none flex items-center font-yekanBakhLight font-bold mt-6 text-[15px] cursor-pointer justify-between"
              onClick={() => setShowCategory((prev) => !prev)}>
              <span className="flex flex-row items-center">
                دسته بندی
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${filterSide.find((prev) => prev == 2) == 2 ? 'flex' : 'hidden'}`}></div>
              </span>
              <FaAngleLeft className={`transition-all duration-300 ${showCategory == true ? ' -rotate-90' : 'rotate-0'}`} />
            </li>
            <div
              className={`flex flex-col max-h-0 transition-[max-height] duration-700 ease-out overflow-hidden mr-3 w-36 ${
                showCategory == true ? ' !max-h-72' : ' '
              }`}>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(1))}>
                <span>لوازم جانبی</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 1 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(2))}>
                <span>کالای عمومی</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 2 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(3))}>
                <span>تبلت</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 3 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(4))}>
                <span>مانیتور</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 4 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(5))}>
                <span>موبایل</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 5 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(6))}>
                <span>لپ تاپ</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 6 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(7))}>
                <span>هنذفری و هدفون</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 7 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(8))}>
                <span>وسایل گیمینگ</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 8 ? 'flex' : 'hidden'}`}></div>
              </div>
              <div
                className="my-1 flex items-center cursor-pointer bg-white"
                onClick={() => dispatch(filterCategorySlice.actions.editFilterCategory(9))}>
                <span>ساعت و بند هوشمند</span>
                <div className={`bg-orange-theme w-1 h-1 rounded-lg mr-3 ${categoryID == 9 ? 'flex' : 'hidden'}`}></div>
              </div>
            </div>
          </div>
        </div>
        <MdClose className={`${showFilter ? 'flex' : 'hidden'} mr-4 mt-4 w-6 h-6 text-white`} onClick={() => setShowFilter(false)} />
      </div>
    </div>
  );
}

export default AllProducts;
