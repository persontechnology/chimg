
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
    await dbConnect();
    const user = await   Vehiculo.findById(_id);
    res.status(200).json({
      _id:user._id,
      marca:user.marca,
      modelo:user.modelo,
      placa:user.placa,
      cilindraje:user.cilindraje,
      tonelaje:user.tonelaje,
      kilometraje:user.kilometraje,
      tipo_combustible:user.tipo_combustible
    })
}
