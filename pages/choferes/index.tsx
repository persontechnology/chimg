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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
  const [_id, set_id] = useState('')
  const [nombre, setnombre] = useState('')
  const [cedula, setcedula] = useState('')
  const [telefono, settelefono] = useState('')
  const [tipo_licencia, settipo_licencia] = useState('C')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>  {
    setOpen(false)
    setmensaje('')
    vaciarCajas()
  };


  function vaciarCajas(){
    set_id('')
    setnombre('')
    setcedula('')
    settelefono('')
    settipo_licencia('C')
  }

  function Opciones({id}){
    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={()=>getChoferId({id})}><EditIcon/></Button>
        <Button color="error" onClick={()=>eliminar({id})} ><DeleteIcon/></Button>
      </ButtonGroup>
    )
  }
  
  async function eliminar({id}){
    await axios.post('/api/choferes/eliminar', {
      _id: id
    })
    .then( async function (response) {
      const {data}=await getChoferes()
      setData(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
        filter: "text"
      },
      {
        Header: 'Cédula',
        accessor: 'cedula',
        filter: "text"
      },
      {
        Header: 'Teléfono',
        accessor: 'telefono',
        filter: "text"
      },
      {
        Header: 'Tipo licencia',
        accessor: 'tipo_licencia',
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


  async function getChoferes() {
    return await axios.get('/api/choferes/listado');
  }

  async function getChoferId({id}) {
    
    await axios.post('/api/choferes/obtener', {
      _id: id
    })
    .then( async function (response) {
      set_id(response.data._id)
      setnombre(response.data.nombre)
      setcedula(response.data.cedula)
      settelefono(response.data.telefono)
      settipo_licencia(response.data.tipo_licencia)
      setOpen(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    (async () => {
      const {data}=await getChoferes()
      setData(data);
    })();
  }, []);
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post('/api/choferes/nuevo', {
        _id,
        nombre,
        cedula,
        telefono,
        tipo_licencia
      })
      .then(async function (response) {
        const {data}=await getChoferes()
        setData(data)
        setmensaje(response.data.message);
        vaciarCajas()
      })
      .catch(function (error) {
       
        if (error.response) {
          setmensaje(error.response.data.message);
        }

        if(error.response.data.errors){
          setmensaje(JSON.stringify(error.response.data.errors))
        }
      });
    } catch (error) {
      console.log(error)
    }
    
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
        <title>Choferes</title>
        </Head>
        <div className="page-content">
            <div className="content-wrapper">
                <div className="content">
                <Button onClick={handleOpen}>Nuevo chofer</Button>
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
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="nombre"
                        autoFocus
                        value={nombre}
                        onChange={(event)=>setnombre(event.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="cedula"
                        label="Cédula"
                        name="cedula"
                        autoComplete="cedula"
                        value={cedula}
                        onChange={(event)=>setcedula(event.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="telefono"
                        label="Teléfono"
                        id="telefono"
                        value={telefono}
                        autoComplete="current-password"
                        onChange={(event)=>settelefono(event.target.value)}
                      />
                    
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo de licencia</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tipo_licencia}
                          label="Tipo de licencia"
                          onChange={(e)=>settipo_licencia(e.target.value)}
                        >
                          <MenuItem value='C'>C</MenuItem>
                          <MenuItem value='D'>D</MenuItem>
                          <MenuItem value='E'>E</MenuItem>
                          <MenuItem value='G'>G</MenuItem>
                        </Select>
                      </FormControl>
                      
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