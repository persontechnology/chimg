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
   

    try {
      await dbConnect();
      const{
        _id,
        chofer,
        vehiculo,
        referencia_entrega,
        hora_programada,
        hora_salida,
        tiempo,
        peso,
        unidad,
        kilometraje,
        kilometraje_actual,
        valor_combustible,
        ubicacion
      }=req.body;

      if(_id){
        const user = await Entrega.findByIdAndUpdate(_id,{
            _id,
            chofer,
            vehiculo,
            referencia_entrega,
            hora_programada,
            hora_salida,
            tiempo,
            peso,
            unidad,
            kilometraje,
            kilometraje_actual,
            valor_combustible,
            ubicacion,
            updatedAt:Date.now()
        })
        res.status(200).json({message:'Entrega actualizado' })
      }else{
     
        const user_m = await new Entrega({
            chofer,
            vehiculo,
            referencia_entrega,
            hora_programada,
            hora_salida,
            tiempo,
            peso,
            unidad,
            kilometraje,
            kilometraje_actual,
            valor_combustible,
            ubicacion,
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
