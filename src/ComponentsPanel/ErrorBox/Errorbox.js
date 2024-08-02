import React from 'react';

export default function Errorbox({ msg }) {
  return <div className=" text-[2rem] bg-red-600 mt-5 p-5 items-center text-white w-[98%]">{msg}</div>;
}
