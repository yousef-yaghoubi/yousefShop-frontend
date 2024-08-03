import React, { useEffect, useState } from 'react';
import ThreeZero from '../../ThreeZero';
import DeleteModal from '../DeleteModal/DeleteModal';
import DetealModal from '../DetealModal/DetealModal';
import EditModal from '../EditModal/EditModal';
import { VscSymbolNamespace } from 'react-icons/vsc';
import { FaStarHalfAlt, FaDollarSign } from 'react-icons/fa';
import { FaChartColumn } from 'react-icons/fa6';
import { MdOutlineInventory, MdInsertPhoto } from 'react-icons/md';
import { IoMdColorPalette } from 'react-icons/io';
import Errorbox from '../ErrorBox/Errorbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetData from '../../ReactQuery/useGetData';

export default function ProductTable({ getAllProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetealModal, setIsShowDetealModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState(null);
  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCount, setNewProductCount] = useState('');
  const [newProductImg, setNewProductImg] = useState('');
  const [newProductPopularity, setNewProductPopularity] = useState('');
  const [newProductSale, setNewProductSale] = useState('');
  const [newProductColors, setNewProductColors] = useState('');
  const fetchProduct = useGetData('products');

  useEffect(() => {
    if (fetchProduct.data) {
      setAllProducts(fetchProduct.data);
    }
  }, [fetchProduct.data]);

  const deleteSubmit = async () => {
    await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    }).then((res) => {
      if(res.status == 200){
        fetchProduct.refetch();
        setIsShowDeleteModal(false);
      }
    });
  };

  const EditModalSubmitAction = (event) => {
    event.preventDefault();
    const newProductInfos = {
      title: newProductTitle,
      price: newProductPrice,
      count: newProductCount,
      img: newProductImg,
      popularity: newProductPopularity,
      sale: newProductSale,
      colors: newProductColors,
    };

    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProducts();
        setIsShowEditModal(false);
      });
  };

  return (
    <>
      <h1 className=" text-xl md:text-[2em] mr-2">محصولات موجود</h1>
      {fetchProduct.data ? (
        <TableContainer component={Paper} className=" mt-8">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  عکس
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  اسم
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  قیمت
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  موجودی
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  بیشتر
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts?.map((product) => (
                <TableRow className="flex flex-row items-center" key={product.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" className=" !font-yekanBakhBlack  !w-1/4">
                    <img src={product.img} alt="picture" className=" w-28 m-auto min-w-24" />
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    {product.title}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    <ThreeZero Number={product.price} /> تومان
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    {product.count}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !flex flex-row !w-fit !h-36 items-center">
                    <button
                      className="products-table-btn h-12 py-2 px-5 text-lg rounded-ten text-white bg-orange-theme mr-5 border-none outline-none"
                      onClick={() => {
                        setIsShowDetealModal(true);
                        setMainProductInfos(product);
                      }}>
                      جزییات
                    </button>
                    <button
                      className="products-table-btn h-12  py-2 px-5 text-lg rounded-ten text-white bg-orange-theme mr-5 border-none outline-none"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setProductId(product.id);
                      }}>
                      حذف
                    </button>
                    <button
                      className="products-table-btn h-12  py-2 px-5 text-lg rounded-ten text-white bg-orange-theme mr-5 border-none outline-none"
                      onClick={() => {
                        setIsShowEditModal(true);
                        setProductId(product.id);
                        setNewProductTitle(product.title);
                        setNewProductPrice(product.price);
                        setNewProductCount(product.count);
                        setNewProductImg(product.img);
                        setNewProductPopularity(product.popularity);
                        setNewProductSale(product.sale);
                        setNewProductColors(product.colors);
                      }}>
                      ویرایش
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Errorbox msg="هیچ محصولی یافت نشد" />
      )}
      {isShowDeleteModal && (
        <DeleteModal modalShow={deleteSubmit} modalNotShow={() => setIsShowDeleteModal(false)}>
          <h1 className=" text-[1.3rem]">آیا از حذف اطمینان دارید؟</h1>
        </DeleteModal>
      )}
      {isShowDetealModal && (
        <DetealModal onHide={() => setIsShowDetealModal(false)}>
          <table>
            <thead>
              <tr className="flex flex-row justify-around">
                <td className="p-5 flex items-center" align="center">
                  محبوبیت
                </td>
                <td className="p-5 flex items-center" align="center">
                  فروش
                </td>
                <td className="p-5 flex items-center" align="center">
                  رنگ بندی
                </td>
              </tr>
            </thead>

            <tbody>
              <tr className="flex flex-row justify-around">
                <td className="p-5 flex items-center" align="center">
                  {mainProductInfos.popularity}
                </td>
                <td className="p-5 flex items-center" align="center">
                  {<ThreeZero Number={mainProductInfos.sale} />} تومان
                </td>
                <td className="p-5 flex items-center" align="center">
                  {mainProductInfos.colors}
                </td>
              </tr>
            </tbody>
          </table>
        </DetealModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={EditModalSubmitAction}>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <VscSymbolNamespace />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              value={newProductTitle}
              onChange={(e) => {
                setNewProductTitle(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <FaDollarSign />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="قیمت جدید را وارد کنید"
              value={newProductPrice}
              onChange={(e) => {
                setNewProductPrice(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <MdOutlineInventory />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              value={newProductCount}
              onChange={(e) => {
                setNewProductCount(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <MdInsertPhoto />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="آدرس عکس جدید را وارد کنید"
              value={newProductImg}
              onChange={(e) => {
                setNewProductImg(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <FaStarHalfAlt />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="میزان محبوبیت جدید را وارد کنید"
              value={newProductPopularity}
              onChange={(e) => {
                setNewProductPopularity(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <FaChartColumn />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              value={newProductSale}
              onChange={(e) => {
                setNewProductSale(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
            <span>
              <IoMdColorPalette />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="تعداد رنگ بندی جدید را وارد کنید"
              value={newProductColors}
              onChange={(e) => {
                setNewProductColors(e.target.value);
              }}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
