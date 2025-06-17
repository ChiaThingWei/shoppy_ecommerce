import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { response } from 'express';

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Dashboard = () => {


  const [order, setOrder] = useState<Order[]>([])
   const [product, setProduct] = useState<ProductType[]>()
        const [page, setPage] = useState(1)
        const [limit, setLimit] = useState(5)
        const [search, setSearch] = useState('')
        const [totalPages, setTotalPages] = useState()
        const [totalOrders, setTotalOrders] = useState()
        const [totalAmount, setTotalAmount] = useState(0);
        const [totalProduct, setTotalProduct] = useState()
        const [totalUser, setTotalUser] = useState()

    useEffect(()=>{

        const fetchOrder = async() =>{

          try{
          const response =  await axios.get('http://localhost:3000/api/order/',{
            params:{page,limit,search}
          })

          setOrder(response.data.orders)
          setTotalOrders(response.data.totalOrders)
          setTotalAmount(response.data.totalAmount)
          }catch(err){
            alert('不能get啊')
            console.error('fail to fetch order', err)
          }

        }

        fetchOrder()
    },[page,limit,search])

    useEffect(()=>{

      const fetchProduct = async() =>{

          try{
              const res = await axios.get("http://localhost:3000/api/products",{
                  params:{page,limit,search}
              })  
            
              setTotalProduct(res.data.totalProducts)
          
            
          }catch(err){
              console.error('fail to fetch users', err)
          }
      }

      fetchProduct()
      
      },[limit,page,search,product])

      useEffect(()=>{
        const fetchUsers = async() =>{
            try{
                const res = await axios.get("http://localhost:3000/api/users/",{
                    params:{page,limit, search}
                })
                console.log(res.data)
                
                setTotalUser(res.data.totalUsers)
            }catch(err){
                console.error('fail to fetch users', err)
            }
        }
    
            fetchUsers()
        },[page,limit, search])

  return (
    <>
    <Sidebar/>
    <div className=' flex flex-col ml-auto w-5/6'>
    
      <p className='text-3xl font-semibold ml-4 mt-4'>Admin Dashboard</p>

    <div className='grid grid-cols-2 gap-4 w-11/12 mx-auto my-10'>
      <div className='bg-slate-200 rounded-md w-full '>
        <p className='ml-2 mt-2 font-bold'>Total Customer's Orders</p>
         <p className='text-center font-semibold text-3xl my-6'>{totalOrders}</p>
         
      </div>

      <div className='bg-orange-200 rounded-md w-full '>
        <p className='ml-2 mt-2 font-bold'>Total Sales Hit</p>
        
         <p className='my-6 text-center font-semibold text-3xl'>RM {totalAmount}</p>
        
      </div>

      <div className='bg-blue-200 rounded-md w-full '>
        <p className='ml-2 mt-2 font-bold'>Total Products</p>
        
         <p className='my-6 text-center font-semibold text-3xl'> {totalProduct}</p>

      </div>


      <div className='bg-red-200 rounded-md w-full '>
        <p className='ml-2 mt-2 font-bold'>Total Active Users</p>
        
         <p className='my-6 text-center font-semibold text-3xl'> {totalUser}</p>

      </div>
     </div>

      <div className='w-11/12 mx-auto'>
      <p className='font-semibold text-2xl'>Admin News Board</p>
      <div className='bg-orange-100 h-[200px] rounded'>

        <p className='p-4'>All admin kindly reminded that please clear all the orders that fail to make the payment</p>
      </div>
      </div>

    </div>
    </>
  )
}

export default Dashboard