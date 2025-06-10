import React, { useState } from 'react'
import Header from '../components/Header'
import sneaker from '../images/sneaker.jpg'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {


        const [username,setUsername]=useState('')
        const [email,setEmail]=useState('')
        const [password,setPassword]=useState('')
        const navigate = useNavigate()


    const handleRegister = async(e:React.FormEvent)=>{

        e.preventDefault()

        try{

            const res = await axios.post('http://localhost:3000/api/users/register',{
               username,
               email,
               password
            })

            const data =  res.data

            if(res.status === 201){
                alert(`Register successful! Welcome ${username}`);
                localStorage.setItem('token',data.token)
                navigate('/'); 
            }else{
                alert(`failllll: ${data.message}`)
            }

        }catch(error){
           console.error(error)
           alert(error)
        }


    }


  return (
    <>
    <Header/>
    <div className='w-full'>

            <div className='w-2/3 md:w-1/2 bg-white mt-4 flex flex-row items-center justify-center mx-auto'>
                <img
                src={sneaker}
                alt='icon'
                className='w-[100px] h-[100px] '
                />
                <p className='font-semibold'>
                <span className='text-blue-200 font-bold'>Shoppy<br/></span>
                Your Ultimate Destination for Sport Shoes</p>
            </div>

    <div className='flex rounded flex-col my-10 mx-auto w-4/5 md:w-1/2 bg-blue-200'>

            <p className='text-2xl ml-5 my-5'>Join us !</p>
            <form onSubmit={handleRegister} className='w-1/2 mb-5 mx-auto justify-center flex flex-col'>
                <p>Name</p>
                <input
                type='name'
                value={username}
                onChange={e=>setUsername(e.target.value)}
                placeholder='Enter your name'
                className='rounded p-2 mb-3'
                />
            
                 <p>Email</p>
                <input
                type='email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder='Enter your email'
                className='rounded p-2 mb-3 '
                />

                 <p>Password</p>
                <input
                type='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder='Enter your new password'
                className='rounded p-2 mb-5'
                />

                <button type="submit" className='rounded bg-blue-300 w-full p-2 mb-4'>
                    Register
                </button>
            </form>
        </div> 
        </div>
        </>

  )
}

export default Register