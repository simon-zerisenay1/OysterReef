import { PriceCard } from '@/components/PriceCard';
import Image from 'next/image';
import React from 'react';
import MeetingScheduler from '@/components/schedulePopup';
import data from '../priceData/data.json';

interface PriceCardData {
  title: string;
  price: string;
  description: string[];
}

const ServicesPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='m-20 flex justify-center'>
        <h1 className='text-white'>Services</h1>
      </div>
      <div className='flex flex-col p-20 items-center font-light bg-white min-h-screen'>
        <div className='w-full flex justify-end mb-10'>
          <MeetingScheduler />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10'>
          {data.map((card: PriceCardData) => (
            <PriceCard
              key={card.title}
              title={card.title}
              price={card.price}
              description={card.description}
            />
          ))}
        </div>
        <h1 className='text-blue-900 text-4xl mt-20'>
          "Reviving Oceans, Building Reefs"
        </h1>
        <div className='flex flex-col my-20 gap-10'>
          <h1 className='text-blue-950 md:min-w-[500px]'>Project Benefits</h1>
          <Image
            src={'/benefit.png'}
            alt='benefit'
            width={800}
            height={600}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col my-20 gap-10'>
          <h1 className='text-blue-950 mt-20'>Gallery</h1>
          <Image
            src={'/fish.png'}
            alt='fish'
            width={800}
            height={600}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col my-20 gap-32'>
          <h1 className='text-blue-950 mt-20'>OUR ARTIFICIAL REEFS</h1>
          <div className='flex flex-col md:flex-row gap-5'>
            <div>
              <h1 className='text-blue-950 text-2xl font-medium'>Eco Cement Reef</h1>
              <p className='py-3'>Our eco reefs are designed with sustainability and versatility in mind. Made from eco cement using oyster shells, these reefs are incredibly solid and ideal for supporting coral and seagrass growth. Their modular design allows for endless customization, enabling you to create various configurations to suit specific marine environments and project goals.</p>
              <p className='py-3'>Eco reefs provide a robust, eco-friendly solution to enhancing marine habitats and promoting biodiversity.</p>
            </div>
            <Image src='/eco.png' alt='Eco cement reef' width={600} height={600} />
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <div>
              <h1 className='text-blue-950 text-2xl font-medium'>Metal Reef</h1>
              <p className='py-3'>Our eco reefs are designed with sustainability and versatility in mind. Made from eco cement using oyster shells, these reefs are incredibly solid and ideal for supporting coral and seagrass growth. Their modular design allows for endless customization, enabling you to create various configurations to suit specific marine environments and project goals.</p>
              <p className='py-3'>Eco reefs provide a robust, eco-friendly solution to enhancing marine habitats and promoting biodiversity.</p>
            </div>
            <Image src='/metal.png' alt='Metal reef' width={600} height={600} />
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              <h1 className='text-blue-950 text-2xl font-medium'>Palm Reef</h1>
              <p className='py-3'>Our metal reefs combine modern innovation with traditional UAE techniques. These customizable metal structures are enhanced with oyster shells and specially dry palm leaves, creating a rich environment for marine life. This method, used in the UAE for centuries, effectively revitalizes ocean habitats, promoting coral and marine biodiversity.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <Image src='/palm1.png' alt='Palm reef' width={500} height={500} className='flex-initial w-1/3' />
              <Image src='/palm2.png' alt='Palm reef' width={500} height={500} className='flex-initial w-2/3' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
