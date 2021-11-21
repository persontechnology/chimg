import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/tabla";
import Layout from '../components/layout'
import Head from 'next/head'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

//start login
import { withSessionSsr } from "../../lib/withSession";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    return {
      props: {
        user: req.session.user
      },
    };
  },
);
//end login

export default function Index({user}){

  const [data, setData] = useState([]);
  const [mensaje, setmensaje] = useState('');
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [id, setid] = useState('')
  const [admin, setadmin] = useState(false)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>  {
    setOpen(false)
    setmensaje('')
    vaciarCajas()
  };


  function vaciarCajas(){
    setname('')
    setemail('')
    setpassword('')
    setid('')
    setadmin(false)
  }

  function Opciones({id}){
    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={()=>getUserId({id})}><EditIcon/></Button>
        <Button color="error" onClick={()=>eliminar({id})} ><DeleteIcon/></Button>
      </ButtonGroup>
    )
  }
  
  async function eliminar({id}){
    await axios.post('/api/usuarios/eliminar', {
      id: id
    })
    .then( async function (response) {
      const {data}=await getUsers()
      setData(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Usuario',
        accessor: 'name',
        filter: "text"
      },
      {
        Header: 'Email',
        accessor: 'email',
        filter: "text"
      },
      {
        Header: 'Opción', // No header
        accessor:'_id',
        Cell: ({ row }) => (
          <Opciones id={row.values._id}/>
        ),
        disableFilters:true,
      },
    ],
    []
  )


  async function getUsers() {
    return await axios.get('/api/usuarios/listado');
  }

  async function getUserId({id}) {
    await axios.post('/api/usuarios/obtener', {
      id: id
    })
    .then( async function (response) {
      setOpen(true)
      setemail(response.data.email)
      setname(response.data.name)
      setid(response.data.id)
      setadmin(response.data.admin)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    (async () => {
      const {data}=await getUsers()
      setData(data);
    })();
  }, []);
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
   await axios.post('/api/usuarios/nuevo', {
      id,
      name,
      email,
      password,
      admin
    })
    .then(async function (response) {
      const {data}=await getUsers()
      setData(data)
      setmensaje(response.data.message);
      vaciarCajas()
    })
    .catch(function (error) {
      if (error.response) {
        setmensaje(error.response.data.message);
      }
    });
   };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    return (
      <Layout user={user}>
        <Head>
        <title>Principal</title>
        </Head>
        <div className="page-content">
            <div className="content-wrapper">
                <div className="content">
                <Button onClick={handleOpen}>Nuevo usuario</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  
                    <Box component="form" onSubmit={handleSubmit} sx={style}>
                    <p>{mensaje}</p>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre de usuario"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(event)=>setname(event.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event)=>setemail(event.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(event)=>setpassword(event.target.value)}
                      />
                    
                    <FormGroup>
                      <FormControlLabel control={<Switch checked={admin} value={admin} onChange={(e)=>setadmin(e.target.checked)} />} label="Es administrador" />
                    </FormGroup>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Guardar
                      </Button>
                    </Box>
                  
                </Modal>
                <Tabla columns={columns} data={data} />
                </div>
            </div>
        </div>
      </Layout>
    )
}