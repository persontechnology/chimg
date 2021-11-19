
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const{id,name,email,password,admin}=req.body;
    console.log(req.body)
    try {
      await dbConnect();
      const hashPassword = await bcrypt.hash(password, 10);
      if(id){
        const user = await User.findByIdAndUpdate(id,{name,email,password:hashPassword,admin})
        res.status(200).json({message:'Usuario actualizado' })
      }else{
        const user = await User.findOne({ email: email });
        if (!user) {
            const user = await new User({
            name,
            email,
            password: hashPassword,
            admin
            });
            await user.save();
            res.status(200).json({message:'Usuario ingresado' })
        }else{
            res.status(500).json({message:'Usuario ya existe' })
        }
      }

    } catch (error) {
      res.status(500).json({message:'Ocurrio un error' })
    }
  
}
