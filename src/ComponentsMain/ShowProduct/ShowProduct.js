import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderMain from '../HeaderMain/HeaderMain';
import ThreeZero from '../../ThreeZero';
import Toman from '../../Toman/Toman';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineDoneOutline } from 'react-icons/md';
import { GoShieldCheck } from 'react-icons/go';
import { TbCubeSend } from 'react-icons/tb';
import NavProduct from '../NavProduct/NavProduct';
import { Link } from 'react-scroll';
import Specifications from '../Specifications/Specifications';
import Comment from '../Comment/Comment';
import { LinearProgress } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TbMessage } from 'react-icons/tb';
import AddComment from '../AddComment/AddComment';
import { Rating } from '@mui/material';
import moment from 'jalali-moment';
import { Toaster, toast } from 'sonner';
import useGetData from '../../ReactQuery/useGetData';
import usePostData from '../../ReactQuery/usePostData';
import { useDispatch, useSelector } from 'react-redux';
import cartsProductSlice from '../../redux/cartsProductSlice';
function ShowProduct() {
  const context = useSelector((state) => state.allProducts.allProduct);
  const locationURL = useLocation();
  const [productState, setProductState] = useState(null);
  const [showInter, setShowInter] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [comment, setComment] = useState(null);
  const [commentScore, setCommentScore] = useState([]);
  const [allCommentScore, setAllComentScore] = useState();
  const [oneScore, setOneScore] = useState(null);
  const [twoScore, setTwoScore] = useState(null);
  const [threeScore, setThreeScore] = useState(null);
  const [fourScore, setFourScore] = useState(null);
  const [fiveScore, setFiveScore] = useState(null);
  const [allScore, setAllScore] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [visibleTitle, setVisibleTitle] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [valueRating, setValueRating] = useState(1);
  const [labelInput, setLabelInput] = useState(false);
  const [addTextComment, setAddTextComment] = useState('');
  const fetchComment = useGetData('comments');
  const PostComment = usePostData();
  const [isLogin, setIsLogin] = useState(0);
  const shop = useSelector((state) => state.cartsProduct.cart);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    getProductForShow();
  }, [params]);

  useEffect(() => {
    if (loginUser != null && loginUser != undefined) {
      setIsLogin(loginUser);
    }
  }, []);

  useEffect(() => {
    if (fetchComment.data && productState != null) {
      let commentArrayAll = fetchComment.data.filter((result) => result.productID == productState.title);
      let commentArray = commentArrayAll.filter((resul) => resul.isAccept == 1);
      let arrayScore = [];
      commentArray.forEach((commen) => {
        arrayScore.push(commen.score);
      });
      setCommentScore(arrayScore);
      if (commentArray.length > 0) {
        setComment(commentArray);
      }
    }
  }, [productState]);

  useEffect(() => {
    getProductForShow();
  }, [context]);

  useEffect(() => {
    if (oneScore != null || twoScore != null || threeScore != null || fourScore != null || fiveScore != null) {
      let one = oneScore == null ? 0 : oneScore;
      let two = twoScore == null ? 0 : twoScore * 2;
      let three = threeScore == null ? 0 : threeScore * 3;
      let four = fourScore == null ? 0 : fourScore * 4;
      let five = fiveScore == null ? 0 : fiveScore * 5;
      setAllScore(one + two + three + four + five);
    }
  }, [oneScore || twoScore || threeScore || fourScore || fiveScore]);

  useEffect(() => {
    if (commentScore.length > 0) {
      setAllComentScore(commentScore.length);
      let onescoreComment = commentScore.filter((score) => score == 1);
      let twoscoreComment = commentScore.filter((score) => score == 2);
      let threescoreComment = commentScore.filter((score) => score == 3);
      let fourscoreComment = commentScore.filter((score) => score == 4);
      let fivescoreComment = commentScore.filter((score) => score == 5);

      if (onescoreComment !== null && onescoreComment.length > 0) {
        setOneScore(onescoreComment.length);
      }
      if (twoscoreComment !== null && twoscoreComment.length > 0) {
        setTwoScore(twoscoreComment.length);
      }
      if (threescoreComment !== null && threescoreComment.length > 0) {
        setThreeScore(threescoreComment.length);
      }
      if (fourscoreComment !== null && fourscoreComment.length > 0) {
        setFourScore(fourscoreComment.length);
      }
      if (fivescoreComment !== null && fivescoreComment.length > 0) {
        setFiveScore(fivescoreComment.length);
      }
    }
  }, [commentScore]);

  let check =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت';
  let introduction =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای';

  let loginUser = JSON.parse(localStorage.getItem('profile'));

  const getProductForShow = async () => {
    if (context != null && context != undefined) {
      let title = decodeURIComponent(locationURL.pathname).slice(9);
      let product = context.find((prod) => prod.title == title);
      await setProductState(product);
    }
  };

  const theme2 = createTheme({
    direction: 'rtl',
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#ab7f4b' : '#308fe8',
    },
  }));

  const submitComment = () => {
    if (isLogin != 0 && isLogin != null && isLogin != undefined) {
      if (addTextComment.length > 0 && valueRating > 0) {
        let date = new Date(new Date());
        let year = date.getFullYear();
        let mounth = date.getMonth() + 1;
        let day = date.getUTCDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let tarikh = [year, mounth, day];
        let saat = hours + ':' + minutes;

        let jalali = moment(tarikh, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
        let idUser = JSON.parse(localStorage.getItem('profile'));

        let body = {
          body: addTextComment,
          date: jalali,
          hour: saat,
          userID: idUser / 87461946194645613,
          productID: productState.id,
          isReply: 0,
          replyID: 0,
          isAccept: 0,
          score: valueRating,
          helpfulltrue: 0,
          helpfullfalse: 0,
        };
        PostComment.mutate({
          typePost: 'comments',
          body: body,
          success: (setShowAddComment(false), toast.success('کامنت با موفقیت ثبت شد. پس از تایید توسط مدیر نمایش داده می شود.')),
        });
      }
    } else {
      toast.warning('کاربر گرامی لطفا وارد حساب کاربری شوید');
    }
  };

  const handleLocalShop = () => {
    let product = Object.assign({}, { quantity: 1 }, productState);

    if (shop == null || shop == undefined) {
      dispatch(cartsProductSlice.actions.addCartProduct([product]));
      localStorage.setItem('Shop', JSON.stringify([product]));
      toast.success('کالا با موفقیت به سبد خرید افزوده شد.');
    }
    if (shop != null || shop != undefined) {
      if (shop.length == 0) {
        localStorage.setItem('Shop', JSON.stringify([product]));
        dispatch(cartsProductSlice.actions.addCartProduct([product]));
        toast.success('کالا با موفقیت به سبد خرید افزوده شد.');
      } else if (shop.length > 0) {
        let findShop = shop.find((product) => product.id == productState.id);
        let newShop = shop.concat([product]);
        if (findShop == undefined) {
          localStorage.setItem('Shop', JSON.stringify(newShop));
          dispatch(cartsProductSlice.actions.addCartProduct(newShop));
          toast.success('کالا با موفقیت به سبد خرید افزوده شد.');
        } else {
          toast.warning('این کالا در سبد خرید وجود دارد.');
        }
      }
    }
  };
  if (productState !== null) {
    return (
      <div className="flex items-center flex-col">
        <HeaderMain />

        <div className=" mt-24  w-11/12">
          <p className="mr-4 font-yekanBakhLight font-bold text-gray-600">
            <a href="../" className="pl-3">
              یوسف شاپ
            </a>
            /
            <a href={`../${productState.categoryID}`} className="pl-3">
              {productState.categoryID == 1
                ? 'لوازم جانبی'
                : productState.categoryID == 2
                ? 'کالای عمومی'
                : productState.categoryID == 3
                ? 'تبلت'
                : productState.categoryID == 4
                ? 'مانیتور'
                : productState.categoryID == 5
                ? 'موبایل'
                : productState.categoryID == 6
                ? 'لپتاپ'
                : productState.categoryID == 7
                ? 'هنذفری و هدفون'
                : productState.categoryID == 8
                ? 'وسایل گیمینگ'
                : 'ساعت و بند هوشمند'}
            </a>
            /
            <a href="#" className="pl-3">
              {productState.title}
            </a>
          </p>
          <div className=" rounded-2xl bg-white shadow-custom mt-6  p-6">
            <div className=" relative flex flex-col  lg:flex-row w-full h-fit lg:h-96 ">
              <div className="w-full lg:w-fit flex justify-center">
                <img src={`${productState.img}`} className="w-[25em] h-64 lg:h-80 rounded-lg" />
              </div>
              <div className="flex flex-col items-start mr-8 pt-8 relative">
                <h1 className=" text-2xl">{productState.title}</h1>
                <h3 className="flex flex-row-reverse mt-5 text-lg">
                  <FaStar className=" text-orange-theme mr-2" /> {productState.popularity / 20 > 5 ? 5 : productState.popularity / 20}
                </h3>
                <div className="flex flex-col xs:flex-row md:flex-col w-full justify-around my-6 h-24">
                  <h3 className="flex w-max font-yekanBakhLight font-semibold md:mt-6">موجود در {productState.colors} رنگ</h3>
                  {productState.count > 10 && (
                    <h2 className={`flex font-bold font-yekanBakhLight text-green-600 lg:absolute bottom-4 text-sm w-max`}>
                      موجود در انبار یوسف شاپ
                    </h2>
                  )}

                  {productState.count < 10 && (
                    <h2 className={`flex font-bold font-yekanBakhLight text-red-600 lg:absolute bottom-4 text-sm w-max`}>
                      تنها {productState.count} عدد در انبار باقی مانده
                    </h2>
                  )}
                </div>
              </div>

              <div className="bg-slate-100 lg:absolute bottom-8 w-full lg:w-[17em] h-[20em] rounded-lg  left-0 border-2 border-solid border-white-50 ">
                <div className="w-full flex items-center flex-col h-full justify-around">
                  <h4 className=" flex flex-row font-yekanBakhLight text-sm text-green-600 mt-4">
                    <MdOutlineDoneOutline className="text-lg ml-1" /> کمترین قیمت در 30 روز گذشته
                  </h4>

                  <div className=" h-14 flex flex-col justify-between">
                    <p className=" font-yekanBakhLight font-semibold text-sm flex">
                      <GoShieldCheck className="text-lg  ml-1" /> دارای گانتی 18 ماهه یوسف شاپ
                    </p>
                    <span className="flex items-center">
                      <TbCubeSend className="text-orange-theme text-xl ml-1" /> ارسال توسط یوسف شاپ
                    </span>
                  </div>

                  <h3 className="flex flex-row items-center">
                    <ThreeZero Number={productState.price} />
                    <Toman clas={'mr-4'} />
                  </h3>
                  <button
                    className={`bg-orange-theme font-bold mx-auto p-1 w-11/12 hover:shadow-input rounded-md text-white font-yekanBakhLight hover:bg-white hover:text-orange-theme border border-orange-theme border-solid transition-all duration-300 ease-in-out`}
                    onClick={() => handleLocalShop()}>
                    افزودن به سبد
                  </button>
                </div>
              </div>
            </div>
            <nav className=" w-full h-24 flex flex-row justify-between lg:justify-around items-center bg-white rounded-lg border-2 border-solid border-orange-theme mt-6 overflow-x-scroll navProduct">
              <div className=" w-[38em] flex md:w-full justify-around">
                <NavProduct src={'/img/navProduct/express-delivery.svg'} title={'امکان تحویل اکسپرس'} />
                <NavProduct src={'/img/navProduct/support.svg'} title={'24ساعته ، 7روز هفته'} />
                <NavProduct src={'/img/navProduct/cash-on-delivery.svg'} title={'امکان پرداخت در محل'} />
                <NavProduct src={'/img/navProduct/days-return.svg'} title={'هفت روز ضمانت بازگشت کالا'} />
                <NavProduct src={'/img/navProduct/original-products.svg'} title={'ضمانت اصل بودن کالا'} />
              </div>
            </nav>

            <div className="w-full">
              <ul className="w-full z-[2] h-12 flex flex-row mt-8 border-b border-orange-theme border-solid items-end sticky top-20 lg:top-24 bg-white overflow-x-scroll navProduct">
                <Link
                  className="mx-4 text-sm font-yekanBakhLight font-bold flex flex-col justify-between h-8 cursor-pointer"
                  activeClass=" border-b-4 border-solid border-orange-theme"
                  smooth
                  spy
                  to="introduction">
                  <span className=" w-max">معرفی</span>
                  <div></div>
                </Link>

                <Link
                  className="mx-4 text-sm font-yekanBakhLight font-bold flex flex-col justify-between h-8 cursor-pointer"
                  activeClass=" border-b-4 border-solid border-orange-theme"
                  smooth
                  spy
                  to="check">
                  <span className=" w-max">بررسی تخصصی</span>
                  <div></div>
                </Link>

                <Link
                  className="mx-4 text-sm font-yekanBakhLight font-bold flex flex-col justify-between h-8 cursor-pointer"
                  activeClass=" border-b-4 border-solid border-orange-theme"
                  smooth
                  spy
                  to="specifications">
                  <span className=" w-max">مشخصات</span>
                  <div></div>
                </Link>

                <Link
                  className="mx-4 text-sm font-yekanBakhLight font-bold flex flex-col justify-between h-8 cursor-pointer"
                  activeClass=" border-b-4 border-solid border-orange-theme"
                  smooth
                  spy
                  to="comments">
                  <span className=" w-max">کامنت ها</span>
                  <div></div>
                </Link>
              </ul>

              <div>
                <div className="pt-24" id="introduction">
                  <h1 className=" border-solid border-b border-orange-theme p-2 inline">معرفی</h1>
                  <div className="mt-8 text-sm md:text-base font-yekanBakhLight font-semibold leading-8 text-justify md:px-8">
                    <span>{showInter == false ? introduction.slice(0, 250) : introduction}</span>

                    <span>{showInter == false ? '... ' : ' '}</span>

                    <span onClick={() => setShowInter((prev) => !prev)} className=" cursor-pointer text-orange-theme">
                      {showInter == false ? 'موارد بیشتر >' : 'موارد کمتر >'}
                    </span>
                  </div>
                </div>

                <div className="pt-24" id="check">
                  <h1 className=" border-solid border-b border-orange-theme p-2 inline">بررسی تخصصی</h1>
                  <div className="mt-8 text-sm md:text-base font-yekanBakhLight font-semibold leading-8 text-justify md:px-8">
                    <span>{showCheck == false ? check.slice(0, 550) : check}</span>

                    <span>{showCheck == false ? '... ' : ' '}</span>

                    <span onClick={() => setShowCheck((prev) => !prev)} className=" cursor-pointer text-orange-theme">
                      {showCheck == false ? 'موارد بیشتر >' : 'موارد کمتر >'}
                    </span>
                  </div>
                </div>

                <div className="pt-24" id="specifications">
                  <h1 className=" border-solid border-b border-orange-theme p-2 inline">مشخصات</h1>
                  <div className="mt-8 text-sm md:text-base font-yekanBakhLight font-semibold leading-8 text-justify md:px-8">
                    {showSpecifications == false ? (
                      <>
                        <Specifications title={'ابعاد / وزن:'} count={'165.7x76x7.9 میلی متر/ 183.5 گرم'} />
                        <Specifications title={'رنگ:'} count={'سبز، زرد، قرمز'} />
                        <Specifications title={'نوع پردازنده - CPU :'} count={'Qualcomm SM6225 Snapdragon 685'} />
                        <Specifications title={'فرکانس پردازنده مرکزی :'} count={'4 هسته 2.8 گیگاهرتز Cortex-A73 و 4 هسته 1.9 گیگاهرتز Cortex-A53'} />
                      </>
                    ) : (
                      <>
                        <Specifications title={'ابعاد / وزن:'} count={'165.7x76x7.9 میلی متر/ 183.5 گرم'} />
                        <Specifications title={'رنگ:'} count={'سبز، زرد، قرمز'} />
                        <Specifications title={'نوع پردازنده - CPU :'} count={'Qualcomm SM6225 Snapdragon 685'} />
                        <Specifications title={'فرکانس پردازنده مرکزی :'} count={'4 هسته 2.8 گیگاهرتز Cortex-A73 و 4 هسته 1.9 گیگاهرتز Cortex-A53'} />
                        <Specifications title={'تعداد هسته پردازشگر :'} count={'هشت هسته'} />
                        <Specifications title={'پردازنده گرافیکی - GPU :'} count={'Adreno 610'} />
                        <Specifications title={'تعداد سیم کارت :'} count={'2 سیم کارت نانو سیم ( همزمان فعال)'} />
                        <Specifications title={'کیفیت دوربین :'} count={'سه گانه 50 مگاپیکسل + 8 مگاپیکسل + 2 مگاپیکسل'} />
                        <Specifications title={'سیستم عامل :'} count={'Android 13، HyperOS'} />
                        <Specifications title={'تاریخ معرفی :'} count={'فروردین 1402'} />
                        <Specifications title={'حافظه داخلی :'} count={'256 گیگابایت'} />
                        <Specifications title={'حافظه RAM :'} count={'8 گیگابایت'} />
                      </>
                    )}
                    <span onClick={() => setShowSpecifications((prev) => !prev)} className=" cursor-pointer text-orange-theme">
                      {showSpecifications == false ? 'موارد بیشتر >' : 'موارد کمتر >'}
                    </span>
                  </div>
                </div>

                <div className="pt-24" id="comments">
                  <h1 className=" border-solid border-b border-orange-theme p-2 inline">کامنت ها</h1>
                  <div className="mt-8 text-sm md:text-base flex flex-col md:flex-row justify-between items-center gap-y-8">
                    <div className="flex flex-col md:flex-row-reverse justify-between w-full items-center gap-8">
                      <div className="relative w-80 flex justify-center">
                        <div className="flex flex-col w-fit lg:ml-8 sticky top-4 lg:top-40">
                          <div className="flex justify-around lg:justify-between relative w-76 xs:w-80">
                            <div className=" w-32 lg:w-48">
                              <div className="flex flex-row justify-between">
                                <ThemeProvider theme={theme2}>
                                  <BorderLinearProgress
                                    variant="determinate"
                                    className="mt-1 w-44"
                                    value={fiveScore == null ? 0 : (fiveScore * 100) / allCommentScore}
                                  />
                                  <span className="font-bold text-sm">5</span>
                                </ThemeProvider>
                              </div>

                              <div className="flex flex-row justify-between">
                                <ThemeProvider theme={theme2}>
                                  <BorderLinearProgress
                                    variant="determinate"
                                    className=" mt-1 w-44"
                                    value={fourScore == null ? 0 : (fourScore * 100) / allCommentScore}
                                  />
                                  <span className="font-bold text-sm">4</span>
                                </ThemeProvider>
                              </div>

                              <div className="flex flex-row justify-between">
                                <ThemeProvider theme={theme2}>
                                  <BorderLinearProgress
                                    variant="determinate"
                                    className=" mt-1 w-44"
                                    value={threeScore == null ? 0 : (threeScore * 100) / allCommentScore}
                                  />
                                  <span className="font-bold text-sm">3</span>
                                </ThemeProvider>
                              </div>

                              <div className="flex flex-row justify-between">
                                <ThemeProvider theme={theme2}>
                                  <BorderLinearProgress
                                    variant="determinate"
                                    className=" mt-1 w-44"
                                    value={twoScore == null ? 0 : (twoScore * 100) / allCommentScore}
                                  />
                                  <span className="font-bold text-sm">2</span>
                                </ThemeProvider>
                              </div>

                              <div className="flex flex-row justify-between">
                                <ThemeProvider theme={theme2}>
                                  <BorderLinearProgress
                                    variant="determinate"
                                    className="mt-1 w-44"
                                    value={oneScore == null ? 0 : (oneScore * 100) / allCommentScore}
                                  />
                                  <span className="font-bold text-sm">1</span>
                                </ThemeProvider>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-around">
                              <h1
                                className="text-5xl font-yekanBakhBold font-bold flex flex-row h-fit cursor-pointer"
                                onMouseOver={() => setVisibleTitle((prev) => true)}
                                onMouseLeave={() => setVisibleTitle((prev) => false)}>
                                {allScore !== null ? (allScore / allCommentScore).toFixed(1) : '0'}
                                <FaStar color="#ffa500" className=" w-6 lg:w-10" />
                              </h1>
                              <span className=" font-yekanBakhLight font-bold text-sm">
                                {allCommentScore != undefined ? allCommentScore : 0}
                                نظر{' '}
                              </span>
                            </div>

                            <div
                              className={`absolute top-12 -left-8 p-1 rounded-3xl shadow-title bg-white transition-opacity duration-500   ${
                                visibleTitle == true ? 'opacity-100' : 'opacity-0'
                              }`}>
                              <span className=" font-bold text-sm">نمره کالا از دید کاربران</span>
                            </div>
                          </div>
                          <div className=" h-40 mt-4 rounded-ten flex flex-col justify-center items-center  shadow-btnComment w-[20em] xs:w-[20em]">
                            <div className="flex flex-col items-center xs:w-[20em]">
                              <div className="flex flex-row items-center">
                                <TbMessage size={25} className=" text-orange-theme" />
                                <span className=" text-xs font-bold mr-2">نظر خود را در مورد این محصول بنویسید ...</span>
                              </div>

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
                                    marginTop: '8em',
                                    marginBottom: '3em',
                                  },
                                }}
                              />

                              <button
                                className="w-[90%] mt-4 bg-orange-theme h-12 rounded-lg text-white font-yekanBakhLight font-bold text-lg"
                                onClick={() =>
                                  isLogin != 0 && isLogin != null && isLogin != undefined
                                    ? setShowAddComment(true)
                                    : toast.error('لطفا وارد حساب کاربری خود شوید.', { duration: 2000 })
                                }>
                                افزودن نظر+
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        {comment != null ? (
                          comment?.map((comm) => (
                            <Comment
                              id={comm.id}
                              key={comm.id}
                              user={comm.userID}
                              body={comm.body}
                              date={comm.date}
                              helpfulltrue={comm.helpfulltrue}
                              helpfullfalse={comm.helpfullfalse}
                              score={comm.score}
                              reRender={setReRender}
                            />
                          ))
                        ) : (
                          <div className=" w-64 md:w-full flex flex-col items-center">
                            <img
                              src="https://ucarecdn.com/a01a4435-f80a-4452-a7dd-c26f4baab14d/-/preview/1000x1000/"
                              alt="no comment"
                              className="w-52"
                            />
                            <span className=" font-bold">کامنتی وجود ندارد. شما اولین باشید.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAddComment == true && (
          <AddComment onClose={() => setShowAddComment(false)}>
            <div className=" h-full w-full comment">
              <h1 className=" font-yekanBakhLight font-bold text-lg">افزودن نظر</h1>
              <div className=" w-full h-20 mt-4 rounded-md flex flex-row shadow-md">
                <img src={productState.img} alt="image product" className="w-20 rounded-lg" />
                <span className=" text-sm font-bold mt-2 mr-4">{productState.title}</span>
              </div>
              <div className="w-full flex flex-col items-center mt-4">
                <span className=" text-xs font-bold">به این کالا امتیاز دهید</span>

                <div>
                  <Rating
                    name="size-large"
                    defaultValue={1}
                    onChange={(e) => setValueRating(e.target.value)}
                    size="large"
                    className="flex flex-row-reverse mt-3"
                  />
                </div>
                <div className="w-full mt-4">
                  <span className="text-xs font-bold">نظر خود را در مورد این محصول بنویسید.</span>
                  <div className="relative">
                    <textarea
                      className={`border border-solid text-base font-yekanBakhLight font-bold p-3 resize-none h-28 w-full mt-10 rounded-md outline-none ${
                        addTextComment.length > 0 ? ' shadow-inputTrue border-green-600' : ' shadow-inputFalse border-red-600'
                      }`}
                      onFocus={() => setLabelInput(true)}
                      onBlur={() => (addTextComment.length == 0 ? setLabelInput(false) : setLabelInput(true))}
                      onChange={(e) => setAddTextComment(e.target.value)}></textarea>
                    <span
                      className={`text-xs font-bold absolute transition-all duration-300 z-20  ${
                        labelInput == true ? 'right-2 top-4' : 'right-4 top-14'
                      } `}>
                      <span className="text-red-600">*</span>
                      توضیحات
                    </span>
                  </div>
                </div>
                <button
                  className="w-full mt-4 bg-orange-theme h-12 rounded-lg text-white font-yekanBakhLight font-bold text-lg hover:shadow-input  hover:bg-white hover:text-orange-theme border border-orange-theme border-solid transition-all duration-300 ease-in-out"
                  onClick={() => submitComment()}>
                  ثبت کامنت
                </button>
              </div>
            </div>
          </AddComment>
        )}
      </div>
    );
  }
}

export default ShowProduct;
