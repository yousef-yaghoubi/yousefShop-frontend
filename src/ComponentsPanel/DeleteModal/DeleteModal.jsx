import React from 'react';
import ReactDOM from 'react-dom';

export default function DeleteModal({ modalShow, modalNotShow, children }) {
  return ReactDOM.createPortal(
    <div className="backGroundModal activeModal">
      <div className="bg-white px-20 py-16 flex flex-col items-center rounded-ten w-96">
        {children}
        <div className=" w-[70%] flex justify-between mt-16">
          <button className="bg-orange-theme text-white w-16 h-12 border-none outline-none rounded-md text-xl" onClick={() => modalShow()}>
            بله
          </button>
          <button className="bg-white-50 w-16 h-12 border-none outline-none rounded-md text-xl" onClick={() => modalNotShow()}>
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
