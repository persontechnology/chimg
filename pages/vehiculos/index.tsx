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
import Grid from '@mui/material/Grid';
import  SimpleSnackbar from '../components/SimpleSnackbar'

//start login
import { withSessionSsr } from "../../lib/withSession";
import Alerta from "../components/alerta";

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
  const [marca, setmarca] = useState('')
  const [modelo, setmodelo] = useState('')
  const [placa, setplaca] = useState('')
  const [cilindraje, setcilindraje] = useState(0)
  const [tonelaje, settonelaje] = useState(0)
  const [kilometraje, setkilometraje] = useState(0)
  const [tipo_combustible, settipo_combustible] = useState('Extra')
  const [open, setOpen] = useState(false);
  const [noty, setnoty] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () =>  {
    setOpen(false)
    setmensaje('')
    vaciarCajas()
    setnoty(false)
  };


  function vaciarCajas(){
    set_id('')
    setmarca('')
    setmodelo('')
    setplaca('')
    setcilindraje(0)
    settonelaje(0)
    setkilometraje(0)
    settipo_combustible('Extra')
  }

  function Opciones({id}){
    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={()=>getVehiculoId({id})}><EditIcon/></Button>
        <SimpleSnackbar eliminar={()=>{eliminar({id})}}/>
      </ButtonGroup>
    )
  }
  
  async function eliminar({id}){
    await axios.post('/api/vehiculos/eliminar', {
      _id: id
    })
    .then( async function (response) {
      const {data}=await getVehiculos()
      setData(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

 
  const columns = useMemo(
    () => [
      {
        Header: 'Marca',
        accessor: 'marca',
        filter: "text"
      },
      {
        Header: 'Modelo',
        accessor: 'modelo',
        filter: "text"
      },
      {
        Header: 'Placa',
        accessor: 'placa',
        filter: "text"
      },
      {
        Header: 'Cilindraje',
        accessor: 'cilindraje',
        filter: 'equals',
      },
      {
        Header: 'Tonelaje',
        accessor: 'tonelaje',
        filter: "text"
      },
      {
        Header: 'Kilometraje',
        accessor: 'kilometraje',
        filter: "text"
      },
      {
        Header: 'Tipo combustible',
        accessor: 'tipo_combustible',
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


  async function getVehiculos() {
    return await axios.get('/api/vehiculos/listado');
  }

  async function getVehiculoId({id}) {
    
    await axios.post('/api/vehiculos/obtener', {
      _id: id
    })
    .then( async function (response) {
      set_id(response.data._id)
      setmarca(response.data.marca)
      setmodelo(response.data.modelo)
      setplaca(response.data.placa)
      setcilindraje(response.data.cilindraje)
      settonelaje(response.data.tonelaje)
      setkilometraje(response.data.kilometraje)
      settipo_combustible(response.data.tipo_combustible)
      setOpen(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    (async () => {
      const {data}=await getVehiculos()
      setData(data);
    })();
  }, []);
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post('/api/vehiculos/nuevo', {
        _id,
        marca,
        modelo,
        placa,
        cilindraje,
        tonelaje,
        kilometraje,
        tipo_combustible
      })
      .then(async function (response) {
        const {data}=await getVehiculos()
        setData(data)
        setmensaje(response.data.message);
        vaciarCajas()
        handleClose()
        setnoty(true)
      })
      .catch(function (error) {
       
        if (error.response) {
          setmensaje(error.response.data.message);
        }
        error.response.data.errors.map((v)=>{
          setmensaje(v.msg)
        })
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
        <title>Vehículos</title>
        </Head>
        {
          noty?<Alerta mensaje="Vehículo guardado" />:<></>
        }
        <div className="page-content">
            <div className="content-wrapper">
                <div className="content">
                <Button onClick={handleOpen}>Nuevo vehículo</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  
                    <Box component="form" onSubmit={handleSubmit} sx={style}>
                      <p>{mensaje}</p>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="marca"
                            name="marca"
                            required
                            fullWidth
                            id="marca"
                            label="Marca"
                            value={marca}
                            onChange={(e)=>setmarca(e.target.value)}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="modelo"
                            label="Modelo"
                            value={modelo}
                            onChange={(e)=>setmodelo(e.target.value)}
                            name="modelo"
                            autoComplete="modelo"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="placa"
                            label="Placa"
                            name="placa"
                            autoComplete="placa"
                            value={placa}
                            onChange={(e)=>{setplaca(e.target.value)}}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            name="cilindraje"
                            label="Cilindraje"
                            type="number"
                            id="cilindraje"
                            autoComplete="cilindraje"
                            value={cilindraje}
                            onChange={(e)=>{setcilindraje(e.target.value)}}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            name="tonelaje"
                            label="Tonelaje"
                            type="number"
                            id="tonelaje"
                            autoComplete="tonelaje"
                            value={tonelaje}
                            onChange={(e)=>{settonelaje(e.target.value)}}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            name="kilometraje"
                            label="Kilometraje"
                            type="number"
                            id="kilometraje"
                            autoComplete="kilometraje"
                            value={kilometraje}
                            onChange={(e)=>{setkilometraje(e.target.value)}}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de combustible</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={tipo_combustible}
                              label="Tipo de combustible"
                              onChange={(e)=>settipo_combustible(e.target.value)}
                            >
                              <MenuItem value='Extra'>Extra</MenuItem>
                              <MenuItem value='Super'>Super</MenuItem>
                              <MenuItem value='Diesel'>Diesel</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        
                      </Grid>
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