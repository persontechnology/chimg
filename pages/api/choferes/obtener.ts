
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Chofer from '../../../models/Chofer';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const {_id}=req.body;
    await dbConnect();
    const user = await   Chofer.findById(_id);
    res.status(200).json({
      _id:user._id,
      nombre:user.nombre,
      cedula:user.cedula,
      telefono:user.telefono,
      tipo_licencia:user.tipo_licencia
    })
}
