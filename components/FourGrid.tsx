import React from 'react';

// Define the GridItemProps interface
interface GridItemProps {
  title: string;
  description: string;
  image: string;
}

// Define the GridItem component
export function GridItem({ title, description, image }: GridItemProps) {
  return (
    <div className='flex flex-col w-full justify-start items-stretch gap-5 p-5 border rounded-md'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='text-lg'>{description}</p>
      <img src={image} alt='image' className='w-full h-64 object-cover' /> {/* Fixed height for consistency */}
    </div>
  );
}

// Define the FourGrid component
const FourGrid = ({ data }: any) => {
  return (
    <div className='flex flex-col w-full justify-between items-stretch gap-20 my-20'>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='flex-1'>
          <GridItem title={data[0].title} description={data[0].description} image={data[0].image} />
        </div>
        <div className='flex-1'>
          <GridItem title={data[1].title} description={data[1].description} image={data[1].image} />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='flex-1'>
          <GridItem title={data[2].title} description={data[2].description} image={data[2].image} />
        </div>
        <div className='flex-1'>
          <GridItem title={data[3].title} description={data[3].description} image={data[3].image} />
        </div>
      </div>
    </div>
  );
};

export default FourGrid;