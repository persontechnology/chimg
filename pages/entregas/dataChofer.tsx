import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";

export default function ComboBox({
    setchofer,
    setcombustible_calculado,
    valor_combustible,
    setnombre_chofer,
    nombre_chofer
}) {
    
    const [data, setdata] = useState([])
    
    useEffect(() => {
        (async () => {
            const {data}= await axios.get('/api/choferes/listado');         
            await setdata(data)
        })();
        
    }, []);
    return (
        <Autocomplete
            disablePortal
            value={nombre_chofer}
            id="combo-box-demo"
            onChange={
                (e,v)=>{
                    setnombre_chofer(v?.nombre)
                    setchofer(v?._id);
                    setcombustible_calculado(
                        (valor_combustible*parseFloat(document.getElementById("kilometraje_google_maps").value,10)).toFixed(2)
                      )
                }
            }
            options={data}
            renderInput={(params) => 
            <TextField 
                {...params} 
                label="Choferes" 
                required
                fullWidth
            />}
        />
    );
}


