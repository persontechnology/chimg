
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Vehiculo from '../../../models/Vehiculo';


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {_id}=req.body;
    try {
      await dbConnect();
      const users = await   Vehiculo.findOne({_id: _id}).remove().exec();
      res.status(200).json({message:'Vehículo eliminado'})
      
    } catch (error) {
      console.log(error)
      res.status(200).json({message:'Ocurrio un error'})
    }
}
