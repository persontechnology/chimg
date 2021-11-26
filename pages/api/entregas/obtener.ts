
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
    await dbConnect();
    const user = await   Entrega.findById(_id).populate('chofer').populate('vehiculo');
    res.status(200).json(user)
}
