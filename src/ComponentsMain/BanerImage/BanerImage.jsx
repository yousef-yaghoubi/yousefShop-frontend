import React from 'react';
import { Link } from 'react-router-dom';

function BanerImage() {
  return (
    <section className="w-full h-auto">
      <div className="w-full flex flex-col md:flex-row h-full justify-evenly ">
        <Link to={'http://t.me/yousef_1307'} className="h-full w-full p-4 flex justify-center">
          <img
            src="https://ucarecdn.com/b0db5f24-4a14-486e-adb1-81f38f57c03b/-/preview/645x387/"
            alt="telegram"
            className="w-[250px] h-[150px] lg:w-[420px] lg:h-[200px] xl:w-[500px] xl:h-[300px]"
          />
        </Link>

        <Link to={'http://t.me/yousef_1307'} className="h-full w-full p-4 flex justify-center">
          <img
            src="https://ucarecdn.com/94c29938-956c-492b-ac80-3fd3e2df523a/-/preview/500x300/"
            alt="whatsapp"
            className="w-[250px] h-[150px] lg:w-[420px] lg:h-[200px] xl:w-[500px] xl:h-[300px]"
          />
        </Link>
      </div>
    </section>
  );
}

export default BanerImage;
