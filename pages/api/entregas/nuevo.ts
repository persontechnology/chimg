import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Entrega from '../../../models/Entrega';
import moment from 'moment-timezone';

type Data = {
  message: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   
  const {
    _id,
    chofer,
    vehiculo,
    referencia_entrega,
    hora_programada,
    peso_viaje,
    kilometraje_vehiculo,
    kilometraje_calculado,
    valor_combustible,
    combustible_calculado,
    distancia_rrecorrer,
    lat_a,
    lng_a,
    lat_b,
    lng_b,
  }=req.body;


    try {
      await dbConnect();
      
      console.log(req.body)

      if(_id){
        const user = await Entrega.findByIdAndUpdate(_id,{
          chofer,
          vehiculo,
          referencia_entrega,
          hora_programada,
          peso_viaje,
          kilometraje_vehiculo,
          kilometraje_calculado,
          valor_combustible,
          combustible_calculado,
          distancia_rrecorrer,
          lat_a,
          lng_a,
          lat_b,
          lng_b,
          updatedAt:Date.now()
        })
        res.status(200).json({message:'Entrega actualizado' })
      }else{
     
        const user_m = await new Entrega({
          chofer,
          vehiculo,
          referencia_entrega,
          hora_programada,
          peso_viaje,
          kilometraje_vehiculo,
          kilometraje_calculado,
          valor_combustible,
          combustible_calculado,
          distancia_rrecorrer,
          lat_a,
          lng_a,
          lat_b,
          lng_b,
          updatedAt:Date.now()
        });
        
        await user_m.save();
        res.status(200).json({message:'Entrega ingresado' })
      }
      

    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Ocurrio un error'})
    }
  
}
