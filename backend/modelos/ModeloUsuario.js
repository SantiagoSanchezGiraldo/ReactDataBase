import mongoose from "mongoose";
import { type } from "os";

const UserSchema = mongoose.Schema(
    {
        nombre:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
    },
    {
        timestamps:true
    }
);

export const Usuario = mongoose.model('Usuario',UserSchema)