import React, { useEffect, useState } from 'react';
import Newproduct from '../Newproduct/Newproduct';
import ProductTable from '../ProductTable/ProductTable';
import useGetData from '../../ReactQuery/useGetData';
import { toast } from 'sonner';
export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const fetchProduct = useGetData('products');
  useEffect(() => {
    toast.warning('برای اضافه کردن محصول بهتر است از ابزار تغییر آیپی استفاده کنید');
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetchProduct.refetch();
    if (fetchProduct.isPending == false) {
      setAllProducts(fetchProduct.data);
    }
  };

  return (
    <>
      <Newproduct />
      <ProductTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </>
  );
}
