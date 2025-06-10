import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../types/user';


export const authenticateToken = (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401); // 未授权

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403); // 无效 token

    req.user = user as UserPayload; // 存储解码后信息到 req
    next();
  });
};
