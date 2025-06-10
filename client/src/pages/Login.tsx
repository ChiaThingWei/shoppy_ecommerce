import React, { useState } from 'react'
import Header from '../components/Header'
import sneaker from '../images/sneaker.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

const [email,setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/users/login', {
      email,
      password
      });

      const data = await res.data

      if ((res.status === 200|| res.status === 201) && data.success) {
        alert('Login successful!');
        console.log('Returned token:', data.token);
        localStorage.setItem('token',data.token)
        navigate('/products'); 
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Server error22');
      console.error(err);
    }
  };

  // const handleRegister = async(e:React.FormEvent)=>{

  //   e.preventDefault();

  //   try{

  //     const res = await fetch('http://localhost:3000/api/register',{

  //       method:'POST',
  //       headers:{
  //         'Content-Type' : 'application/json',
  //       },
  //       body: JSON.stringify({username,email,password})

  //     })

  //     const data = await res.json()

  //     if (res.ok){
  //       setMessage('successss')
  //     }else{
  //       setMessage(`failllll: ${data.message}`)
  //     }
  //   }catch(err){
  //     setMessage('faill lo')
  //     console.error(err)
  //   }



  // }

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



        <form 
        onSubmit={handleLogin}
        className='flex rounded flex-col my-10 mx-auto w-4/5 md:w-1/2 bg-blue-200'>

            <p className=' text-2xl pl-5 pt-5 mb-7'>Log In</p>

            <input
            type='email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-1/2 mx-auto p-2 mb-4 rounded'
            />

            <input
            type='password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder='Enter your password'
            className='w-1/2 mx-auto mb-4 p-2 border rounded'
            />

            <button
            type='submit'
            className='w-1/2 text-lg mx-auto rounded bg-blue-300 mb-2'>
                Log in
            </button>
            <button
            className='w-1/2 mx-auto text-sm text-start'
            >
                Forgot password
            </button>

            <div className='flex flex-row w-2/3 mx-auto justify-center my-8'>
                <div className='h-[1px] my-auto bg-black w-2/5 opacity-20'/>
                <p className='text-black opacity-50 px-5'>OR</p>
                <div className='h-[1px] my-auto bg-black w-2/5 opacity-20'/>
            </div>

            <div className='flex flex-row justify-center items-center w-1/2 mx-auto mb-10'>
                <p className=''>New to Shoppy?</p>
                <Link  to="/register" className='text-orange-500 font-bold pl-3'>Sign up</Link>
            </div>
        </form>


        {/* <div className='flex rounded flex-col my-10 mx-auto w-4/5 bg-blue-200'>

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

                <button type="submit" className='rounded bg-blue-300 w-full p-2'>
                    Register
                </button>
            </form>
        </div> */}

    </div>
    </>
  )
}

export default Login