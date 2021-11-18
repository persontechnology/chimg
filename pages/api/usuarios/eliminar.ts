
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const {id}=req.body;
    await dbConnect();
    const users = await   User.findOne({_id: id}).remove().exec();
    res.status(200).json({message:'Usuario eliminado'})
}
