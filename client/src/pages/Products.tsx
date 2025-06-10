import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// interface Product1 {
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity:number
// }

const Products = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false)
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')

    // useEffect(()=>{
  
    //   fetch('http://localhost:3000/api/products')
    //   .then((response)=>response.json())
    //   .then((data)=>{
    //     console.log('Fetched products:', data); 
    //     setProducts(data);
    //   })
    //   .catch((error)=>{
    //     console.error('fetch fail',error)
    //   })
  
    // },[])

    useEffect(()=>{

      axios.get('http://localhost:3000/api/products')
      .then(response=>{
        console.log('Fetch products:', response.data)
        setProducts(response.data.products)
      })
      .catch(error=>{
        console.log('fetch fail', error)
      })

    },[])

  // useEffect(()=>{

  //   fetch("/products.json")
  //   .then((res)=>res.json())
  //   .then((data)=> setProducts(data));

  // },[])

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  
  const handleFilterChange = (range: string) => {
    setSelectedPriceRange(range);
    let filtered = [...products];
    if (range === 'low') {
      filtered = products.filter((item) => item.price < 500);
    } else if (range === 'high') {
      filtered = products.filter((item) => item.price >= 500);
    } else if (range === 'all') {
      filtered = products.filter((item) => item.price > 0);
    }
    setFilterProducts(filtered);
  };

  return (
    <>
    <Header/>
    <div className='w-full'>

      <div className='mt-5 w-5/6 mx-auto'>
        <p className='font-semibold'>Products</p>
        <p className='text-sm'>{filterProducts.length}{' '}Results</p>
        <button
        className='border-2 border-blue-200 hover:bg-blue-200 px-3 rounded-3xl mt-2'
        onClick={()=>setShowFilters(!showFilters)}
        >Filter</button>
      </div>

      {showFilters && (

        <div className='mt-2 w-5/6 mx-auto'>
          <div className='flex flex-col '>
            <button  onClick={() => handleFilterChange('all')} className='text-start underline'>All prices</button>
            <button  onClick={() => handleFilterChange('mid')} className='text-start underline'>above RM500</button>
            <button  onClick={() => handleFilterChange('low')} className='text-start underline'>below RM500</button>
          </div>

        </div>

      )}


      <div className='my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-stretch gap-8 w-5/6 mx-auto justify-center'>
      
      {filterProducts?.map((item,index)=>(

        <Link to={`/products/${item.id}`} key={index} >
        <div 
        
        
        className='flex flex-col cursor-pointer justify-between'>
          <img 
          src={item.image}
          alt={item.name}
          className='mb-2 h-[200px] object-cover hover:shadow-md transition-all duration-300'
          />
          <p className='text-xs w-[150px] '>
            <span className='font-bold'>{item.name}</span> 
            <br/>
          {item.description}<br/>
          </p>
          <div className='h-[5px] opacity-0'/>
          RM{' '}{item.price}
          </div>
          </Link>
      ))}


{/* 
      {products1.map((item,index)=>
      
    
    <div>{item.name}
    
    <img
    src={item.image}
    />
    </div>
    
    
    
    )} */}
      
      
      </div>
      
      
      </div>
      <Footer/>
    </>
  )
}

export default Products