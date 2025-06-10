import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

type OrderItem = {
  order_item_id: number
  product_id: number
  product_name:string
  price: number
  quantity: number
  subtotal: number
}

type Order = {
  order_id:number
  user_id:number
  user_name:string
  total_price:number
  status:boolean
  created_at: string
  items: OrderItem[]
}


const Order = () => {

    const [order, setOrder] = useState<Order[]>([])
        const [page, setPage] = useState(1)
        const [limit, setLimit] = useState(5)
        const [search, setSearch] = useState('')
        const [totalPages, setTotalPages] = useState()

    useEffect(()=>{

        const fetchOrder = async() =>{

          try{
          const response =  await axios.get('http://localhost:3000/api/order/',{
            params:{page,limit,search}
          })

          setOrder(response.data.orders)
          setTotalPages(response.data.total)
          }catch(err){
            alert('不能get啊')
            console.error('fail to fetch order', err)
          }

        }

        fetchOrder()
    },[page,limit,search])

  return (
    <>
    <Sidebar/>
    <div className='ml-auto  w-5/6'>
       <div className='flex flex-col justify-center items-center '>
        <p>{totalPages}</p>
       <p className='w-11/12 my-4 mx-auto text-xl md:text-3xl'>Order Management</p>
                   <div className='w-11/12 mx-auto'>
                           <div className='bg-orange-200 mt-4 rounded w-full p-4 flex gap-4 text-center flex-row border  border-black'>
                           <p className='w-1/5'>Order ID</p>
                           <p className='w-1/5'>Username</p>
                           <p className='w-2/5'>Total Purchased</p>
                           <p className='w-1/5'>Status</p>
                           </div>
                       {order?.map((man,index)=>(
       
                           <div key={index} className='w-full bg-orange-50  hover:shadow-md transition-shadow duration-500 cursor-pointer rounded text-center text-sm md:text-md border-2 border-gray-200 flex flex-row items-center justify-center p-4 my-4'>
                           <p className='w-1/5 '>{man.order_id}.</p>
                           <p className='w-1/5 '>{man.user_name}</p>
                           <p className='w-1/5'>{man.total_price}</p>
                           <p className='w-1/5 '>
                           {man.items.map((item,index)=>(
                              <div key={index} >{item.product_name}</div>
                           ))}
                           </p>
                           <p className='w-1/5'>{man.status}</p>
                           {/* <MdDeleteOutline 
                           onClick={()=>handleDeleteUser(man.id)}  
                           className='size-6 w-1/5 cursor-pointer'/> */}
                           </div>
                           
                       ))}
                   </div>
               </div>
        </div>
        </>
  )
}

export default Order