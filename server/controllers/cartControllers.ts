import { Request, Response } from "express";
import { db } from "../db";
import express from 'express'
import { ResultSetHeader } from 'mysql2';


// type cartItem = {

// userId: number
// productId: number
// quantity:number

// }

// type cartcart ={
//   userId:number
//   productId:number
// }

type showCartItem = {
  userId: number
  productId:number
  productName: string
  price: number
  size:number
  quantity:number
  created_at: string
  image:string
  
}

type cartItem = {
  id:number
  userId: number
  productId:number
  quantity:number
  size:number
}

// export const addToCart = async (req:Request, res: Response)=>{

//     const {user_id, product_id, quantity} = req.body

//     try{
//         await db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES(?,?,?)',[user_id,product_id,quantity])

//         res.status(201).json({message:'Added to cart successfully'})
//     }catch(err){
//         res.status(500).json({error:'Database error',details: err})
//     }

// }

export const addToCart: express.RequestHandler = async (req,res,next) => {
  const { user_id, product_id, quantity, size } = req.body;

  try {
    if (!user_id || !product_id || !size) {
       res.status(400).json({ error: 'Missing required fields' });
    }

    const [existingrows] = await db.query('SELECT id, size, quantity from cart_items WHERE user_id = ? AND product_id = ? AND size = ? ',[user_id,product_id,size])
    const existing = existingrows as cartItem[]

    if(existing.length >0){
      const existingItem = existing[0]
      await db.query('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?', [existingItem.id])

      res.status(200).json({success:true, message:'Quantity update successss'})
    } else{

      const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO cart_items (user_id, product_id, quantity, size) VALUES (?, ?, ?,?)',
        [user_id, product_id, quantity,size]
      );
  
      res.status(201).json({ message: 'Added to cart successfully', cartItemId: result.insertId });

    }

   
  } catch (err) {
    console.error('addToCart error:', err);
    res.status(500).json({ error: 'Database error', details: err instanceof Error ? err.message : err });
    next(err)
  }
};

// export const addToCart: express.RequestHandler = async (req,res,next) => {
//     const { user_id, product_id, quantity } = req.body;
  
//     try {
//       if (!user_id || !product_id || !quantity) {
//          res.status(400).json({ error: 'Missing required fields' });
//       }
  
//       const [result] = await db.query<ResultSetHeader>(
//         'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
//         [user_id, product_id, quantity]
//       );
  
//       res.status(201).json({ message: 'Added to cart successfully', cartItemId: result.insertId });
//     } catch (err) {
//       console.error('addToCart error:', err);
//       res.status(500).json({ error: 'Database error', details: err instanceof Error ? err.message : err });
//       next(err)
//     }
//   };



export const getCartItems: express.RequestHandler = async(req, res, next) => {

    const userId = req.params.userId

    try{
      
      const[existing] =  await db.query(
        'SELECT ci.id AS cartItemId,ci.quantity,ci.size, ci.created_at, p.id AS productId, p.name, p.price, p.image FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?',[userId])
        // 'SELECT * FROM cart_items where user_id = ?',[userId])

        const cart = existing as showCartItem[]

        if(cart.length === 0){
             res.status(404).json({message:'Cart is Empty'})
             console.log('没data啊',userId)

        }else{ console.log('有data啊')
          res.json(existing)}
       
        
    }catch(err){
        res.status(500).json({error:err})
        next(err)
    }


}

export const updateCartItem = async(req:Request, res:Response)=>{

const cartItemId = req.params.id
const{quantity} = req.body

try{
    await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?',[
        quantity,
        cartItemId
    ])

    res.status(200).json({message:'Cart item updated !'})
}catch(err){
    res.status(500).json({error:'Database error!',details:err})
}

}

export const deleteCartItem = async(req:Request,res:Response)=>{

const cartItemId = req.params.id
try{
    await db.query('DELETE FROM cart_items WHERE id = ?',[cartItemId])
    res.status(200).json({message:'Cart item deleted'})
}catch(err){
    res.status(500).json({error:'Database error',details:err})
}



}