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
    tiempo:{
        type:String
    },
    peso:{
        type:Number
    },
    unidad:{
        type:String
    },
    kilometraje:{
        type:Number
    },
    kilometraje_actual:{
        type:Number
    },
    valor_combustible:{
        type:Number
    },
    ubicacion:{
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