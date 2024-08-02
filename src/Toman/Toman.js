import React, { memo } from 'react';

const Toman = memo(({ clas }) => {
    return (
      <div className={`${clas} flex flex-col relative h-10 w-4 justify-around items-center text-[10px] md:text-xs mr-2`}>
        <span className=" absolute top-0 left-0 font-bold">ن</span>
        <span className="absolute bottom-2 left-0 font-bold">توما</span>
      </div>
    );
  },
  (prevProps, newProps) => {
    if (prevProps.clas === newProps.clas) {
      return true;
    }
    return false;
  },
);

export default Toman;
