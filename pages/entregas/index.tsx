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
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { formatDistance} from 'date-fns'
import { es } from 'date-fns/locale'
import DataVehiculo from './dataVehiculo'
import DataChofer from './dataChofer'
//start login
import { withSessionSsr } from "../../lib/withSession";
import Mapa from "./mapa";


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
  
  
  const [data, setdata] = useState([])
  const [mensaje, setmensaje] = useState('');
  
  const [_id, set_id] = useState('')
  const [chofer, setchofer] = useState('')
  const [vehiculo, setvehiculo] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [referencia_entrega, setreferencia_entrega] = useState('')
  const [hora_programada, sethora_programada] = useState<Date | null>(new Date)
  const [hora_salida, sethora_salida] = useState<Date | null>(new Date)
  const [tiempo, settiempo] = useState('')
  const [peso, setpeso] = useState('')
  const [unidad, setunidad] = useState('')
  const [kilometraje, setkilometraje] = useState('')
  const [kilometraje_actual, setkilometraje_actual] = useState('')
  const [valor_combustible, setvalor_combustible] = useState('')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>  {
    setOpen(false)
    setmensaje('')
    vaciarCajas()
  };
  

  function vaciarCajas(){
    set_id('')
    setchofer('')
    setvehiculo('')
    setubicacion('')
    setreferencia_entrega(new Date())
    sethora_programada(new Date())
    sethora_salida(new Date())
    settiempo('')
    setpeso('')
    setunidad('')
    setkilometraje('')
    setkilometraje_actual('')
    setvalor_combustible('')
    setOpen(false)
  }

  function Opciones({id}){
    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={()=>getVehiculoId({id})}><EditIcon/></Button>
        <Button color="error" onClick={()=>eliminar({id})} ><DeleteIcon/></Button>
      </ButtonGroup>
    )
  }
  
  async function eliminar({id}){
    await axios.post('/api/entregas/eliminar', {
      _id: id
    })
    .then( async function (response) {
      const {data}=await getEntregas()
      setData(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

 
  const columns = useMemo(
    () => [
      {
        Header: 'Chofer',
        accessor: 'chofer',
        filter: "text"
      },
      {
        Header: 'Vehículo',
        accessor: 'vehiculo',
        filter: "text"
      },
      {
        Header: 'Referencia entrega',
        accessor: 'referencia_entrega',
        filter: "text"
      },
      {
        Header: 'hora programada',
        accessor: 'hora_programada',
        filter: 'equals',
      },
      {
        Header: 'Hora salida',
        accessor: 'hora_salida',
        filter: "text"
      },
      {
        Header: 'Tiempo',
        accessor: 'tiempo',
        filter: "text"
      },
      {
        Header: 'Peso',
        accessor: 'peso',
        filter: "text"
      },
      {
        Header: 'Unidad',
        accessor: 'unidad',
        filter: "text"
      },
      {
        Header: 'Kilometraje',
        accessor: 'kilometraje',
        filter: "text"
      },
      {
        Header: 'Kilometraje actual',
        accessor: 'kilometraje_actual',
        filter: "text"
      },
      {
        Header: 'Valor combustible',
        accessor: 'valor_combustible',
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


  async function getEntregas() {
    return await axios.get('/api/entregas/listado');
  }

  async function getEntregaId({id}) {
    
    await axios.post('/api/entregas/obtener', {
      _id: id
    })
    .then( async function (response) {
      set_id(response.data._id)
      //setchofer('')
      //setvehiculo('')
      setreferencia_entrega(response.data.referencia_entrega)
      sethora_programada(response.data.hora_programada)
      sethora_salida(response.data.hora_salida)
      settiempo(response.data.tiempo)
      setpeso(response.data.peso)
      setunidad(response.data.unidad)
      setkilometraje(response.data.kilometraje)
      setkilometraje_actual(response.data.kilometraje_actual)
      setvalor_combustible(response.data.valor_combustible)
      setubicacion(response.data.ubicacion)
      setOpen(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post('/api/entregas/nuevo', {
        _id,
        chofer,
        vehiculo,
        referencia_entrega,
        hora_programada,
        hora_salida,
        tiempo,
        peso,
        unidad,
        kilometraje,
        kilometraje_actual,
        valor_combustible,
        ubicacion
      })
      .then(async function (response) {
        const {data}=await getEntregas()
        setdata(data)
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

   useEffect(() => {
    (async () => {
        const {data}= await axios.get('/api/entregas/listado');
        await setdata(data)
    
    })();
    
}, []);


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow:'scroll',
    p: 4,
    height:'90%',
  };

    return (
      <Layout user={user}>
        <Head>
        <title>Entregas</title>
        </Head>
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
                        <Grid item xs={12}>
                          <DataChofer chofer={chofer} setchofer={setchofer} />
                          <p>{chofer}</p>
                        </Grid>  
                        <Grid item xs={12}>
                            <DataVehiculo vehiculo={vehiculo} setvehiculo={setvehiculo} />
                            <p>{vehiculo}</p>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="referencia_entrega"
                            name="referencia_entrega"
                            required
                            fullWidth
                            id="referencia_entrega"
                            label="Referencia entrega"
                            value={referencia_entrega}
                            onChange={(e)=>setreferencia_entrega(e.target.value)}
                            
                          />
                        </Grid>
                        
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Grid item xs={12} sm={6}>
                            <TimePicker
                                label="Hora programada"
                                value={hora_programada}
                                onChange={(e)=>sethora_programada(e)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TimePicker
                                label="Hora salida"
                                value={hora_salida}
                                onChange={(e)=>{
                                    sethora_salida(e)
                                    settiempo(formatDistance(hora_salida, hora_programada, { addSuffix: true,locale:es }))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <p>Tiempo: {tiempo}</p>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="peso"
                                name="peso"
                                type="number"
                                required
                                fullWidth
                                id="peso"
                                label="Peso de viaje"
                                value={peso}
                                onChange={(e)=>setpeso(e.target.value)}
                                
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="unidad"
                                name="unidad"
                                required
                                fullWidth
                                id="unidada"
                                label="Unidad de peso"
                                value={unidad}
                                onChange={(e)=>setunidad(e.target.value)}
                                
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="kilometraje"
                                name="kilometraje"
                                type="number"
                                required
                                fullWidth
                                id="kilometraje"
                                label="Kilometraje"
                                value={kilometraje}
                                onChange={(e)=>setkilometraje(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="kilometraje_actual"
                                name="kilometraje_actual"
                                required
                                fullWidth
                                id="kilometraje_actual"
                                label="Kilometraje actual"
                                value={kilometraje_actual}
                                onChange={(e)=>setkilometraje_actual(e.target.value)}
                                type="number"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                                autoComplete="valor_combustible"
                                name="valor_combustible"
                                required
                                fullWidth
                                id="valor_combustible"
                                label="Valor combustible"
                                value={valor_combustible}
                                onChange={(e)=>setvalor_combustible(e.target.value)}
                                type="number"
                            />
                          </Grid>
                          <Grid item xs={12}>
                           <p>Lugar</p>
                            <Mapa ubicacion={ubicacion} setubicacion={setubicacion}/>
                            <p>{ubicacion}</p>
                          </Grid>

                        </LocalizationProvider>
                        
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