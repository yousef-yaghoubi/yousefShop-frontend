import React, { useState } from 'react';
import { FaChevronUp, FaChevronLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import filterCategorySlice from '../../redux/filterCategorySlice'
function Footer({ uref }) {
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const jumpUp = () => {
    uref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col w-full lg:h-[35em] bg-orange-theme rounded-xl relative mt-28">
      <div className=" absolute left-1/2 -top-6 md:top-0 md:left-20 w-fit h-fit md:w-40">
        <div
          className="flex w-fit justify-around border-2 border-solid border-orange-theme h-fit px-4 py-3 rounded-lg bg-white relative -left-1/2 md:absolute md:left-0 md:-top-6 cursor-pointer"
          onClick={() => jumpUp()}>
          <div className=" w-36 flex justify-around items-center">
            بازگشت به بالا
            <FaChevronUp />
          </div>
        </div>
      </div>
      <div className=" md:absolute top-12 left-16 mx-auto mt-8 md:mt-12">
        <div className=" cursor-pointer" onClick={() => navigate('../')}>
          <img src="https://ucarecdn.com/9918f0d3-03c1-4283-b0c8-f1039e5b2035/-/preview/275x261/" alt="logo" className=" w-20" />
          <span className=" font-bold">یوسف شاپ</span>
        </div>
      </div>
      <div className="flex flex-col items-center w-fit">
        <div className="flex flex-col lg:flex-row h-fit py-5 px-8 justify-between items-start mt-8 w-full md:w-[40em] lg:w-[42em] text-white">
          <div className=" w-full md:w-96 mb-12">
            <h2>درباره یوسف شاپ</h2>
            <p className=" text-justify mt-6 font-yekanBakhLight font-bold text-sm md:text-base">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون
              و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای{' '}
            </p>
          </div>
          <ul className={`font-yekanBakhLight font-bold text-sm transition-all duration-500`}>
            <h2
              className="mb-4 pb-2 font-yekanBakhBlack flex w-36 justify-between items-center cursor-pointer"
              onClick={() => {
                if (window.innerWidth < 800) {
                  setShowDetail((prev) => !prev);
                }
              }}>
              دسترسی سریع <FaChevronLeft className={`md:hidden ${showDetail == true ? ' -rotate-90' : ''}`} />
            </h2>
            <div className={` md:flex flex-col ${showDetail == true && window.innerWidth < 768 ? 'flex' : 'hidden'}`}>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(0))} to={'/products/all'}>
                  همه محصولات
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(1))} to={'/products/all'}>
                  لوازم جانبی
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(2))} to={'/products/all'}>
                  کالای عمومی
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(3))} to={'/products/all'}>
                  تبلت
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(4))} to={'/products/all'}>
                  مانیتور
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(5))} to={'/products/all'}>
                  موبایل
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(6))} to={'/products/all'}>
                  لپ تاپ
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(7))} to={'/products/all'}>
                  هنذفری و هدفون
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(8))} to={'/products/all'}>
                  وسایل گیمینگ
                </Link>
              </li>
              <li>
                <Link className="bg-transparent" onClick={()=> dispatch(filterCategorySlice.actions.editFilterCategory(9))} to={'/products/all'}>
                  ساعت و بند هوشمند
                </Link>
              </li>
            </div>
          </ul>
        </div>
        <div className=" bg-white md:absolute static top-72 md:w-72 left-8  h-24 flex justify-center w-[90%] rounded-ten mb-8">
          <div className="flex flex-col w-full justify-evenly px-4">
            <h4 className=" text-sm font-yekanBakhBold sm:text-base">شبکه های اجتماعی</h4>
            <div className="flex justify-around mb-2">
              <img src="https://ucarecdn.com/b663f87a-a755-4929-a951-682fe877908a/-/preview/1000x1000/" alt="telegram" className=" w-12 h-12" />
              <img src="https://ucarecdn.com/3c69155a-b73d-4349-9b1d-0ea42fad8ed9/-/preview/800x800/" alt="instagram" className=" w-12 h-12" />
              <img src="https://ucarecdn.com/5004a7b6-9cfe-4b2d-b440-c5852025b029/-/preview/400x400/" alt="linkedin" className=" w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center lg:absolute bottom-0">
        <div className="w-[90%] h-16 rounded-ten flex justify-center items-center bg-white font-yekanBakhLight font-bold mb-4 text-sm lg:text-base">
          تمامی حقوق متعلق به{' '}
          <Link to={'https://t.me/yousef_1307'} className=" mx-1 text-orange-theme">
            یوسف یعقوبی
          </Link>{' '}
          است.
        </div>
      </div>
    </section>
  );
}

export default Footer;
