
import { useState } from 'react';
import sneaker from '../images/sneaker.jpg'
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import SocialIcon from './SocialIcon';

export default function Footer() {

  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [expandedC, setExpandedC] = useState(false);

  return (
    <>
    <div className=' sm:hidden relative flex flex-col w-full mt-10'>
      <div className='w-5/6 h-[2px] bg-gray-200 rounded-xl mx-auto'/>
      <div className='w-5/6 mx-auto my-5 flex flex-row '>
        <img
        src={sneaker}
        alt='icon'
        className='w-[100px] h-[100px] my-auto'
        />
        <p className='my-auto'>
          <span className='font-bold uppercase text-blue-500'>Shoppy <br/></span>
          <span>Your Ultimate Destination for Sport Shoes</span>
          </p>
      </div>

<div
      onClick={() => setExpandedC(!expandedC)}
      className="w-5/6 mx-auto border-b-2 rounded-lg p-4 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">Categories</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${expandedC ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {expandedC && (
        <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
          <a className='hover:underline ' href=''>
            Shoes
          </a>
          <a className='hover:underline ' href=''>
           Clothing
          </a>
          <a className='hover:underline ' href=''>
            Promotion
          </a>
        </div>
      )}
    </div>

      <div
      onClick={() => setExpanded(!expanded)}
      className="w-5/6 mx-auto border-b-2 rounded-lg p-4 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">Resources</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {expanded && (
        <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
          <a className='hover:underline ' href=''>
            Become A Member
          </a>
          <a className='hover:underline ' href=''>
            Product Advice
          </a>
          <a className='hover:underline ' href=''>
            Send Us Feedback
          </a>
        </div>
      )}
    </div>

    <div
      onClick={() => setExpanded1(!expanded1)}
      className="w-5/6 mx-auto border-b-2 rounded-lg p-4 cursor-pointer transition-all mb-5"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">Company</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${expanded1 ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {expanded1 && (
        <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
          <a className='hover:underline ' href=''>
            About Shoppy
          </a>
          <a className='hover:underline ' href=''>
            News
          </a>
          <a className='hover:underline ' href=''>
            Careers
          </a>
          <a className='hover:underline ' href=''>
            Impact
          </a>
        </div>
      )}
    </div>


       <div className='flex w-full flex-col bottom-2 my-5 text-center  '>
         &copy; {new Date().getFullYear()} Shoppy . All rights reserved.
         </div>
     
    </div>


    <div className='mt-10 hidden sm:flex flex-col w-full'>
    <div className='w-5/6 h-[2px] bg-gray-200 rounded-xl mx-auto'/>

    <div className='w-5/6 mx-auto justify-center my-5 flex flex-row '>
        <img
        src={sneaker}
        alt='icon'
        className='w-[100px] h-[100px] my-auto'
        />
        <div className='my-auto flex flex-col'>
        <p className=''>
          <span className='font-bold uppercase text-blue-500'>Shoppy <br/></span>
          <span>Your Ultimate Destination for Sport Shoes</span>
          </p>
          <div className='flex flex-row gap-2'>
            <SocialIcon href='https://www.nike.com/my/w/mens-bags-backpacks-9xy71znik1'>
            <FaFacebookSquare  className='cursor-pointer mt-1 size-7 '/>
            </SocialIcon>

            <SocialIcon href='https://www.nike.com/my/w/mens-bags-backpacks-9xy71znik1'>
            <FaInstagramSquare  className='cursor-pointer mt-1 size-7 '/>
            </SocialIcon>

            <SocialIcon href='https://www.nike.com/my/w/mens-bags-backpacks-9xy71znik1'>
            <FaWhatsappSquare   className='cursor-pointer mt-1 size-7'/>
            </SocialIcon>
                         
          </div>
          </div>
      </div>

      <div className='my-5 flex flex-row w-5/6 justify-evenly mx-auto  items-start '>
        <div className='flex flex-col'>

          <span className='text-md mb-2 font-semibold'>Categories</span>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>Shoe</a>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>Clothing</a>
          <a href='' className='hover:underline opacity-50 text-sm'>Promotion</a>
        </div>
        <div className='flex flex-col'>
            
            <span className='text-md mb-2 font-semibold'>Resources</span>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>Become A Member</a>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>Product Advice</a>
          <a href='' className='hover:underline opacity-50 text-sm'>Send Us Feedback</a>
          </div>
          <div className='flex flex-col'>
            
            <span className='text-md mb-2 font-semibold'>Company</span>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>About Shoppy</a>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>News</a>
          <a href='' className='hover:underline opacity-50 text-sm mb-1'>Careers</a>
          <a href='' className='hover:underline opacity-50 text-sm'>Impact</a>
          </div>
      </div>

    <div className='flex w-full flex-col bottom-2 mt-10 mb-5 text-center  '>
         &copy; {new Date().getFullYear()} Shoppy . All rights reserved.
         </div>
    </div>
    </>
  )
}

