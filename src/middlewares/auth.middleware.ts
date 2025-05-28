

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];


  try {

    // Assuming to jwt.sign playload will be like this 
    // { id: id }, SECRET , { expiresIn: '7d' }
    // where id is mongo db auto generated OBJECTid as string


    // demi tokken
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjMxYWRiZTI2MzBhYTNmMDFhMDM4MiIsImlhdCI6MTc0ODQxNjgyMywiZXhwIjoxNzQ5MDIxNjIzfQ.l_M90ZTnTE13wtF-c-elncazqb5GtXCkRnpNPA8Z3Ys

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // TODO remove this 
    // console.log("decoded", decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' , error});
    return;
  }
};

export { authMiddleware };

