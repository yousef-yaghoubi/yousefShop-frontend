import React from 'react';

const BtnMenu = ({ clas, children }) => {
  return (
    <div>
      <div
        className={`w-[1.5em] h-[1.5em] sm:w-[2em] sm:h-[2em] bg-white  rounded-full items-center justify-center cursor-pointer text-xl text-orange-theme ${clas} xs:flex`}>
        {children}
      </div>
    </div>
  );
};

export default BtnMenu;
