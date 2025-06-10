import React from 'react'
import sneaker from '../images/sneaker.jpg'
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

const Header = () => {

 const [expanded, setExpanded] = useState(false);

   let userId: number | null = null;
   const token = localStorage.getItem('token');
       if (token) {
       const decoded = jwtDecode<DecodedToken>(token);
       userId = decoded.id;
       }

  return (
    <div>

    <div className="w-full h-[40px] bg-white overflow-hidden">
        <div className="flex items-center justify-between h-full px-4">
            <img
            src={sneaker}
            alt="logo"
            className='h-full object-cover w-[40px] cursor-pointer'
            />


          <ul className="hidden sm:flex gap-8 text-sm font-medium mx-auto text-gray-600">
                <li>
                  <Link to="/" className="hover:text-black">Home</Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-black">Product</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-black">Careers</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-black">About Us</Link>
                </li>
              </ul>



             <div className="flex  space-x-3">
            <VscAccount  
             onClick={() => setExpanded(!expanded)}
            className='w-[25px] h-1/2 my-auto text-blue-400 cursor-pointer'/>

                  {expanded && (
              <div className="rounded-xl bg-gray-300 opacity-80 p-2 flex flex-col absolute z-10 gap-2 mt-8 text-sm ">
               <Link to="/login" className="hover:underline">
                  Log in
                </Link>
                <div className="h-[1px] bg-gray-100 w-5/6 rounded-xl" />
                <Link to="/register" className="hover:underline">
                  Sign up
                </Link>
                <div className="h-[1px] bg-gray-100 w-5/6 rounded-xl" />
                <button onClick={logout}>Log out</button>
              
              </div>
            )}

            <Link to={`/cart/${userId}`} className=''>
            <IoCartOutline    
            className='w-[30px] h-full my-auto text-blue-400 cursor-pointer'/>
            </Link>

            <div className="sm:hidden my-auto">
          {/* You can plug in a hamburger menu icon here */}
          <button>
            <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
            </div>
        </div>
        
        
    </div>

    <div className="w-full bg-blue-100 overflow-hidden">
    <div className="animate-marquee  whitespace-nowrap text-black py-2">
      <span className="mx-4">Welcome to Shoppy — your one-stop destination for the latest in style and comfort.  </span>
     <span>Enjoy free shipping on all purchases of RM99.00 and above, exclusively for our valued members!</span>
    </div>
  </div>

  


  </div>
   
  )
}

export default Header