import React, { useState } from 'react'
import Header from '../components/Header'

const timelineData = [
    { year: '2018', content: 'Founded in a garage in Kuala Lumpur.' },
    { year: '2019', content: 'Launched our first running shoe line.' },
    { year: '2021', content: 'Expanded into activewear and accessories.' },
    { year: '2024', content: 'Reached 10,000+ happy customers across Southeast Asia.' },
  ];

const AboutUs = () => {

    const [divIndex, setDivIndex] = useState(0)

  return (
    <>
    <Header/>
    <div className='w-full'>
        <div className='w-full '>
            <p className='ml-4 my-4 md:ml-14 text-6xl font-semibold'>About Us</p>
            <p className='mx-auto mb-4 text-3xl text-center font-semibold mt-16'>Fueling Your Every Move </p>
            <p className='text-center mx-auto w-11/12'>Founded in 2018 by lifelong athlete and designer Jake Lin, Shoppy began as a small passion project in a garage — with a single mission:

                <span className='text-orange-500 font-bold text-lg'>{' '}To create performance-driven sportswear that empowers people to move freely and confidently.{' '}</span> 
                Jake believed that great athletic gear shouldn't just be for professionals. It should be for everyone who moves — runners, gym-goers, hikers, cyclists, and weekend adventurers. What started with a few prototypes of lightweight running shoes quickly grew into a full line of high-performance footwear, apparel, socks, and backpacks, now trusted by thousands.

                </p>

            <p className='mx-auto mb-4 mt-16 text-3xl text-center font-semibold'>Our Purpose</p>
            <p  className='w-11/12 mx-auto my-4 text-2xl  text-orange-500 font-bold text-center'>To make sportswear that empowers people to feel confident, capable, and ready to take on anything💪</p>
            <p className='ml-4 w-11/12 text-center mb-16'>We exist to support your active lifestyle — with gear that delivers on comfort, durability, and style. Whether you're chasing a new personal best or simply enjoying a walk outdoors, we want our products to help you feel your best, every step of the way.</p>

            <p className='ml-4 my-4 text-3xl font-semibold text-center'> More Than Just Gear</p>
            <p className='ml-4 w-11/12 mb-16 text-center'>We believe in building a community of movers, doers, and dreamers. Through quality, service, and a shared love for movement, we aim to inspire a lifestyle where health, confidence, and purpose go hand in hand.
                Thank you for choosing Shoppy.
                Let’s move forward, together.</p>

                <p className='text-center my-4 text-3xl font-semibold'>👣 From Then to Now</p>

                <div className="w-full max-w-xl mx-auto text-center overflow-hidden relative">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${divIndex * 100}%)` }}
      >
        {timelineData.map((item, index) => (
          <div key={index} className=" w-full mx-auto flex-shrink-0 px-4">
            <div className='w-11/12 mx-auto bg-orange-300  rounded-lg'>
            <h2 className="text-2xl font-bold mb-2 p-4">{item.year}</h2>
            <p className="text-gray-600 p-4">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-3 my-6">
        {timelineData.map((_, index) => (
          <button
            key={index}
            onClick={() => setDivIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === divIndex ? 'bg-black scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
        </div>
    </div>
    </>
  )
}

export default AboutUs