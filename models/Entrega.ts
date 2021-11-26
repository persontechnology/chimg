import mongoose, { mongo } from "mongoose";
const Schema=mongoose.Schema;

const EntregaSchema=new Schema({
    
    chofer:{
        type:Schema.Types.ObjectId,
        ref:'Chofer'
    },
    vehiculo:{
        type:Schema.Types.ObjectId,
        ref:'Vehiculo'
    },
    referencia_entrega:{
        type:String,
        required:true
    },
    hora_programada:{
        type:Date
    },
    hora_salida:{
        type:Date
    },
    hora_llegada:{
        type:Date
    },
    peso_viaje:{
        type:Number
    },
    kilometraje_vehiculo:{
        type:String
    },
    kilometraje_calculado:{
        type:Number
    },
    valor_combustible:{
        type:Number
    },
    combustible_calculado:{
        type:Number
    },
    distancia_rrecorrer:{
        type:String
    },
    lat_a:{
        type:String
    },
    lng_a:{
        type:String
    },
    lat_b:{
        type:String
    },
    lng_b:{
        type:String
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

export default mongoose.models.Entrega || mongoose.model('Entrega',EntregaSchema)