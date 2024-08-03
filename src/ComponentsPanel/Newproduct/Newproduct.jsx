import React, { useState } from 'react';
import axios from 'axios';
import { VscSymbolNamespace } from 'react-icons/vsc';
import { FaStarHalfAlt, FaDollarSign } from 'react-icons/fa';
import { FaChartColumn } from 'react-icons/fa6';
import { MdOutlineInventory, MdInsertPhoto } from 'react-icons/md';
import { IoMdColorPalette } from 'react-icons/io';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import usePostData from '../../ReactQuery/usePostData';
import useGetData from '../../ReactQuery/useGetData';
import { Toaster, toast } from 'sonner';

export default function AddNewProduct() {
  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCount, setNewProductCount] = useState('');
  const [newProductPopularity, setNewProductPopularity] = useState('');
  const [newProductSale, setNewProductSale] = useState('');
  const [newProductColors, setNewProductColors] = useState('');
  const [newProductCategoryID, setNewProductCategoryID] = useState(2);
  const [image, setImage] = useState(null);
  const [imageSending, setImageSending] = useState(false);
  const postProduct = usePostData();
  const getData = useGetData('products');

  const newProductsInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: image,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
    categoryID: newProductCategoryID,
  };

  function emptyInputs() {
    setNewProductTitle('');
    setNewProductPrice('');
    setNewProductCount('');
    setImage(null);
    setNewProductPopularity('');
    setNewProductSale('');
    setNewProductColors('');
  }

  const handleUploadImg = async (file) => {
    setImage(null);
    setImageSending(false);

    const formData = new FormData();
    formData.append('UPLOADCARE_PUB_KEY', '72b98d3ccdc0fea2db6f');
    formData.append('UPLOADCARE_STORE', '1');
    formData.append('file', file);

    try {
      const response = await axios.post('https://upload.uploadcare.com/base/', formData);
      let nameImg = response.data.file;
      let urlImg = `https://ucarecdn.com/${nameImg}/-/preview/`;
      if (nameImg) {
        setImage(urlImg);
      }
    } catch (error) {
      setImageSending(true);
    }
  };

  return (
    <div className="cms-main mt-[60px] p-5 rounded-3xl">
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

      <h1 className="cms-title text-xl md:text-[2em]">افزودن محصول جدید</h1>

      <form action="#" className="add-products-form mt-[30px] bg-white flex flex-col items-end p-5 rounded-[20px]">
        <div className="add-products-form-wrap w-full grid gap-x-[10px] gap-y-4 grid-cols-1fr md:grid-cols-2fr justify-items-center">
          <div className="add-products-form-group flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <VscSymbolNamespace />
            <input
              type="text"
              placeholder="اسم"
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value.slice(0, 25))}
            />
          </div>
          <div className="add-products-form-group  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <FaDollarSign />
            <input
              type="text"
              placeholder="قیمت"
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              value={newProductPrice.toLocaleString()}
              onChange={(event) => {
                if (!event.target.value.match(/[a-z]/g) && !event.target.value.match(/[A-Z]/g)) {
                  setNewProductPrice(Number(event.target.value.replace(/,/g, '')));
                } else {
                  setNewProductPrice(0);
                }
              }}
            />
          </div>
          <div className="add-products-form-group  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <MdOutlineInventory />
            <input
              type="text"
              placeholder="موجودی "
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              value={newProductCount.toLocaleString()}
              onChange={(event) => {
                if (!event.target.value.match(/[a-z]/g) && !event.target.value.match(/[A-Z]/g) && !event.target.value.match(/^[\u0600-\u06FF\s]+$/)) {
                  setNewProductCount(Number(event.target.value.replace(/,/g, '')));
                } else {
                  setNewProductCount(0);
                }
              }}
            />
          </div>
          <div className="add-products-form-group flex-row  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <MdInsertPhoto />
            <input
              type="file"
              placeholder="عکس"
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              // value={newProductImg}
              onChange={(event) => {
                handleUploadImg(event.target.files[0]);
              }}
            />
            {image && <img src={image} alt="image uploaded" className="w-10 max-h-10 rounded-md" />}
            {imageSending && <span className="text-red-600 w-52 text-[10px] font-extrabold">لطفا مجددا تلاش کنید.</span>}
          </div>
          <div className="add-products-form-group  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <FaStarHalfAlt />
            <input
              type="number"
              placeholder="میزان محبوبیت "
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              value={newProductPopularity}
              max={100}
              onChange={(event) => setNewProductPopularity(event.target.value)}
            />
          </div>
          <div className="add-products-form-group  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <FaChartColumn />
            <input
              type="text"
              placeholder="میزان فروش "
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              value={newProductSale.toLocaleString()}
              onChange={(event) => {
                if (!event.target.value.match(/[a-z]/g) && !event.target.value.match(/[A-Z]/g) && !event.target.value.match(/^[\u0600-\u06FF\s]+$/)) {
                  setNewProductSale(Number(event.target.value.replace(/,/g, '')));
                } else {
                  setNewProductSale(0);
                }
              }}
            />
          </div>
          <div className="add-products-form-group  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <IoMdColorPalette />
            <input
              type="text"
              placeholder="تعداد رنگ بندی "
              className="add-products-input font-yekanBakhLight font-bold outline-none border-none bg-transparent py-2 px-[10px] text-sm md:text-lg w-full"
              value={newProductColors.toLocaleString()}
              onChange={(event) => {
                if (!event.target.value.match(/[a-z]/g) && !event.target.value.match(/[A-Z]/g) && !event.target.value.match(/^[\u0600-\u06FF\s]+$/)) {
                  setNewProductColors(Number(event.target.value.replace(/,/g, '')));
                } else {
                  setNewProductColors(0);
                }
              }}
            />
          </div>

          <div className="add-products-form-group  flex items-center gap-x-[10px] w-[90%] bg-white-50 py-1 px-5 rounded-ten">
            <BiSolidCategoryAlt />
            <select
              className="font-yekanBakhLight font-bold outline-none border-none w-full bg-white-50 py-1 px-5"
              onChange={(e) => setNewProductCategoryID(e.target.value)}>
              {/* <option value={0}>دسته بندی</option> */}
              <option className="font-yekanBakhLight font-bold" value={1}>
                لوازم جانبی
              </option>
              <option className="font-yekanBakhLight font-bold" value={2}>
                عمومی
              </option>
              <option className="font-yekanBakhLight font-bold" value={3}>
                تبلت
              </option>
              <option className="font-yekanBakhLight font-bold" value={4}>
                مانیتور
              </option>
              <option className="font-yekanBakhLight font-bold" value={5}>
                موبایل
              </option>
              ک
              <option className="font-yekanBakhLight font-bold" value={6}>
                لپ تاپ
              </option>
              <option className="font-yekanBakhLight font-bold" value={7}>
                هنذفری و هدفون
              </option>
              <option className="font-yekanBakhLight font-bold" value={8}>
                وسایل گیمینگ
              </option>
              <option className="font-yekanBakhLight font-bold" value={9}>
                ساعت و بند هوشمند
              </option>
            </select>
          </div>
        </div>
        <button
          className="add-products-submit bg-orange-theme text-white mt-[10px] py-[10px] px-5 text-lg rounded-ten border-none outline-none"
          onClick={(e) => {
            e.preventDefault();
            if (
              newProductTitle &&
              newProductCategoryID &&
              newProductColors &&
              newProductCount &&
              image &&
              newProductPopularity &&
              newProductPrice &&
              newProductSale
            ) {
              postProduct.mutate({
                typePost: 'products',
                body: newProductsInfos,
                success: (emptyInputs(), getData.refetch(), toast.success('کالا با موفقیت افزوده شد')),
              });
            } else {
              toast.warning('لطفا همه فیلد هارا وارد کنید.');
            }
          }}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
