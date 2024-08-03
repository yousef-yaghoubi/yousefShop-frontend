import React from 'react';

function NavProduct({ src, title }) {
  return (
    <div className="flex flex-col lg:flex-row md:w-max w-28 items-center">
      <img src={src} alt="nav icon" className=" w-10" />
      <span className=" text-[10px] md:text-xs md:font-bold font-semibold text-neutral-600">{title}</span>
    </div>
  );
}

export default NavProduct;
