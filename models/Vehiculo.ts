import mongoose  from "mongoose";

const VehiculoSchema=new mongoose.Schema({
    marca:{
        type:String,
        required:true
    }, 
    modelo:{
        type:String,
        required:true
    }, 
    placa:{
        type:String,
        required:true,
        unique:true
    }, 
    cilindraje:{
        type:Number,
        required:true
    }, 
    tonelaje:{
        type:Number,
        required:true
    }, 
    kilometraje:{
        type:Number,
        required:true
    }, 
    tipo_combustible:{
        type:String,
        enum:['Extra','Super','Diesel'],
        default:'Extra'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.models.Vehiculo || mongoose.model('Vehiculo',VehiculoSchema)