
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

  await dbConnect();
  const choferes = await Entrega.find().sort({updatedAt:-1}).populate('chofer').populate('vehiculo');
  res.status(200).json(choferes)
}
