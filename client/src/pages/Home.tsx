import { homeAds } from "../utils/images"
import { useState, useEffect } from "react"
import modal from '../images/clothing.png'
import kobe from '../images/kobe2.png'
import ae from '../images/ae.jpg'
import Header from "../components/Header"
import Footer from "../components/Footer"
import React from 'react';
import axios from "axios"
// import { response } from "express"


interface User{
  id:number,
  username:string,
  email:string,
  password:string
}

export const Home = () => {

  const [index, setIndex] = useState(0);
  const [user,setUser]=useState<User[]>([])

  useEffect(() => {
      const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % homeAds.length);
      }, 3000);

      return () => clearInterval(interval);
  }, []);

  // useEffect(()=>{

  //   fetch('http://localhost:3000/api/users')
  //   .then((response)=>response.json())
  //   .then((data)=>{
  //     console.log('Fetched users:', data); 
  //     setUser(data);
  //   })
  //   .catch((error)=>{
  //     console.error('fetch fail',error)
  //   })

  // },[])

  useEffect(()=>{

    axios.get('http://localhost:3000/api/users')
    .then(response=>{
      console.log('fetch users: ', response.data)
      setUser(response.data)


    })
    .catch(error=>{

      console.log('fetch fail',error)
    })
    
    
    

  },[])



  return (
   
    <div>
          <Header/>
          
           <div className="mt-10 relative mx-auto h-[40vh] w-3/4 overflow-hidden rounded-xs md:h-[70vh] md:w-3/5">

           {/* <div>
            <ul>
              {user.length>0?(
                user.map((user)=>(
                  <li>{user.username}</li>
               
                ))
              ):(
                <p>nothing</p>
              )}

            </ul>


           </div> */}
                <div
                    className="flex h-full w-full transition-transform duration-1000 ease-in-out"
                    style={{
                        transform: `translateX(-${index * 100}%)`,
                    }}
                >
                    {homeAds.map((src, i) => (
                        <div key={i} className="h-full w-full shrink-0">
                            <img
                                src={src.images}
                                alt={`Slide ${i}`}
                                className="h-full w-full rounded-lg object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>


            <div className="w-4/5 md:w-3/5 text-center my-10 mx-auto">
              <p className="text-xl font-bold uppercase md:text-4xl">Chase Your Best Time</p>
              <p className="text-sm md:text-lg">Run Free with Our AeroStride Series Running Shoes!</p>
              <button className="bg-black hover:bg-gray-300 hover:text-black transition-colors duration-300 rounded-xl my-2  w-1/5 md:w-1/6 text-white ">Shop</button>
            </div>

            <div className="w-10/12 mx-auto ">
              <div className="md:flex md:justify-evenly md:gap-5">
                <div className="relative my-5 mx-auto w-5/6 rounded-xl cursor-pointer">
                
                <img
                src={kobe}
                alt="kobe shoe"
                className="mx-auto w-[350px] sm:w-[420px] md:w-[500px] h-[350px] sm:h-[420px] md:h-[500px] object-cover rounded-xl relative "
                />
                <div className="w-full absolute z-10 bottom-5 left-10 sm:left-14 flex flex-col gap-2 ">
                <p className="drop-shadow-xl  text-white text-sm">The new Kobe 5</p>
                <button className="w-[70px] h-[25px] sm:w-[90px] sm:h-[25px] bg-white rounded-xl text-sm text-center text-black hover:bg-gray-300 transition-colors duration-300 ">Shoes</button>
                </div>
                </div>
                <div className="relative my-5 mx-auto w-5/6 rounded-xl cursor-pointer">
                  <img
                  src={modal}
                  alt="clothing modal"
                  className="mx-auto w-[350px] sm:w-[420px] md:w-[500px] h-[350px] sm:h-[420px] md:h-[500px] object-cover rounded-xl relative"
                  />
                  <div className="w-full absolute z-10 bottom-5 left-10 sm:left-14 flex flex-col gap-2 ">
                <p className="drop-shadow-xl  text-white text-sm">Paris Saint-Germain Jersey</p>
                <button className="w-[70px] h-[25px] sm:w-[90px] sm:h-[25px] bg-white rounded-xl text-sm text-center text-black hover:bg-gray-300 transition-colors duration-300 ">Clothing</button>
                </div>
                </div>
              </div>
            </div>

            <div className="mx-auto w-5/6 md:w-4/5 h-[300px] sm:h-[350px] md:h-[450px] rounded-xl my-10">
            <p className="font-bold text-xl md:text-3xl">The new Adidas Anthony Edwards 1</p>
            <p className="text-sm md:text-lg mb-2">Now with 10% off, promotion until 31 May</p>
                    <img
                    src={ae}
                    alt='ae'
                    className="object-cover w-full h-full rounded-sm cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
            </div>

       

            <div className=" mx-auto md:w-4/5 w-5/6 mt-20 md:mt-32">
              <div className="w-full">
                <p className="font-bold text-xl md:text-3xl">Highlight Top Pick</p>
                <p>item list here</p>
              </div>
              
            </div>
            <Footer/>
        
    </div>
   
  )
}

