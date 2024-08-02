import React from 'react';

function Specifications({ title, count }) {
  return (
    <div className=" bg-slate-100 p-4 rounded-lg mt-4">
      <h2 className=" font-yekanBakhLight font-bold text-sm md:text-base">{title}</h2>
      <span className=" font-yekanBakhLight font-light text-xs">{count}</span>
    </div>
  );
}

export default Specifications;
