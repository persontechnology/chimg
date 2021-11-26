
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import initMiddleware from '../../../lib/init-middleware'
import validateMiddleware from '../../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'

type Data = {
  message: string
}
const validateBody = initMiddleware(
  validateMiddleware([
      check('email')
      .custom(async(value,{req})=>{
        const {id}=req.body;
        if(id){
          const user=await User.findOne({email:value,_id:{$ne:id}});
          if(user){
            console.log(user)
            throw new Error('Email registrado en otro usuario ');
          }
        }else{
          const choferc=await User.findOne({email:req.body.email});
          if(choferc){
            throw new Error('Email ya esta registrado');
          }
        }
        
      })
  ], validationResult)
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await validateBody(req, res)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() })
    }


    const{id,name,email,password,admin}=req.body;
    console.log(req.body)
    try {
      await dbConnect();
      const hashPassword = await bcrypt.hash(password, 10);
      if(id){
        const user = await User.findByIdAndUpdate(id,{name,email,password:hashPassword,admin})
        res.status(200).json({message:'Usuario actualizado' })
      }else{
    
        const user = await new User({
        name,
        email,
        password: hashPassword,
        admin
        });
        await user.save();
        res.status(200).json({message:'Usuario ingresado' })
       
      }

    } catch (error) {
      res.status(500).json({message:'Ocurrio un error' })
    }
  
}
