
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
    const user = await   User.findById(id);
    res.status(200).json({id:user._id,name:user.name,email:user.email})
}
