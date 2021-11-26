
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Entrega from '../../../models/Entrega';

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
      const users = await   Entrega.findOne({_id: _id}).remove().exec();
      res.status(200).json({message:'Entrega eliminado'})
      
    } catch (error) {
      console.log(error)
      res.status(200).json({message:'Ocurrio un error'})
    }
}
