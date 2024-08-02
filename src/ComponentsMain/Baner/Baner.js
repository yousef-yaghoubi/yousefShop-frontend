import React from 'react'

function Baner({titleH, titleSpan, tel1, tel2, clas, clasTitle, src}) {
  return (
    <section className=' h-64 w-full overflow-hidden  py-8 flex flex-col items-center'>
      <div className=' w-full h-48'>
        <div className=' flex-row bg-white items-center  w-full h-full rounded-2xl flex justify-center relative '>
          <section className='flex w-full h-full px-6 md:p-8 items-center justify-evenly md:justify-around shadow-custom before:absolute before:w-[0.7em] before:h-16 before:md:w-4 before:md:h-20 before:right-0 before:text-center  before:rounded-e-md before:bg-orange-500'>  
            <div className=' h-full sm:w-auto md:w-auto flex justify-around flex-col !w-full'>
              <h1 className={` text-sm sm:text-lg md:text-xl lg:text-2xl font-yekanBakhBlack ${clasTitle}`}>
              {titleH}
              <img src={src} className='w-24'/>
              </h1>
              <span className={`hidden md:flex text-lg font-extrabold font-yekanBakhLight text-white-60 ${clas}`}>
              {titleSpan}
              </span>
            </div>
            <div className={`flex h-20 w-1/2 sm:w-auto md:text-xl justify-around text-sm items-center flex-col font-yekanBakhBlack text-white-70 ${clas}`}>
              <h2>{tel1}</h2>
              <h2>{tel2}</h2>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Baner
