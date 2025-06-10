import { Request, Response } from "express";
import { db } from "../db";
import mysql from 'mysql2/promise'; 
import express from 'express'


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

  type OrderItem = {
    order_item_id: number
    product_id: number
    product_name:string
    price: number
    quantity: number
    subtotal: number
  }

  type Order = {
    order_id:number
    user_id:number
    user_name:string
    total_price:number
    status:boolean
    created_at: string
    items: OrderItem[]
  }

// export const addToOrder = async(req:Request,res:Response)=>{

//     const {userId, totalPrice, status} = req.body

//     try{

//         await db.query('INSERT INTO orders (user_id, total_price, status) VALUES (?,?,?)',[userId,totalPrice,status])
//         res.status(201).json({message:'insert successfully'})

//     }catch(error){

//         res.status(500).json({error:error})
//     }
// }


export const addToOrder: express.RequestHandler = async(req:Request, res:Response)=>{


    const {userId, items, status} = req.body

    console.log(userId,items, status)

    if(!userId || !items || !status){

         res.status(400).json({message:'info not completed'})

    }

    try{

     
        const total_price = items.reduce(
            (sum:number , items: showCartItem) => sum + Number(items.price) * items.quantity
            ,0
        )

        console.log('userId:', userId);
console.log('total_price:', total_price); // 应该是一个纯数字
console.log('status:', status);
        
        
        const [order] = await db.query('INSERT INTO orders (user_id, total_price,status) VALUES (?,?,?)',[userId,total_price,status])

        const insertResult = order as mysql.ResultSetHeader;
        const orderId = insertResult.insertId

        for (const item of items){

            const {productId, name, price, quantity} = item
            const subtotal = price * quantity

            const [productRows] = await db.query('SELECT quantity FROM products WHERE id = ?',[productId])

            const quantityy = (productRows as {quantity: number}[])[0]?.quantity
            if(!productRows || quantityy <= 0){
                throw new Error(`库存不足: ${name}` )
            }


            await db.query('INSERT INTO order_item (order_id, product_id, product_name, price, quantity, subtotal) VALUES (?,?,?,?,?,?)',[orderId,productId,name,price,quantity,subtotal])

            await db.query('UPDATE products SET quantity = quantity - ? WHERE id = ?',[quantity,productId])

        }

        await db.query('DELETE FROM cart_items WHERE user_id = ?',[userId])

        res.status(201).json({message:'make order successful',orderId})


    }catch(error){

        console.error('fail making order',error)
        res.status(500).json({error:'fail making order, try again'})
    }




}

export const getAllOrder = async(req:Request, res:Response)=>{

    const limit = parseInt(req.query.limit as string) || 10
    const page = parseInt(req.query.page as string) || 1
    const offset = (page-1) * limit
    const search = (req.query.search as string) || ''

    console.log('try拿')
try{

    const [rows] = await db.query(`
        SELECT o.id as order_id, o.user_id, u.username as user_name, o.total_price, o.status, o.created_at,oi.id as order_item_id, oi.product_id, oi.product_name, oi.price, oi.quantity,oi.subtotal FROM orders o JOIN users u ON o.user_id = u.id LEFT JOIN order_item oi ON o.id = oi.order_id WHERE u.username LIKE ? ORDER BY o.created_at DESC, oi.id LIMIT ? OFFSET ?`,[`%${search}%`,limit,offset])

        const [countResult] = await db.query(`
            SELECT COUNT(DISTINCT o.id) AS total
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE u.username LIKE ?
          `, [`%${search}%`])

          const total = (countResult as{total: number}[])[0].total
    
        const typedRows = rows as {
            order_id: number;
            user_id: number;
            user_name: string;
            total_price: number;
            status: boolean;
            created_at: string;
            order_item_id: number | null;
            product_id: number | null;
            product_name: string | null;
            price: number | null;
            quantity: number | null;
            subtotal: number | null;
          }[];

        const ordersMap = new Map<number, Order>()

        for(const row of typedRows){
            if(!ordersMap.has(row.order_id)){
                ordersMap.set(row.order_id,{
                    order_id: row.order_id,
                    user_id: row.user_id,
                    user_name: row.user_name,
                    total_price: row.total_price,
                    status: row.status,
                    created_at: row.created_at,
                    items: []
                })
            }

            if(row.order_item_id !== null){
                ordersMap.get(row.order_id)?.items.push({
                    order_item_id: row.order_item_id,
                    product_id: row.product_id!,
                    product_name: row.product_name!,
                    price: row.price!,
                    quantity: row.quantity!,
                    subtotal: row.subtotal!,
                })
            }
        }

    const orders: Order[] = Array.from(ordersMap.values())

        res.status(200).json({orders,total: Math.ceil(total/limit)})

}

catch(err){
    console.error("Error in getAllOrder:", err);
    res.status(500).json({message:'cant get item', err})
}


}