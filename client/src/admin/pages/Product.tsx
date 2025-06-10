import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useEffect } from 'react'
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";


interface ProductType {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }

const Product = () => {

    const [product, setProduct] = useState<ProductType[]>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const [isWindowOpen, setIsWindowOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductType|null>(null)

    useEffect(()=>{

        const fetchProduct = async() =>{

            try{
                const res = await axios.get("http://localhost:3000/api/products",{
                    params:{page,limit,search}
                })  
              
                setProduct(res.data.products)
                setTotalPages(res.data.totalPages)
              
            }catch(err){
                console.error('fail to fetch users', err)
            }
        }

        fetchProduct()

        },[limit,page,search,product])

   const handleChangeProductDetails = (id:number, name: string, desc:string, price:number) =>{

      console.log(id,name,desc,price)
          axios.put('http://localhost:3000/api/products',{
            name,desc,price,id
          })
          .then(res=>{
            alert('update success')
            console.log(res.data)})
            .catch(err=> console.log(err))

        }

  return (
    <>
    <Sidebar/>
    <div className='ml-auto  w-5/6'>
       <p className='w-11/12 my-4 mx-auto text-xl md:text-3xl'>Products Management</p>
       
               <div className='flex flex-row w-11/12 mx-auto my-4'>
                   <CiSearch className='my-auto size-6'/>
                   <input
                   type="text"
                   placeholder='Search'
                   value={search}
                   onChange={(e)=>{
                       setSearch(e.target.value)
                       setPage(1)
                   }}
                   className='border p-1 ml-2 rounded'
                   />
               </div>
       
               <div className='flex flex-col justify-center items-center '>
                   <div className='w-11/12 mx-auto'>
                           <div className='bg-orange-200 mt-4 rounded w-full p-4 flex gap-4 text-center flex-row border  border-black'>
                           <p className='w-1/5'>Id</p>
                           <p className='w-1/5'>Product Name</p>
                           <p className='w-2/5'>Description</p>
                           <p className='w-1/5'>Edit</p>
                         
                           </div>
                           
                       {product?.map((item,index)=>(
       
                           <div key={index} className='w-full bg-orange-50  hover:shadow-md transition-shadow duration-500 cursor-pointer rounded text-center text-sm md:text-md border-2 border-gray-200 flex flex-row items-center justify-center p-4 my-4'>
                           <p className='w-1/5 '>{item.id}.</p>
                           <p className='w-1/5 '>{item.name}</p>
                           <p className='w-2/5'>{item.description}</p>
                           <CiEdit  
                              onClick={()=>{
                                setIsWindowOpen(true)
                                setSelectedProduct(item)
                              }}
                            className='size-6 w-1/5 cursor-pointer'/>
                          
                           </div>
                           
                       ))}


                       {isWindowOpen && selectedProduct && (

                        <div 
                        // onClick={()=>setIsWindowOpen(false)} 
                        className='backdrop-blur w-screen h-screen z-10 inset-0 fixed'>

                          <form 
                          onSubmit={(e)=>{
                            e.preventDefault()
                            
                            handleChangeProductDetails(selectedProduct.id,selectedProduct.name,selectedProduct.description,selectedProduct.price)
                            setIsWindowOpen(false)
                          }}
                          className='bg-gray-400 rounded flex flex-col my-20 opacity-90  w-3/5 mx-auto'>

                            <button 
                            onClick={()=>setIsWindowOpen(false)}
                            className='ml-auto mr-4 bg-white p-2 rounded mt-4'
                            >X</button>

                            <p className='text-xl m-4 font-semibold'>Edit Details</p>

                            <label className='ml-4 my-4'>Name</label>
                            <input
                            type='text'
                            value={selectedProduct.name}
                            onChange={e=>
                              setSelectedProduct({ ...selectedProduct, name: e.target.value })
                            }
                            className=' ml-4 w-3/5 rounded'
                            />

                            <label className='ml-4 my-4'>Description</label>
                            <input
                            type='text'
                            value={selectedProduct.description}
                            onChange={e=>
                              setSelectedProduct({ ...selectedProduct, description: e.target.value })
                            }
                            className=' ml-4 w-3/5 rounded'
                            />

                            <label className='ml-4 my-4'>Price</label>
                            <input
                            type='number'
                            value={selectedProduct.price}
                            onChange={e=>
                              setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })
                            }
                            className='mb-4 ml-4 w-3/5 rounded'
                            />

                            <button 
                            type='submit'
                            className='rounded bg-blue-200 w-2/5 mx-auto p-2 mb-4'>
                              Save Changes
                            </button>

                          </form>

                        </div>

                       )}
                   </div>
               </div>
       
               <div className="my-4 w-11/12 mx-auto ">
                       <label className="">Show per page:</label>
                       <select
                       value={limit}
                       onChange={(e) => {
                           setLimit(parseInt(e.target.value))
                           setPage(1)
                       }}
                       className="border ml-3  rounded"
                       >
                       {[5, 10, 20, 50].map((num) => (
                           <option key={num} value={num}>
                           {num}
                           </option>
                       ))}
                       </select>
             </div>
       
             <div className="w-11/12 mx-auto flex gap-2">
               <button
                 disabled={page === 1}
                 onClick={() => setPage((prev) => prev - 1)}
                 className="border p-1 rounded"
               >
                 Prev
               </button>
                   <span>
                   Page {page} of {totalPages}
                   </span>
               <button
                 disabled={page === totalPages}
                 onClick={() => setPage((prev) => prev + 1)}
                 className="border p-1 rounded"
               >
                 Next
               </button>
             </div>
       
    
    </div>
    </>
  )
}

export default Product