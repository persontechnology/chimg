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
import { useRouter } from 'next/router'


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
  
  const router = useRouter()
  const { editar } = router.query

  const [mensaje, setmensaje] = useState('');
  const [chofer, setchofer] = useState('')
  const [vehiculo, setvehiculo] = useState('')
  const [referencia_entrega, setreferencia_entrega] = useState('')
  const [hora_programada, sethora_programada] = useState<Date | null>(new Date)
  const [peso, setpeso] = useState('')
  const [kilometraje_vehiculo_actual, setkilometraje_vehiculo_actual] = useState('')
  const [kilometraje_calculado, setkilometraje_calculado] = useState('')
  const [valor_combustible, setvalor_combustible] = useState('')
  const [combustible_calculado, setcombustible_calculado] = useState('')
  const [tonelaje_vehiculo_actual, settonelaje_vehiculo_actual] = useState('')
  const [distancia_rrecorrer, setdistancia_rrecorrer] = useState('')
  const [lat_a,setlat_a]=useState('')
  const [lng_a,setlng_a]=useState('')
  const [lat_b,setlat_b]=useState('')
  const [lng_b,setlng_b]=useState('')
  const [nombre_chofer, setnombre_chofer] = useState('')
  const [nombre_vehiculo, setnombre_vehiculo] = useState('')

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

  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await axios.post('/api/entregas/nuevo', {
        _id:editar,
        chofer,
        vehiculo,
        referencia_entrega,
        hora_programada,
        peso_viaje:peso,
        kilometraje_vehiculo:kilometraje_vehiculo_actual,
        kilometraje_calculado,
        valor_combustible,
        combustible_calculado,
        distancia_rrecorrer:data.get('distancia_rrecorrer'),
        lat_a:data.get('lat_a'),
        lng_a:data.get('lng_a'),
        lat_b:data.get('lat_b'),
        lng_b:data.get('lng_b'),
      })
      .then(async function (response) {
        router.push('/entregas')

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
    
    await axios.post('/api/entregas/obtener', {
        _id: editar
      })
      .then( async function (response) {
      
        setreferencia_entrega(response.data.referencia_entrega)
        sethora_programada(response.data.hora_programada)
        setpeso(response.data.peso_viaje)
        setkilometraje_vehiculo_actual(response.data.kilometraje_vehiculo)
        setkilometraje_calculado(response.data.kilometraje_calculado)
        setvalor_combustible(response.data.valor_combustible)
        setcombustible_calculado(response.data.combustible_calculado)
        setlat_a(response.data.lat_a)
        setlng_a(response.data.lng_a)
        setlat_b(response.data.lat_b)
        setlng_b(response.data.lng_b)
        setchofer(response.data.chofer._id)
        setvehiculo(response.data.vehiculo._id)
        setnombre_chofer(response.data.chofer.nombre)
        setnombre_vehiculo(response.data.vehiculo.placa+" - "+response.data.vehiculo.marca)
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
  
  })();
    
}, []);

  function calcularKiloComb(e){
    setcombustible_calculado(
      (parseFloat(valor_combustible)*parseFloat(document.getElementById("kilometraje_google_maps").value,10)).toFixed(2)
    )
    setkilometraje_calculado(
      (parseFloat(kilometraje_vehiculo_actual,10)+parseFloat(document.getElementById("kilometraje_google_maps").value,10)).toFixed(2)
    )

  }
    return (
      <Layout user={user}>
        <Head>
        <title>Editar Entregas</title>
        </Head>
        <div className="page-content">
            <div className="content-wrapper">
                <div className="content">
                    
                    <Box component="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="card card-body">
                                
                                    <p>{mensaje}</p>
                                    <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <DataChofer 
                                          nombre_chofer={nombre_chofer} 
                                          setnombre_chofer={setnombre_chofer}
                                          setchofer={setchofer} 
                                          setcombustible_calculado={setcombustible_calculado} 
                                          valor_combustible={valor_combustible} 
                                        />
                                    </Grid>  
                                    <Grid item xs={12}>
                                        <DataVehiculo  
                                            setpeso={setpeso}
                                            setvehiculo={setvehiculo}
                                            setkilometraje_vehiculo_actual={setkilometraje_vehiculo_actual}
                                            settonelaje_vehiculo_actual={settonelaje_vehiculo_actual}
                                            setkilometraje_calculado={setkilometraje_calculado}
                                            setcombustible_calculado={setcombustible_calculado}
                                            valor_combustible={valor_combustible}
                                            setnombre_vehiculo={setnombre_vehiculo}
                                            nombre_vehiculo={nombre_vehiculo}
                                        />
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
                                        
                                        onChange={(e)=>{
                                          setreferencia_entrega(e.target.value);
                                          calcularKiloComb(e)
                                        }}
                                        
                                        />
                                    </Grid>
                                    
                                    
                                        <Grid item xs={12} sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                    label="Hora programada"
                                                    value={hora_programada}
                                                    onChange={(e)=>{sethora_programada(e); calcularKiloComb(e)}}
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
                                                calcularKiloComb(e)
                                              
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
                                                disabled
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
                                                //onChange={(e)=>setkilometraje_calculado(e.target.value)}
                                                disabled
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
                                                    setcombustible_calculado((e.target.value*total_k).toFixed(2))
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
                                                disabled
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
                                    
                                    <Button
                                    type="button"
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                    onClick={()=>router.push('/entregas')}
                                    >
                                    cancelar
                                    </Button>
                                
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="card card-body">
                                  <input type="hidden"  id="kilometraje_google_maps" placeholder="Kilometraje google maps"  />
                                  <input type="hidden" value={lat_a} onChange={(e)=>setlat_a(e.target.value)}  name="lat_a" id="lat_a" placeholder="lat_a" />
                                  <input type="hidden" value={lng_a} onChange={(e)=>setlng_a(e.target.value)}  name="lng_a" id="lng_a" placeholder="lng_a" />
                                  <input type="hidden" value={lat_b} onChange={(e)=>setlat_b(e.target.value)}  name="lat_b" id="lat_b" placeholder="lat_b" />
                                  <input type="hidden" value={lng_b} onChange={(e)=>setlng_b(e.target.value)}  name="lng_b" id="lng_b" placeholder="lng_b" />
                                  <input type="hidden" id="distancia_rrecorrer" placeholder="distancia_rrecorrer" name="distancia_rrecorrer" />
                                <div>
                                <strong>Total distancia a rrecorrer</strong>
                                
                                <div id="kilometraje_rrecorrer"></div>
                                </div>
                                
                                <div id="map" style={{ width:"100%",height:"500px" }}></div>
                                <Script src="/mapa.js" strategy="lazyOnload"/>
                            </div>
                        </div>
                      </div>
                    </Box>
                </div>
            </div>
        </div>
      </Layout>
    )
}