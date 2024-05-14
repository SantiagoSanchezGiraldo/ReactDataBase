import express from 'express';
import mongoose from "mongoose";
import { MONGO_URL, PORT } from './config.js';
import { error } from 'console';
import { Usuario } from './modelos/ModeloUsuario.js';

const app = express();

app.use(express.json());

//nuestra 

app.get('/', (respuesta, solicitud)=>{
    return respuesta.send('Mi primera respuesta');
});

app.post('/registro',async(solicitud,respuesta)=>{
    try{
        let {nombre,email,password} = solicitud.body;
        if(!nombre||!email||!password){
            return respuesta.status(400).send({
                message:'Enviar todos los campos'
            })
        }
        const usuarioExistente = await Usuario.findOne({email})
        if(usuarioExistente){
            return respuesta.json({message:'Usuario ya existe'})
        }else{
            const user = Usuario.create({nombre,email,password});
            return respuesta.status(200).send(user);
        }
    }
    catch(error){
        console.log(error);
        return respuesta.status(201).send({message:error.message})
    }
})

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('conectado a la DB')
    app.listen(PORT, ()=>{
        console.log('App funcionando');
    })
})
.catch((error)=>{
    console.log(error);
})
