import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";


interface userType {
id:number
username:string
email:string
}

const Users = () => {

    const [ users, setUsers] = useState<userType[]>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(1)
    const [isDeleted, setIsDeleted] = useState(false)
    const [search, setSearch] = useState('')

    // useEffect(()=>{

    //      axios.get("http://localhost:3000/api/users/")
    //     .then(response=>
    //         setUsers(response.data)
    //     )
    //     .catch(error=>
    //         alert(error)
    //     )

    // },[isDeleted])


    useEffect(()=>{
    const fetchUsers = async() =>{
        try{
            const res = await axios.get("http://localhost:3000/api/users/",{
                params:{page,limit, search}
            })
            console.log(res.data)
            setUsers(res.data.users)
            setTotalPages(res.data.totalPages)
        }catch(err){
            console.error('fail to fetch users', err)
        }
    }

        fetchUsers()
    },[page,limit,isDeleted, search])

 const handleDeleteUser = async (id:number)=>{

        console.log('delete id:'+id)
        try{ 
            const response = await axios.delete(`http://localhost:3000/api/users/delete/${id}`)
            alert('delete user successful')
            setIsDeleted(prev => !prev)
            return response.data

            }catch(err){
                alert('hi'+err)
            }
 }

  return (
    <>
    <Sidebar/>
    <div className='ml-auto  w-5/6'>
        <p className='w-11/12 my-4 mx-auto text-xl md:text-3xl'>Users Management</p>

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
                    <p className='w-1/5'>Username</p>
                    <p className='w-2/5'>email</p>
                    <p className='w-1/5'>delete</p>
                    </div>
                {users?.map((man,index)=>(

                    <div key={index} className='w-full bg-orange-50 hover:shadow-md transition-shadow duration-500 cursor-pointer rounded text-center text-sm md:text-md border-2 border-gray-200 flex flex-row items-center justify-center p-4 my-4'>
                    <p className='w-1/5 '>{man.id}.</p>
                    <p className='w-1/5 '>{man.username}</p>
                    <p className='w-2/5'>{man.email}</p>
                    <MdDeleteOutline 
                    onClick={()=>handleDeleteUser(man.id)}  
                    className='size-6 w-1/5 cursor-pointer'/>
                    </div>
                    
                ))}
            </div>
        </div>

        <div className="my-4 w-11/12 mx-auto ">
                <label className="">Show per page:</label>
                <select
                value={limit}
                onChange={(e) => {
                    setLimit(parseInt(e.target.value));
                    setPage(1); // 重设页数
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

export default Users