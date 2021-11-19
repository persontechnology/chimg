import initMiddleware from '../../../lib/init-middleware'
import validateMiddleware from '../../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Vehiculo from '../../../models/Vehiculo'

type Data = {
  message: string
}

const validateBody = initMiddleware(
  validateMiddleware([
      check('placa')
      .custom(async(value,{req})=>{
        const {_id}=req.body;
        if(_id){
          const user=await Vehiculo.findOne({placa:value,_id:{$ne:_id}});
          if(user){
            throw new Error('Placa registrado en otro vehículo ');
          }
        }else{
          const choferc=await Vehiculo.findOne({placa:value});
          if(choferc){
            throw new Error('Placa ya esta registrado');
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
      const{_id,marca,modelo,placa,cilindraje,tonelaje,kilometraje,tipo_combustible}=req.body;

      if(_id){
        const user = await Vehiculo.findByIdAndUpdate(_id,{_id,marca,modelo,placa,cilindraje,tonelaje,kilometraje,tipo_combustible,updatedAt:Date.now()})
        res.status(200).json({message:'Vehículo actualizado' })
      }else{
     
        const user_m = await new Vehiculo({marca,modelo,placa,cilindraje,tonelaje,kilometraje,tipo_combustible});
        
        await user_m.save();
        res.status(200).json({message:'Vehículo ingresado' })
      }
      

    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Ocurrio un error'})
    }
  
}
