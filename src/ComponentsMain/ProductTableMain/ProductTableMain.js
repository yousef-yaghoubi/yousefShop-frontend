import React, { useContext, useEffect } from "react";
import Product from "../Product/Product";
import { productContext } from "../../Context/ContxtMain";
function ProductTableMain({ addtocart }) {
  const allProduct = useContext(productContext)
  useEffect(() => {
    if (allProduct !== undefined) {
      allProduct.forEach(element => {
        Object.assign(element, { quantity: 1 })
      });
    }
  }, [allProduct])


  return (
    <section className=" h-auto w-full flex flex-wrap flex-row my-12">
      <div className=" flex flex-wrap flex-row w-full ">

        {allProduct && (
          allProduct?.map((product) => (

            <Product
              key={product.id}
              img={product.img}
              title={product.title}
              price={product.price}
              allProduct={allProduct}
              productt={product}
              cart={() => addtocart(product)}
            />

          ))
        )}
      </div>
    </section>
  );
}

export default ProductTableMain;
