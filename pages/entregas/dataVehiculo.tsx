import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";

export default function ComboBox({
    setpeso,
    setvehiculo,
    settonelaje_vehiculo_actual,
    setkilometraje_vehiculo_actual,
    setkilometraje_calculado,
    setcombustible_calculado,
    valor_combustible,
    setnombre_vehiculo,
    nombre_vehiculo
}) {

    const [data, setdata] = useState([])
    
    useEffect(() => {
        (async () => {
            const {data}= await axios.get('/api/vehiculos/listado');
            await setdata(data)
        
        })();
        
    }, []);
    return (
        <Autocomplete
            disablePortal
            value={nombre_vehiculo}
            id="combo-box-demo"
            onChange={
                (e,v)=>{
                    if(v){
                        setnombre_vehiculo(v.placa+" - "+v.marca)
                        setvehiculo(v._id)
                        settonelaje_vehiculo_actual(v.tonelaje)
                        setpeso(v?.tonelaje)
                        setkilometraje_vehiculo_actual(parseFloat(v.kilometraje,10).toFixed(2))
                        const kv_actual =document.getElementById('kilometraje_google_maps').value;
                        setkilometraje_calculado((parseFloat(kv_actual,10)+parseFloat(v.kilometraje,10)).toFixed(2))
                        
                    }else{
                        setvehiculo('')
                        setpeso('')
                        settonelaje_vehiculo_actual('')
                        setkilometraje_vehiculo_actual('')
                        setkilometraje_calculado('')
                    }
                    setcombustible_calculado(
                        (valor_combustible*parseFloat(document.getElementById("kilometraje_google_maps").value,10)).toFixed(2)
                    )
                }
            }
            options={data}
            renderInput={(params) => 
            <TextField 
                {...params} 
                label="Vehículos" 
                fullWidth
                required
            />}
        />
    );
}


