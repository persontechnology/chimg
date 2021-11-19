import mongoose  from "mongoose";

const ChoferSchema=new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:255
    },
    cedula:{
        type:String,
        unique:true,
        maxlength:10,
        required:true
    },
    telefono:{
        type:String,
        maxlength:15
    },
    tipo_licencia:{
        type:String,
        enum:['C','D','E','G'],
        default:'C'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Chofer || mongoose.model('Chofer',ChoferSchema)