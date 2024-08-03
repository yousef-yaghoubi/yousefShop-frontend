import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {IoIosCloseCircleOutline} from'react-icons/io'
function AddComment({onClose, children}) {
    useEffect(() => {
        const checkCode = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        window.addEventListener("keydown", checkCode);

        return () => window.removeEventListener("keydown", checkCode);
    },[]);     

    return ReactDOM.createPortal(
        <div className="backGroundModal activeModal z-30">
            <div className="p-[30px] bg-white rounded-ten relative text-xl">
                <IoIosCloseCircleOutline className="text-orange-theme absolute cursor-pointer top-4 left-3" onClick={() => onClose  ()} />
                <div className="bg-white mt-[10px] rounded-ten w-full">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default AddComment
