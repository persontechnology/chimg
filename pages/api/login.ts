import dbConnect from "../../lib/dbConnect";
import { withSessionRoute } from "../../lib/withSession";
import User from "../../models/User";
import bcrypt from 'bcryptjs';


export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  
  const {email,password}=await req.body;

  try {
    await dbConnect()
    const user = await User.findOne({ email: email.toLowerCase() });
    if(!user){
      res.status(500).json({ message: 'No existe el usuario' })
    }
    const validarPassword = await bcrypt.compare(password, user.password);
    if(validarPassword===true){
      req.session.user = {
        id: user._id,
        name: user.name,
        email:user.email
      };
      await req.session.save();
      res.status(200).json({ message:'ok' })
    }else{
      res.status(500).json({ message: 'Contraseña incorrecta' })
    }

    
  } catch (error) {
    res.status(500).json({ message: 'No se pudieron cargar los datos' })
  }
  
}