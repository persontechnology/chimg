import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";

export default function ComboBox({vehiculo,setvehiculo}) {

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
                (e,v)=>setvehiculo(v?._id)
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


