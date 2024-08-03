import React, { useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function EditModal({ children, onClose, onSubmit }) {
  useEffect(() => {
    const checkCode = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener('keydown', checkCode);

    return () => window.removeEventListener('keydown', checkCode);
  });

  return (
    <div className="backGroundModal activeModal">
      <form className=" w-[350px] p-[30px] bg-white flex flex-col items-center relative rounded-ten overflow-auto">
        <IoIosCloseCircleOutline className="text-orange-theme absolute cursor-pointer top-4 left-3" onClick={() => onClose()} />
        <h1 className="mb-2">لطفا اطلاعات جدید را وارد نمایید</h1>
        {children}
        <button className=" py-2 px-[10px] w-full mt-5 bg-orange-theme text-white border-none outline-none text-lg rounded-md" onClick={onSubmit}>
          ثبت اطلاعات جدید
        </button>
      </form>
    </div>
  );
}
