import React from 'react'
import sneaker from '../../images/sneaker.jpg'
import { RxDashboard } from "react-icons/rx";
import { IoReceiptOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className=' top-0 left-0 fixed w-1/6 flex inset-0'>
        <div className=' flex flex-col mr-auto w-full bg-blue-200'>

          
                <img
                src={sneaker}
                alt='logo'
                className='opacity-50 h-24 md:h-28 object-cover'
                />

                <Link to='/admin' className='py-4 border-b-2 flex w-full justify-evenly'>
                <RxDashboard className='my-auto ' />
                    Dashboard</Link>

                <Link to='/admin/product' className='py-4 border-b-2 flex w-full justify-evenly'>
                <MdOutlineLocalGroceryStore className='my-auto '/>
                    Products</Link>

                <Link to='/admin/order' className='py-4 border-b-2 flex w-full justify-evenly'>
                <IoReceiptOutline className='my-auto '/>
                   Order</Link>

                <Link to='/admin/users' className='py-4 border-b-2 flex w-full justify-evenly'>
                <FaRegUser className='my-auto '/>
                Users</Link>

                <Link to='' className='py-4 border-b-2 flex w-full justify-evenly'>
                <CiSettings className='my-auto size-6'/>
                Setting</Link>

                <Link to='/' className='mt-auto mx-auto py-4 px-4 border bg-orange-300'>
                
                User site</Link>
               
           
        </div>
    </div>
  )
}

export default Sidebar