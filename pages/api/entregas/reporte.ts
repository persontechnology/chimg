
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Entrega from '../../../models/Entrega';
import moment from 'moment-timezone'
type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await dbConnect();
  const {inicio,fin}=req.body;


  var manana = moment(new Date(fin)).add(1, 'days').format("YYYY-MM-DD");
  var hoy = moment(new Date(inicio)).format("YYYY-MM-DD");

  const choferes = await Entrega.find(
    {"createdAt":{ $gte: new Date(hoy),$lte: new Date(manana)}}
  ).sort({updatedAt:-1}).populate('chofer').populate('vehiculo');
  res.status(200).json(choferes)
}
