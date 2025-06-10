// index.ts
import express from 'express';
import { db } from './db';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes'
import orderRoutes from  './routes/orderRoutes'


// import jwt from 'jsonwebtoken';

// type User = {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
// };


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order', orderRoutes)

app.listen(PORT, () => {
  console.log(`🚀 服务器运行中：http://localhost:${PORT}`);
});


// 测试数据库连接
app.get('/ping-db', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.send('✅ 成功连接数据库1！');
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    res.status(500).send('数据库连接失败');
  }
});



// app.get('/api/users', async (req, res) => {
//   try {
//     const [results] = await db.query('SELECT * FROM users');
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: '查询失败', error: err });
//   }
// });

// app.post('/api/register',async (req,res)=>{

// const {username,email,password} = req.body;

// if(!username || !email || !password){
//   res.status(400).json({success:false,message:'kindly fill in all the information ~'})
// }

// try{

//   const [existing] = await db.query('SELECT * FROM users WHERE email=?',[email])
//   const users = existing as User[];

//   if(users.length>0){
//     res.status(409).json({success: false, message:'This email has been registered !'})
//   }


// await db.query('INSERT INTO users(username,email,password) VALUES(?,?,?)',[username,email,password])

// const token = jwt.sign({email}, process.env.JWT_SECRET!,{expiresIn:'1h'})

// res.status(201).json({success:true, message:'register successfully !',token})

// }catch(err){
//   console.error('regitser fail:', err)
//   res.status(500).json({success:false, message:'register fail',error: err})
// }
// })

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
//   const users = rows as User[];

//   try {

//     if (users.length > 0) {
//      const user = users[0]
//       const token = jwt.sign({id:user.id,email:user.email},
//         process.env.JWT_SECRET!,{expiresIn:'1h'}
//       )

//       res.json({ success: true, message: 'Login successful',token });


//     } else {
//       res.status(401).json({ success: false, message: 'Invalid Credentials' });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Database error', error: err });
//   }
// });

// app.get('/api/products', async (req,res)=>{

//   try {
//     const [rows] = await db.query('SELECT * FROM products');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: '无法获取产品列表', error: err });
//   }

// })
