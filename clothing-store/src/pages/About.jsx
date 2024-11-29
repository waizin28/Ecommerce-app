import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1='ABOUT' text2='US' />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt=''
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            exercitationem nostrum quo eos itaque!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
            autem perspiciatis aliquid quis dolorum expedita accusamus a eveniet
            est veritatis, tempora optio velit! Dolores consectetur, ipsam in
            expedita deserunt labore.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
            iste! Deleniti tempora incidunt nesciunt iste nisi neque eius, id
            nemo, explicabo eum molestiae corrupti, libero sapiente harum at
            ducimus. Pariatur.
          </p>
        </div>
      </div>

      <div className='text-2xl py-4'>
        <Title text1='WHY' text2='CHOOSE US' />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
            molestiae quidem deleniti facere rem delectus aliquid, expedita
            aliquam earum!
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam sed
            unde perspiciatis alias, delectus perferendis voluptas.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            commodi beatae vitae soluta sint ipsum repellat doloribus assumenda
            voluptates!
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
