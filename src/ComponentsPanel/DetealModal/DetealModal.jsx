import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function DetealModal({ onHide, children }) {
  useEffect(() => {
    const checkCode = (event) => {
      if (event.keyCode === 27) {
        onHide();
      }
    };

    window.addEventListener('keydown', checkCode);

    return () => window.removeEventListener('keydown', checkCode);
  });

  return ReactDOM.createPortal(
    <div className="backGroundModal activeModal">
      <div className="p-[30px] bg-white rounded-ten relative text-xl">
        <IoIosCloseCircleOutline className="text-orange-theme absolute cursor-pointer top-4 left-3" onClick={() => onHide()} />
        <div className="bg-white mt-[10px] rounded-ten w-full">{children}</div>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
