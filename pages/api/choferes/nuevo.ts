import initMiddleware from '../../../lib/init-middleware'
import validateMiddleware from '../../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Chofer from '../../../models/Chofer';

type Data = {
  message: string
}

const validateBody = initMiddleware(
  validateMiddleware([
      check('cedula')
      .custom(async(value,{req})=>{
        const {_id}=req.body;
        if(_id){
          const user=await Chofer.findOne({cedula:value,_id:{$ne:_id}});
          if(user){
            throw new Error('Cédula registrado en otro chofer ');
          }
        }else{
          const choferc=await Chofer.findOne({cedula:req.body.cedula});
          if(choferc){
            throw new Error('Cédula ya esta registrado');
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

    try {
      await dbConnect();
      const{_id,nombre,cedula,telefono,tipo_licencia}=req.body;

      if(_id){
        const user = await Chofer.findByIdAndUpdate(_id,{nombre,cedula,telefono,tipo_licencia})
        res.status(200).json({message:'Chofer actualizado' })
      }else{
     
        const user_m = await new Chofer({
          nombre,
          cedula,
          telefono,
          tipo_licencia
        });
        
        await user_m.save();
        res.status(200).json({message:'Chofer ingresado' })
      }
      

    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Ocurrio un error'})
    }
  
}
