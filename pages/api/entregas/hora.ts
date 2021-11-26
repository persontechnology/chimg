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
   
  const {
    _id,
    op
  }=req.body;


    try {
      await dbConnect();
      
      console.log(req.body)

      if(op==='Salida'){
        const user = await Entrega.findByIdAndUpdate(_id,{
            hora_salida:Date.now()
        })
      }else{
        const user = await Entrega.findByIdAndUpdate(_id,{
            hora_llegada:Date.now()
        })
      }
      res.status(200).json({message:'Entrega actualizado' })

    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Ocurrio un error'})
    }
  
}
