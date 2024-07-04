import { ARCREEF_PROTOTYPES } from '@/constants/archreef';
import { kMaxLength } from 'buffer';
import Image from 'next/image';
import React from 'react';

const PrototypesPage = () => {
  return (
    <div className='flex flex-col'>
      <div className=' m-20 flex justify-center'>
        <h1 className='text-white'>
          Deployed artificial reef structure prototypes
        </h1>
      </div>
      <div className='flex flex-col p-20 items-center font-light bg-white  '>
        <div className='constrained-div flex flex-col  mb-20 gap-32'>
          {ARCREEF_PROTOTYPES.map((item, index) => (
            <div
              className='flex flex-col flex-1 border border-slate-200  items-start xl:flex-row '
              key={index}
            >
              <div className='flex flex-col flex-1 m-4'>
                <h2 className='font-bold text-xl my-2 text-blue-950'>
                  {index + 1}. {item.title}
                </h2>

                <p>{item.description}</p>
              </div>
              <Image
                src={item.scrImage}
                alt='prototype'
                height={kMaxLength}
                width={kMaxLength}
                className='w-full h-full flex object-cover container  flex-1 xl:max-w-[700px]'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrototypesPage;
