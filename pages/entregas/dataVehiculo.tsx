import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";

export default function ComboBox({
    setpeso,
    setvehiculo,
    settonelaje_vehiculo_actual,
    setkilometraje_vehiculo_actual,
    setkilometraje_calculado
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
            id="combo-box-demo"
            onChange={
                (e,v)=>{
                    if(v){
                        setvehiculo(v._id)
                        settonelaje_vehiculo_actual(v.tonelaje)
                        setpeso(v?.tonelaje)
                        setkilometraje_vehiculo_actual(v.kilometraje)
                        const kv_actual =document.getElementById('kilometraje_google_maps').value;
                        setkilometraje_calculado(parseFloat(kv_actual)+parseFloat(v.kilometraje))
                    }else{
                        setvehiculo('')
                        setpeso('')
                        settonelaje_vehiculo_actual('')
                        setkilometraje_vehiculo_actual('')
                        setkilometraje_calculado('')
                    }
                    
                }
            }
            options={data}
            renderInput={(params) => 
            <TextField 
                {...params} 
                label="Vehículos" 
                fullWidth
            />}
        />
    );
}


