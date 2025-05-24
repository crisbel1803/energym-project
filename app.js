require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./controllers/usuarios');
const disciplinaRouter = require('./controllers/disciplinas');
const instructorRouter = require('./controllers/instructores');
const salonRouter = require('./controllers/salones');
const eventoRouter = require('./controllers/eventos');

//conexion a la bd
try {
    mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Te has conectado a MongoDB');
} catch (error) {
console.log(error);
}

//IMPORTANTE 
app.use(express.json())

//RUTAS FRONTEND localhost:3000/
app.use('/',express.static(path.resolve('views','home'))); //INICIO
app.use('/login',express.static(path.resolve('views','login'))); //INICIAR SESION
app.use('/registro',express.static(path.resolve('views','registro'))); //REGISTRARSE
app.use('/contacto',express.static(path.resolve('views','contacto'))); //CONTACTANOS
app.use('/panel-usuario',express.static(path.resolve('views','user-panel'))); //USER PANEL
app.use('/panel-administrador',express.static(path.resolve('views','admin-panel'))); //ADMIN PANEL

app.use('/styles',express.static(path.resolve('views','css'))); //ESTILOS
app.use('/components',express.static(path.resolve('views','components'))); //COMPONENTES JS
app.use('/images',express.static(path.resolve('views','img'))); //IMAGENES

//rutas de backend 
app.use('/api/users',userRouter) //CONTROLLER USUARIOS
app.use('/api/disciplinas',disciplinaRouter) //CONTROLLER disciplinaS
app.use('/api/instructores',instructorRouter) //CONTROLLER INSTRUCTORES
app.use('/api/salones',salonRouter) //CONTROLLER SALONES
app.use('/api/eventos',eventoRouter) //CONTROLLER EVENTOS

module.exports = app;