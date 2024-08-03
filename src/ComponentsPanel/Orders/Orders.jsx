import React from 'react';
import Errorbox from '../ErrorBox/Errorbox';
export default function Orders() {
  return (
    <div className="mt-[60px] p-5">
      <h1 className="text-[2em]">لیست سفارش ها</h1>
      <Errorbox msg="هیچ سفارشی یافت نشد" />
    </div>
  );
}
