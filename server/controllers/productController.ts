import { Request,Response } from "express";
import { db } from "../db";
import express from 'express'


type SizeInfo = {
    size: string;  
    inStock: boolean;
  }

  
type Product={

    id:number
    name:string
    description:string
    price:number
    image:string 
    sizes: SizeInfo[] | string

}

// export const getAllProducts = async (req: Request, res: Response)=>{

//     const limit = parseInt(req.params.limit as string) || 5
//     const page = parseInt(req.params.page as string) || 1
//     const offset = (page - 1) * limit
//     const search = (req.params.query as string)?.trim() || ''

//     try{
//         const [rows] = await db.query('SELECT * FROM products')
//         res.json(rows)
//     }catch(err){
//         res.status(500).json({message:'get products faill', error:err})
        
//     }


// }

export const getAllProducts = async (req: Request, res: Response)=>{

    const limit = parseInt(req.query.limit as string) || 5
    const page = parseInt(req.query.page as string) || 1
    const offset = (page - 1) * limit
    const search = (req.query.search as string)?.trim() || ''

    try{

        let productQuery = 'SELECT * FROM products'
        let countQuery = 'SELECT COUNT(*) as total FROM products'
       
        const params:(string | number)[] = []

        if(search){
            productQuery += ' WHERE name LIKE ? OR description LIKE ?'
            countQuery += ' WHERE name LIKE ? OR description LIKE ?'
             const keyword = `%${search}%`
             params.push(keyword,keyword)
        }

        productQuery += ' LIMIT ? OFFSET ?'
        params.push(limit,offset)


        const [productRows] = await db.query(productQuery,params)
        const products = productRows as Product[]

        const [countResult] = await db.query(countQuery, search ?[`%${search}%`,`%${search}%`]:[])
        const total = (countResult as{total: number}[])[0].total
    
        res.json({
          products,
          total,
          page,
          limit,
          totalPages: Math.ceil(total/limit)
        })
    }catch(err){
        res.status(500).json({message:'get products faill', error:err})
        
    }


}

export const getProductById: express.RequestHandler = async(req, res, next) => {
    const productId = req.params.id;
  
    try{

        const [existing] = await db.query('SELECT * FROM products WHERE id = ?',[productId])
        const item = existing as Product[]
       

        if(item.length === 0 ){
             res.status(404).json({message:'item not found'})
             return
        }
        const sizesRaw = item[0].sizes

        let sizes: SizeInfo[];
        if (typeof sizesRaw === 'string') {
          sizes = JSON.parse(sizesRaw);
        } else {
          sizes = sizesRaw;
        }
        
        res.json({
            ...item[0],
        sizes,})

    }catch(err){
        res.status(500).json({error:err})
        next(err)
    }
  };

  export const updateProduct = async(req:Request,res:Response)=>{

    // const {id} = req.body
    // const name = (req.query.name as string) || ''
    // const desc = (req.query.desc as string) || ''
    // const price = parseInt(req.query.price as string)
    const{id,name,desc,price} = req.body

    console.log(id,name,desc,price)
    try{

      await db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',[name,desc,price,id])
      res.status(200).json({message:'update successfull'})


    }catch(error){
        res.status(500).json({error:error})
    }

  }