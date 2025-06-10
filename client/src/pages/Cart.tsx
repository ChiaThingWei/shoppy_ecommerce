import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { RiDeleteBin6Line } from "react-icons/ri"
import { CiCirclePlus } from "react-icons/ci"
import { CiCircleMinus } from "react-icons/ci"

interface CartItem {
  cartItemId: number
  productId: number
  name: string
  price: number
  size:number
  image: string
  quantity: number
  created_at: string
};

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

const Cart = () => {
    
  let userId: number | null = null;
  const token = localStorage.getItem('token');
      if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log(decoded);  
      userId = decoded.id;
      }

      //  const [cartItem, setCartItem] = useState<CartItem []>([])
      const [cartItem, setCartItem] = useState<CartItem []>([])
       const [isCartEmpty,setIsCartEmpty] = useState(true)
       const [isUpdated, setIsUpdated] = useState(false)
      

  useEffect(()=>{

      const fetchCart = async()=>{

        try{
       const res = await axios.get(`http://localhost:3000/api/cart/${userId}`)
        const data = res.data
          console.log(res.data)

        if(Array.isArray(data) && data.length > 0){
          
          setCartItem(data)
          setIsCartEmpty(false)
        }else{
          console.log('no data ah')
          setIsCartEmpty(true)
        }
      }
      catch(err){
        console.error('cart empty ahhh,',err)
        setIsCartEmpty(true)
      }
    }
 
    fetchCart()

  },[userId])

  const calTotal = (items: CartItem[]):number =>{
    return items.reduce((total, item)=>{
      return total + item.price * item.quantity;
    },0)
  }

  const makingOrder = async(id:number ,  status: boolean) =>{

    console.log('making order:' +userId + status +cartItem)

    try{
      await axios.post('http://localhost:3000/api/order/',{
        userId: userId,
        status,
        items: cartItem
      })

      alert('making order success !')
      setCartItem([])
    }
    catch(err){
      alert('cant make order '+ err)
    }


  }

  const handleDltItem = async (id: number) =>{

    try{
      const response = await axios.delete(`http://localhost:3000/api/cart/${id}`)
      alert('item delete successfull successfully')
      // setIsUpdated(prev => !prev)
      setCartItem(prev => prev.filter(item => item.cartItemId !== id));
      
      return response.data
      
    }catch(error){
      console.error('Error deleting cart item:', error);
      throw error;
    }
  }

  const handleUpdateItem = async(id: number,quantity:number) =>{

    if (quantity<=0){
      handleDltItem(id)
      return
    }
    try{
      
      const response = await axios.put(`http://localhost:3000/api/cart/${id}`,{quantity})
      alert('update successfullllll')
      // setIsUpdated(prev => !prev)
      setCartItem(prev =>
        prev.map(item =>
          item.cartItemId === id ? { ...item, quantity } : item
        )
      );
      return response.data

    }catch(error){
      console.error('update fail la',error)
    }
  }

  

  return (
    <>
    <Header/>
   
      <div>
      <p className='text-center text-2xl uppercase font-semibold mt-4'>Cart</p>
      </div>

      <div className='md:flex md:w-10/12 md:gap-0  md:mx-auto md:h-auto'>
      <div className='md:flex-col md:flex md:w-3/5 '>
          {cartItem?.length > 0 ? (
             
        cartItem.map((item,index) => (
         
          <div key={index} className='flex overflow-hidden flex-row w-10/12 justify-start bg-blue-100 my-4 rounded-md md:w-full mx-auto'>
            <div className=' w-1/4  p-2 my-auto '>
              <img
              src={item.image}
              alt={item.name}
              className='object-cover'
              />

               <div className='flex flex-row mt-2'>
              <RiDeleteBin6Line  
              onClick={()=>handleDltItem(item.cartItemId)}
              className='cursor-pointer'/> 
              <CiCircleMinus 
              onClick={()=>handleUpdateItem(item.cartItemId,item.quantity-1)}
              className='ml-4 cursor-pointer'/>
              <p className='text-xs px-2'>{item.quantity}</p>
              <CiCirclePlus 
              onClick={()=>handleUpdateItem(item.cartItemId,item.quantity+1)}
              className='cursor-pointer'/>
            </div>
            </div>
            <div className='flex flex-col h-full'>
            <p className='font-semibold text-xs mt-2'>{item.name}</p>
            <p className='text-xs'>Size {item.size}</p>
            

            {/* {item.quantity =1 ??()} */}
           
           
            </div>
            <div className='ml-auto mr-4 mt-2'>
              <p className='text-xs'>RM {(item.price*item.quantity).toFixed(2)} </p>
            </div>
          </div>
        
        )
       
      )
      ) : (
        <p>Your cart is empty</p>
      )}
        </div>
     
    <div className='h-[1px] bg-gray-300 w-11/12 md:hidden my-4 rounded mx-auto'/>

    <div className='w-11/12 mx-auto md:ml-auto md:w-1/3 md:mx-0 my-4 '>
    <div className='flex flex-row'>
      {/* <div>
        <p className='text-sm '>Subtotal (RM)</p>
        <p className='text-sm my-1'>Delivery & Handling (RM)</p>
        <p className='text-sm font-bold mt-2'>Total (RM) </p>
      </div>

      <div className='flex flex-col ml-auto'>
        <p className='text-sm ml-auto'>{calTotal(cartItem).toFixed(2)}</p>
        <p className='text-sm ml-auto my-1'>Free</p>
        <p className='text-sm ml-auto mt-2 font-bold'> {calTotal(cartItem).toFixed(2)}</p>
      </div> */}

<div className='flex flex-col w-full'>
  <div className='flex justify-between text-sm'>
    <p>Subtotal (RM)</p>
    <span>{calTotal(cartItem).toFixed(2)}</span>
  </div>

  <div className='flex justify-between text-sm'>
    <p>Delivery & Handling (RM)</p>
    <span>Free</span>
  </div>

<div className='h-[1px] bg-gray-200 w-full mt-4 mx-auto'/>
  <div className='flex justify-between text-sm font-bold mt-2'>
    <p>Total (RM)</p>
    <span>{calTotal(cartItem).toFixed(2)}</span>
  </div>
  <div className='h-[1px] bg-gray-200 w-full mt-2 mx-auto'/>
</div>


      </div>

      <button 
      onClick={()=>makingOrder(userId!,true)}
      className='bg-black rounded-3xl text-white my-4 p-2 justify-center flex mx-auto w-11/12'>
      <p className='text-center'>Go To Checkout</p>
      </button>
    </div>
    </div>
    


    
  </>
  )
}

export default Cart