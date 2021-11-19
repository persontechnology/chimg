
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

  await dbConnect();
  const listado = await Chofer.find().sort({updatedAt:-1});
  const choferes=[];
  listado.map(function(x){
    choferes.push(
      {
        label:x.nombre,
        _id:x._id, 
        nombre:x.nombre,
        cedula:x.cedula, 
        telefono:x.telefono, 
        tipo_licencia:x.tipo_licencia
      }
    )
  })
  res.status(200).json(choferes)
}
