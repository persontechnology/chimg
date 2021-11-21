import React, { useMemo, useState, useEffect,useRef } from "react";
import axios from "axios";
import Layout from '../components/layout'
import Head from 'next/head'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DataVehiculo from './dataVehiculo'
import DataChofer from './dataChofer'
//start login
import { withSessionSsr } from "../../lib/withSession";
import Script from 'next/script'


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
  
  const [mensaje, setmensaje] = useState('');
  const [_id, set_id] = useState('')
  const [chofer, setchofer] = useState('')
  const [vehiculo, setvehiculo] = useState('')
  const [tonelaje_vehiculo_actual, settonelaje_vehiculo_actual] = useState('')
  const [kilometraje_vehiculo_actual, setkilometraje_vehiculo_actual] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [referencia_entrega, setreferencia_entrega] = useState('')
  const [hora_programada, sethora_programada] = useState<Date | null>(new Date)
  const [hora_salida, sethora_salida] = useState<Date | null>(new Date)
  const [tiempo, settiempo] = useState('')
  const [peso, setpeso] = useState('')
  
  const [kilometraje, setkilometraje] = useState('')
  const [kilometraje_calculado, setkilometraje_calculado] = useState('')
  const [valor_combustible, setvalor_combustible] = useState('')
 const [combustible_calculado, setcombustible_calculado] = useState('')

  const myContainer = useRef(null);

  
 
  
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
    console.log("myContainer..", myContainer.current);
    (async () => {

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
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="card card-body">
                                <Box component="form" onSubmit={handleSubmit}>
                                    <p>{mensaje}</p>
                                    <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <DataChofer chofer={chofer} setchofer={setchofer} />
                                        <p>{chofer}</p>
                                    </Grid>  
                                    <Grid item xs={12}>
                                        <DataVehiculo  
                                            setpeso={setpeso}
                                            setvehiculo={setvehiculo}
                                            setkilometraje_vehiculo_actual={setkilometraje_vehiculo_actual}
                                            settonelaje_vehiculo_actual={settonelaje_vehiculo_actual}
                                            setkilometraje_calculado={setkilometraje_calculado}
                                        />
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
                                    
                                    
                                        <Grid item xs={12} sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                    label="Hora programada"
                                                    value={hora_programada}
                                                    onChange={(e)=>sethora_programada(e)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
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
                                            onChange={(e)=>{
                                                if(tonelaje_vehiculo_actual===''){
                                                    setmensaje('SELECIONE UN VEHÍCULO')
                                                    setpeso('')
                                                }else{
                                                    if(e.target.value<=tonelaje_vehiculo_actual)  {
                                                        setpeso(e.target.value)
                                                    }else{
                                                        setpeso(tonelaje_vehiculo_actual)
                                                        setmensaje('PESO NO PUEDE SER MAYOR A: '+tonelaje_vehiculo_actual)
                                                    }
                                                }
                                              
                                            }}
                                            
                                        />
                                        <p>Tonelaje actual: {tonelaje_vehiculo_actual}</p>
                                        </Grid>
                                       

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="kilometraje"
                                                name="kilometraje"
                                                type="number"
                                                required
                                                fullWidth
                                                id="kilometraje"
                                                label="Kilometraje del Vehículo"
                                                value={kilometraje_vehiculo_actual}
                                                onChange={(e)=>{
                                                    setkilometraje_vehiculo_actual(e.target.value)
                                                }}
                                            />
                                        
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="kilometraje_calculado"
                                                name="kilometraje_calculado"
                                                required
                                                fullWidth
                                                id="kilometraje_calculado"
                                                label="Kilometraje calculado"
                                                value={kilometraje_calculado}
                                                onChange={(e)=>setkilometraje_calculado(e.target.value)}
                                                type="number"
                                            />
                                        </Grid>



                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="valor_combustible"
                                                name="valor_combustible"
                                                type="number"
                                                required
                                                fullWidth
                                                id="valor_combustible"
                                                label="Valor combustible"
                                                value={valor_combustible}
                                                onChange={(e)=>{
                                                    setvalor_combustible(e.target.value)

                                                    const total_k=document.getElementById('kilometraje_google_maps').value;
                                                    
                                                    setcombustible_calculado(e.target.value*total_k)
                                                    
                                                    

                                                }}
                                            />
                                        
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="combustible_calculado"
                                                name="combustible_calculado"
                                                required
                                                fullWidth
                                                id="combustible_calculado"
                                                label="Combustible calculado"
                                                value={combustible_calculado}
                                                onChange={(e)=>setcombustible_calculado(e.target.value)}
                                                type="number"
                                            />
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
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="card card-body">
                                <input type="hidden"  id="kilometraje_google_maps"  />
                                 
                                <div>
                                <strong>Total distancia a rrecorrer</strong>
                                <div id="kilometraje_rrecorrer"></div>
                                </div>
                                
                                <div id="map" style={{ width:"100%",height:"500px" }}></div>
                                <Script src="/mapa.js" strategy="beforeInteractive"/>
                                <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATEt0xCISuZN2TDB8WStqSBpgX3Y3an98&callback=initMap&v=weekly"  async/>
                            </div>
                        </div>
                    </div>
                
                
                </div>
            </div>
        </div>
      </Layout>
    )
}