const express = require('express');
const disciplinaRouter = express.Router();
const disciplina = require('../models/disciplina')

//registrar la informacion que el disciplina envia
// a traves del form

disciplinaRouter.post('/',(request,response)=>{
    const { nombre, descripcion, duracion, nivel, capacidad, precio, status} = request.body;  //esto es lo que estoy recibiendo del front 
    console.log(nombre, descripcion, duracion, nivel, capacidad, precio, status) //aqui pruebo si esta llegando el dato al backend
    //este console.log va a aparecer en la terminal de VS


    if (!nombre || !descripcion || !duracion || !nivel || !capacidad || !precio || !status){
        return response.status(400).json({error: 'Todos los campos son obligatorios'});
    }else{
        //guardar en la bd
        let disciplina1 = new disciplina({ nombre, descripcion, duracion, nivel, capacidad, precio, status });
        disciplina1.nombre = nombre
        disciplina1.descripcion = descripcion
        disciplina1.duracion = duracion
        disciplina1.nivel = nivel
        disciplina1.capacidad = capacidad
        disciplina1.precio = precio
        disciplina1.status = status

        async function guardardisciplina(){
            await disciplina1.save() //aqui es donde guardo en la  bd
            //consultar todos los disciplinas en ese modelo
            const listadisciplinas = await disciplina.find()
            console.log(listadisciplinas) //terminal VS
        }

        guardardisciplina().catch(console.error)  

        return response.status(200).json({mensaje: 'Se ha creado la nueva disciplina'})
    }
})

disciplinaRouter.get('/lista-disciplinas',async(request,response)=>{
    //obtener lista de disciplinas 
    try{
        const listado = await disciplina.find()
        console.log(listado)
        return response.status(200).json({textOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})

disciplinaRouter.post('/actualizar',async (request,response)=>{
    //editar disciplina
    console.log('edito')
    const {nombre, descripcion, duracion, nivel, capacidad, precio, status, id} = request.body;
    console.log(request.body)
    try{    
            if(!nombre || !descripcion || !duracion || !nivel || !capacidad || !precio || !status || !id){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const updateddisciplina = await disciplina.findOneAndUpdate({_id:id},{ nombre: nombre, descripcion: descripcion, duracion: duracion, nivel: nivel, capacidad: capacidad, precio: precio, status: status });
                if (!updateddisciplina) {
                    return response.status(400).json({error: 'disciplina no encontrada'});
                }

                return response.status(200).json({mensaje:'Se ha actualizado correctamente'})
            }
    
        }catch(error){
            response.status(404).json({error:'error al editar disciplina'})
        }
})

disciplinaRouter.post('/eliminar',async(request,res)=>{
    //eliminar disciplina del menu de disciplinas
    const {id} = request.body
    console.log(id)

    try{
        const disciplinaEl = await disciplina.deleteOne({_id:id})
        const listado = await disciplina.find()

        return res.status(200).json({mensaje:'Se ha eliminado la disciplina'})

    }catch(error){
        return res.status(400).json({error: 'Error al eliminar la disciplina'})

    }
})

//buscar un solo disciplina del menu
disciplinaRouter.get('/disciplina',async(req,response)=>{
    //obtener un disciplina
    const {id} = req.query
    console.log('ID recibido:', id)
    try{
        const disciplinaEncontrada = await disciplina.findOne({_id : id})
        console.log(disciplinaEncontrada)
        return response.status(200).json({textOk:true,data:disciplinaEncontrada})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})


module.exports = disciplinaRouter