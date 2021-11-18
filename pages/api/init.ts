
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User';
import bcrypt from 'bcryptjs';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await dbConnect();
  const email=process.env.EMAIL_ADMIN;
  const user = await User.findOne({ email: email });
  if (!user) {
    const hashPassword = await bcrypt.hash(email, 10);
    const user = await new User({
      name:email,
      email,
      password: hashPassword,
    });
    await user.save();
  }
  return res.redirect('/login')
}
