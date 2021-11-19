
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

  await dbConnect();
  const choferes = await Vehiculo.find().sort({updatedAt:-1});
  const data=[];
  choferes.map(function(user){
    data.push(
      {
        _id:user._id,
        marca:user.marca,
        modelo:user.modelo,
        placa:user.placa,
        cilindraje:user.cilindraje,
        tonelaje:user.tonelaje,
        kilometraje:user.kilometraje,
        tipo_combustible:user.tipo_combustible,
        label:`${user.placa} - ${user.marca}`
      }
    )
  })
  res.status(200).json(data)
}
