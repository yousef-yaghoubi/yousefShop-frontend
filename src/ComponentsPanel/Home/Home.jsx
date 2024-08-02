import React from 'react';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { BsBagCheck } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    name: 'فروردین',
    pv: 2400,
    amt: 2210,
  },
  {
    name: 'اردیبهشت',
    pv: 1398,
    amt: 2400,
  },
  {
    name: 'خرداد',
    pv: 7600,
    amt: 2290,
  },
  {
    name: 'تیر',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'مرداد',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'شهریور',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'مهر',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'آبان',
    pv: 1000,
    amt: 2100,
  },
  {
    name: 'آذر',
    pv: 4900,
    amt: 2100,
  },
  {
    name: 'دی',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'بهمن',
    pv: 9500,
    amt: 2100,
  },
  {
    name: 'اسفند',
    pv: 3400,
    amt: 2100,
  },
];

export default function Home() {
  return (
    <div className="divHome flex flex-col xl:flex-row justify-around items-center">
      <div className="mianHome flex flex-col  w-full items-center">
        <div className="ParentMianChild flex flex-col md:flex-row justify-around w-full">
          <div className="mainChid w-full md:w-[45%]  h-24 bg-orange-theme border-2 border-solid border-white mt-4 md:mt-12 rounded-ten flex items-center flex-col justify-evenly">
            <div className="firstMainChid rounded-md w-[95%] h-12 bg-white flex justify-between text-lg text-orange-theme items-center">
              <div className="mr-4">
                <span className=" text-3xl text-black">7</span>محصول قابل فروش
              </div>
              <NavLink to={'/products'} className="text-xl px-4 flex justify-center flex-col text-orange-theme items-center p-0 bg-white">
                <MdOutlineProductionQuantityLimits />
              </NavLink>
            </div>
          </div>
          <div className="mainChid  w-full md:w-[45%] h-24 bg-orange-theme border-2 border-solid border-white mt-4 md:mt-12 rounded-ten flex items-center flex-col justify-evenly">
            <div className="firstMainChid rounded-md w-[95%] h-12 bg-white flex justify-between text-lg text-orange-theme items-center">
              <div className="mr-4">
                <span className=" text-3xl text-black">7</span>سفارش جدید
              </div>

              <NavLink to={'/orders'} className="text-xl px-4 flex justify-center flex-col text-orange-theme items-center p-0 bg-white">
                <BsBagCheck />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="parentChart m-0 mt-4 md:mt-20 md:mr-6 w-fit">
          <LineChart
            className="chart border-solid border-2 border-orange-theme rounded-2xl bg-white !w-full h-auto"
            width={770}
            height={350}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#ff9100" activeDo t={{ r: 12 }} />
          </LineChart>
        </div>
      </div>

      <div className="mainChid subMainChid flex flex-col w-full sm:w-96 h-[35em]   bg-orange-theme border-2 border-solid border-white mt-12 rounded-ten items-center justify-evenly">
        <div className="firstMainChid rounded-md  w-[95%] h-[95%] bg-white flex flex-col justify-around text-lg text-orange-theme items-center">
          <div>
            <span className="text-black text-8xl">7</span>کاربر ثبت شده
          </div>
          <Link to={'/users'} className="h-[15%] text-xl flex justify-center flex-col text-orange-theme w-[91%] items-center p-0  bg-white">
            <FiUsers />
          </Link>
        </div>
      </div>
    </div>
  );
}
