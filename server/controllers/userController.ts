import { Request,Response } from "express";
import { db } from "../db";
import jwt from 'jsonwebtoken';
import express from 'express'
import { ResultSetHeader } from 'mysql2';

type User= {

id: number
username: string
email: string
password:string
}

//最普通的
// export const getAllUsers = async (req:Request, res:Response)=>{

//     const page = parseInt(req.query.page as string) || 1
//     const limit = parseInt(req.query.limit as string) || 5
//     const offset = (page - 1) * limit

//     try{
//         const [results] = await db.query('SELECT * FROM users')
//         res.json(results)
//     }catch(err){
//         res.status(500).json({message:'get user failll', error: err})
//     }


// }

//跟着页数+数量show
// export const getAllUsers = async (req:Request, res:Response)=>{

//   const page = parseInt(req.query.page as string) || 1
//   const limit = parseInt(req.query.limit as string) || 5
//   const offset = (page - 1) * limit

//   console.log(page + '+' + limit)

//   try{

//       const [userRows] = await db.query('SELECT * FROM users LIMIT ? OFFSET ?',[limit,offset])

//       const users = userRows as User[]

//       const [countResult] = await db.query('SELECT COUNT(*) as total FROM users')

//       const total = (countResult as{total: number}[])[0].total

//       res.json({users,
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total/limit)
//       })
//   }catch(err){
//       res.status(500).json({message:'get user failll', error: err})
//   }


// }

export const getAllUsers = async (req:Request, res:Response)=>{

  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 5
  const offset = (page - 1) * limit
  const search = (req.query.search as string)?.trim() || ''

  console.log(page + '+' + limit + '+' + search)

  try{

      let userQuery = 'SELECT * FROM users'
      let countQuery = 'SELECT COUNT(*) as total FROM users'
      const params: (string | number)[] = [];


    if(search){
      userQuery += ' WHERE username LIKE ? OR email LIKE ?'
      countQuery += ' WHERE username LIKE ? OR email LIKE ?'
      const keyword = `%${search}%`
      params.push(keyword,keyword)
      console.log('')
    }

    userQuery += ' LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const [userRows] = await db.query(userQuery, params)
    const users = userRows as User[]

    const [countResult] = await db.query(countQuery, search ?[`%${search}%`,`%${search}%`]:[])
    const total = (countResult as{total: number}[])[0].total

    res.json({
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total/limit)
    })

  }

  catch(err){
      res.status(500).json({message:'get user failll', error: err})
  }


}

// export const registerUser = async (req:Request,res:Response)=>{

//     const {username,email,password} = req.body

//     if(!username || !email || !password){
//         return res.status(400).json({success: false, message: 'kindly fill in all the informaitonnn'})
//     }

//     try{

//         const [existing] = await db.query('SELECT * FROM USERS WHERE email = ?',[email])
//         const users = existing as User[]

//         if(users.length>0){
//             return res.status(409).json({success: false, message:'email been registered change another'})
//         }

//         await db.query('INSERT INTO USERS(username,email,password)VALUES(?,?,?)',[username,email,password])

//         const token = jwt.sign({email}, process.env.JWT_SECRET!,{expiresIn: '1h'})

//         res.status(201).json({success:true, message:'register successfulll', token})
        
//     }catch(err){
//         res.status(500).json({success: false, message:'register faill', error: err})
//     }

// }

// export const registerUser = async (req: Request, res: Response, next: express.NextFunction) => {
//     const { username, email, password } = req.body;
  
//     if (!username || !email || !password) {
//       return res.status(400).json({ success: false, message: 'Please fill all required fields' });
//     }
  
//     try {
//       // 查询是否已存在该邮箱用户
//       const [existingRows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
//       const existingUsers = existingRows as User[];
  
//       if (existingUsers.length > 0) {
//         return res.status(409).json({ success: false, message: 'Email already registered, please use another.' });
//       }
  
//       // 插入新用户
//       await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
//         username,
//         email,
//         password, // 实际要用 bcrypt.hash()
//       ]);
  
//       // 生成 token
//       const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
//       return res.status(201).json({ success: true, message: 'Registration successful', token });
//     } catch (error) {
//       console.error('Register error:', error);
//       next(error);
//       return res.status(500).json({ success: false, message: 'Server error', error });
//     }
//   };
export const registerUser: express.RequestHandler = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: 'Please fill all required fields' });
      return; 
    }
  
    try {
      const [existingRows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      const existingUsers = existingRows as User[];
  
      if (existingUsers.length > 0) {
        res.status(409).json({ success: false, message: 'Email already registered' });
        return;
      }
  
      // await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      //   username,
      //   email,
      //   password
      // ]);
  
      // const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      // res.status(201).json({ success: true, message: 'Registration successful', token });
      const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
      );
      
      
      const insertId = result.insertId;
      
      // 生成 token，包含 id 和 email
      const token = jwt.sign({ id: insertId, email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      
      res.status(201).json({ success: true, message: 'Registration successful', token });
      
    } catch (error) {
      next(error); 
    }
  };

export const loginUser = async(req:Request,res:Response)=>{

    const {email, password} = req.body

    try{

        const [rows] = await db.query('SELECT id, email FROM USERS WHERE email = ? AND password = ?',[email,password])
        const users = rows as User[]

        if(users.length > 0){
            const user = users[0];
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      
            res.status(201).json({success: true, message:'login successfull', token})
            
        }else{
            res.status(401).json({ success: false, message: 'email or password is incorrecttt' });
        }

    }catch(err){

        res.status(500).json({success:false,message:'database errorrr',error: err})

    }
}


export const deleteUsers: express.RequestHandler = async(req,res,next )=>{

  const userID = req.params.id
  console.log('Delete request received for ID:', req.params.id);

    try{
     const[result] =  await db.query<ResultSetHeader>('DELETE FROM USERS WHERE ID = ?',[userID])

      if(result.affectedRows === 0){
         res.status(404).json({message:'user not found leh'})
      }

      res.status(200).json({message:'delete successfull',})

    }catch(err){
      res.status(500).json({message:'delete unsuccessful',err})
      next(err)
    }


}