import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/tabla";
import Layout from '../components/layout'
import Head from 'next/head'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { withSessionSsr } from "../../lib/withSession";
import Switch from '@mui/material/Switch';
import Link from 'next/link'
import { useRouter } from 'next/router'
import SimpleSnackbar from "../components/SimpleSnackbar";


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


  async function eliminar({id}){
    await axios.post('/api/entregas/eliminar', {
      _id: id
    })
    .then( async function (response) {
      const {data}=await getEntregas()
      setdata(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  function Opciones({id}){
    const myurl=`/entregas/${id}`;
    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        
      
        <a className="btn btn-primary btn-sm" href={myurl}>
          <EditIcon/>
        </a>
        <SimpleSnackbar eliminar={()=>{eliminar({id})}}/>
        {/* <Button color="error" onClick={()=>eliminar({id})} ><DeleteIcon/></Button> */}
      </ButtonGroup>
    )
  }
  
  
  
  async function cambiarHora(e,op){
    await axios.post('/api/entregas/hora', {
      _id: e,
      op:op
    })
    .then( async function (response) {
      const {data}=await getEntregas()
      setdata(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  function Salida({id,op}) {
     return (
      <Switch {...label} onClick={(e)=>{cambiarHora(id,op)}} />
    )
  }
 
  const columns = useMemo(
    () => [
      {
        Header: 'Chofer',
        columns: [
          {
            Header: 'Nombre',
            accessor: 'chofer.nombre',
          },
          {
            Header: 'Cédula',
            accessor: 'chofer.cedula',
          },
        ],
        filter: "text"
      },
      {
        Header: 'Vehículo',
        columns: [
          {
            Header: 'Marca',
            accessor: 'vehiculo.marca',
          },
          {
            Header: 'Placa',
            accessor: 'vehiculo.placa',
          },
          {
            Header: 'Modelo',
            accessor: 'vehiculo.modelo',
          },
        ],
        filter: "text"
      },
      {
        Header:'Información',
        columns:[
          {
            Header: 'Referencia entrega',
            accessor: 'referencia_entrega',
            filter: "text"
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
            filter: 'equals',
            accessor: 'hora_programada',
            className:'bg bg-danger',
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
                return (<Salida id={row.values._id} op="Salida"/>)
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
                return (<Salida id={row.values._id} op="Llegada"/>)
              }
            }
          }
        ]
      },
      {
        Header: 'Opción',
        columns:[
          {
            accessor:'_id',
            Cell: ({ row }) => (
              <Opciones id={row.values._id}/>
            ),
            disableFilters:true,
          }
        ]
            
      }
      
    ],
    []
  )


  async function getEntregas() {
    return await axios.get('/api/entregas/listado');
  }


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
                <a href="/entregas/nuevo" className="btn btn-link">Nueva entrega</a>
                <Tabla columns={columns} data={data} />
                </div>
            </div>
        </div>
      </Layout>
    )
}