import React from 'react';
import Errorbox from '../ErrorBox/Errorbox';
export default function Offers() {
  return (
    <div className="mt-[60px] p-5">
      <h1 className="text-[2em]">لیست تخفیف ها</h1>
      <Errorbox msg="هیچ تخفیفی یافت نشد" />
    </div>
  );
}
