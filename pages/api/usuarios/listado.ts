
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

  await dbConnect();
  const users = await User.find().select(['name','email']).sort({updatedAt:-1});
  res.status(200).json(users)
}
