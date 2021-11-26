import React,{useState,useEffect,useMemo} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Layout from '../components/layout'
import Head from 'next/head'
import Box from '@mui/material/Box';
import axios from "axios";
import Tabla from "../components/tablasimple";

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
        user: req.session.user,
      },
    };
  },
);

export default function Admin({user}){


const [inicio, setinicio] = useState<Date | null>(new Date)
const [fin, setfin] = useState<Date | null>(new Date)
const [data, setdata] = useState([])


const columns = useMemo(
    () => [
      {
        Header: 'Chofer',
        columns: [
          {
            Header: 'Nombre',
            accessor: 'chofer.nombre',
            disableFilters:true
          },
          {
            Header: 'Cédula',
            accessor: 'chofer.cedula',
            disableFilters:true
          },
        ]
      },
      {
        Header: 'Vehículo',
        columns: [
          {
            Header: 'Marca',
            accessor: 'vehiculo.marca',
            disableFilters:true
          },
          {
            Header: 'Placa',
            accessor: 'vehiculo.placa',
            disableFilters:true
          },
          {
            Header: 'Modelo',
            accessor: 'vehiculo.modelo',
            disableFilters:true
          },
        ]
      },
      {
        Header:'Información',
        columns:[
          {
            Header: 'Referencia entrega',
            accessor: 'referencia_entrega',
            disableFilters:true
          },
          {
            Header: 'Peso viaje',
            accessor: 'peso_viaje',
            disableFilters:true
          },
          
          {
            Header: 'Kilometraje vehículo',
            accessor: 'kilometraje_vehiculo',
            disableFilters:true
          },
          {
            Header: 'Kilometraje calculado',
            accessor: 'kilometraje_calculado',
            disableFilters:true
          },
          {
            Header: 'Valor combustible',
            accessor: 'valor_combustible',
            disableFilters:true
          },
          {
            Header: 'Combustible calculado',
            accessor: 'combustible_calculado',
            disableFilters:true
          },
          {
            Header: 'Distancia rrecorrer',
            accessor: 'distancia_rrecorrer',
            disableFilters:true
          }
          
        ],
        
      },
      {
        Header:'Hora',
        columns:[
          {
            Header: 'programada',
            accessor: 'hora_programada',
            disableFilters:true,
            Cell:({row})=>{
                return (<p>{new Date(row.values.hora_programada).toLocaleString()}</p>)
              }
            
          },
          {
            Header: 'salida',
            accessor: 'hora_salida',
            disableFilters:true,
            Cell:({row})=>{
                if(row.values.hora_salida){
                  return (<p>{new Date(row.values.hora_salida).toLocaleString()}</p>)
                  }else{
                    return <p></p>
                }
                
              }
          },
          {
            Header: 'llegada',
            accessor: 'hora_llegada',
            disableFilters:true,
            Cell:({row})=>{
                if(row.values.hora_llegada){
                return (<p>{new Date(row.values.hora_llegada).toLocaleString()}</p>)
                }else{
                    return <p></p>
                }
              }
            
          }
        ]
      }
      
    ],
    []
  )


  async function getEntregas() {
    return   await axios.post('/api/entregas/reporte', {
        inicio,
        fin
      });
  }

    useEffect(() => {
        (async () => {
            const {data}=await getEntregas()
            setdata(data);
            
        })();
    }, []);
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post('/api/entregas/reporte', {
        inicio,
        fin
      })
      .then(async function (response) {
        const {data}=await getEntregas()
        setdata(data)
      })
      .catch(function (error) {
       
        if (error.response) {
          console.log(error.response.data.message);
        }

        error.response.data.errors.map((v)=>{
          console.log(v.msg)
        })

      });
    } catch (error) {
      console.log(error)
    }
    
   };

 function descargarPdf(){
    var domToPdf = require('dom-to-pdf');

    var element = document.getElementById('reportes');
    var options = {
      filename: 'test.pdf',
      compression:'FAST',
      orientation:'portrait'
      
    };
    domToPdf(element, options, function() {
      console.log('done');
    });
 }
 

    return (
      <Layout user={user}>
        <Head>
        <title>Reportes</title>
        </Head>
        
        <div className="page-content">
          <div className="content-wrapper">
            <div className="card">
                <div className="card-header">
                    
                <Box component="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-12 col-md-5 mt-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="Fecha de inicio"
                                inputFormat="MM/dd/yyyy"
                                value={inicio}
                                onChange={(e)=>setinicio(e)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    </div>
                    <div className="col-sm-12 col-md-5 mt-2">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                label="Fecha de fin"
                                inputFormat="MM/dd/yyyy"
                                value={fin}
                                onChange={(e)=>setfin(e)}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div className="col-sm-12 col-md-2 mt-2">
                        <button type="submit"  className="btn btn-primary btn-block btn-lg">Buscar</button>
                    </div>
                </div>
                </Box>
                </div>
                <div className="card-body">
                <button type="button" onClick={descargarPdf}  className="btn btn-primary btn-block btn-lg">PDF</button>
                    <div className="table-responsive" id="reportes">
                        <Tabla columns={columns} data={data} />
                    </div>
                </div>
            </div>
          </div>
        </div>

      </Layout>
    )
}