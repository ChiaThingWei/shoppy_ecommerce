import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header';
import { jwtDecode } from 'jwt-decode';


interface SizeInfo {
    size: string
    inStock: boolean
  }
  
 
interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

interface item{
    id: number;
    name:string
    description: string
    price:number
    image:string
    sizes: SizeInfo[]

}



export const ProductsDetail = () => {

    const {id} = useParams()    
    // const token = localStorage.getItem('token');
    let userId: number | null = null;
    // if (token) {
    //   const decoded = jwtDecode<DecodedToken>(token);
    //   userId = decoded.id;
    // }
    const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode<DecodedToken>(token);
  console.log(decoded);  // 看看这里是不是有 id
  userId = decoded.id;
}
    const [product, setProduct] = useState<item | null>(null)
    const [isSelected, setIsSelected] = useState<string | null>(null);

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/products/${id}`)
        
        .then(
            
            res =>{ 
                const productData = res.data;
                if (typeof productData.sizes === 'string') {
                    try {
                      productData.sizes = JSON.parse(productData.sizes);
                    } catch (e) {
                      console.error('Failed to parse sizes:', e);
                      productData.sizes = []; // fallback
                    }
                  }
                
                setProduct(productData)}
        )
        .catch(
            err => console.error(err)
        )
    },[id])

    if (!product) return <div>Loading...</div>;
    console.log(isSelected)

    const handleAddToCart = async () =>{

      if(isSelected == null){
        alert('please select size!')
        return
      }

      console.log('Add to cart params:', { user_id: userId, product_id: product?.id, quantity: 1 });
      try{
        const response = await axios.post('http://localhost:3000/api/cart',{
          user_id: userId,
          product_id: product.id,
          quantity:1,
          size: isSelected
          
        })
        alert('add to cart successfully')
        console.log('Response:', response.data);
      }catch(error){
        
        console.error('unsuccessful',error)
       
        alert('add to cart fail')
      }
    }

  return (
    <>
    <Header/>
    <div className='w-full'>
        <div className='md:hidden'>
        <p className='text-black ml-4 my-4 font-semibold text-sm'>{product.name}</p>
        <p className='ml-4 mb-4 text-sm'>RM{' '}{product.price}</p>
        </div>

        <div className='sm:w-5/6 md:w-2/3 mx-auto md:flex md:my-10 justify-center items-center'>
          <img
          src={product.image}
          alt={product.name}
          className='w-full mx-auto sm:w-5/6 md:w-1/2 h-96 sm:h-[500px] object-cover'
          />

            <div className='md:w-1/3'>
              <div className='hidden md:block'>
                <p className='text-black my-4 font-semibold text-sm'>{product.name}</p>
                <p className='mb-4 text-sm'>RM{' '}{product.price}</p>
              </div>

             <p className='text-sm font-semibold my-4 w-11/12 mx-auto md:w-full '>Select size</p>

              <div className='grid grid-cols-3 gap-3 w-11/12 md:w-full mx-auto'>
                  {product.sizes.map(s=>(

                      <button
                      key={s.size}
                      onClick={() => s.inStock && setIsSelected(s.size)}
                      disabled={!s.inStock}
                      className={`text-sm border border-gray-200 hover:border-gray-500 transition-transform duration-300 px-3 py-1 rounded
                      ${!s.inStock ? 'bg-gray-500 text-white cursor-not-allowed' :
                        isSelected === s.size ? 'border-gray-500' : ''}`}
                      >
                          US{' '}{s.size}
                      </button>
                  ))}
              </div>

                  <div className='w-full flex'>
                  <button
                  onClick={handleAddToCart}
                className={`bg-black rounded-3xl text-white py-2 mt-5 w-11/12 mx-auto`}
                >Add to Cart</button>
                </div>

            </div>

           
       
        </div>
        
        <div className='my-10'>
        <p className='text-sm font-bold w-11/12 mx-auto'>Details</p>
        <p className='w-11/12 mx-auto '>{product.description}</p>
        </div>
        
    </div>
  
    </>
  )
}


// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any>(null);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then(res => setProduct(res.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <img src={product.imageUrl} alt={product.name} />
//       <p>{product.description}</p>
//       <p>Price: RM {product.price}</p>
//     </div>
//   );
// };

// export default ProductDetail;
