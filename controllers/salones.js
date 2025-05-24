const express = require('express');
const salonRouter = express.Router();
const salon = require('../models/salon')

//registrar la informacion que el salon envia
// a traves del form

salonRouter.post('/',(request,response)=>{
    const { nombre, capacidad, descripcion, equipamiento, ubicacion, status} = request.body;  //esto es lo que estoy recibiendo del front 
    //console.log(nombre, capacidad, descripcion, equipamiento, ubicacion, status) //aqui pruebo si esta llegando el dato al backend
    //este console.log va a aparecer en la terminal de VS


    if (!nombre || !capacidad || !descripcion || !equipamiento || !ubicacion || !status){
        return response.status(400).json({error: 'Todos los campos son obligatorios'});
    }else{
        //guardar en la bd
        let salon1 = new salon({ nombre, capacidad, descripcion, equipamiento, ubicacion, status });
        salon1.nombre = nombre
        salon1.capacidad = capacidad
        salon1.descripcion = descripcion
        salon1.equipamiento = equipamiento
        salon1.ubicacion = ubicacion
        salon1.status = status

        async function guardarsalon(){
            await salon1.save() //aqui es donde guardo en la  bd
            //consultar todos los salons en ese modelo
            const listasalones = await salon.find()
            //console.log(listasalones) //terminal VS
        }

        guardarsalon().catch(console.error)  

        return response.status(200).json({mensaje: 'Se ha creado el nuevo salon'})
    }
})

salonRouter.get('/lista-salones',async(request,response)=>{
    //obtener lista de salons 
    try{
        const listado = await salon.find()
        //console.log(listado)
        return response.status(200).json({textOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})

salonRouter.post('/actualizar',async (request,response)=>{
    //editar salon
    //console.log('edito')
    const {nombre, capacidad, descripcion, equipamiento, ubicacion, status, id} = request.body;
    //console.log(request.body)
    try{    
            if(!nombre || !capacidad || !descripcion || !equipamiento || !ubicacion || !status || !id){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const updatedSalon = await salon.findOneAndUpdate({_id:id},{ nombre: nombre, capacidad: capacidad, descripcion: descripcion, equipamiento: equipamiento, ubicacion: ubicacion, status: status });
                if (!updatedSalon) {
                    return response.status(400).json({error: 'salon no encontrado'});
                }

                return response.status(200).json({mensaje:'Se ha actualizado correctamente'})
            }
    
        }catch(error){
            response.status(404).json({error:'error al editar salon'})
        }
})

salonRouter.post('/eliminar',async(request,res)=>{
    //eliminar salon del menu de salons
    const {id} = request.body
    //console.log('ID eliminado:', id)

    try{
        const salonEl = await salon.deleteOne({_id:id})
        const listado = await salon.find()
        return res.status(200).json({mensaje:'Se ha eliminado el salon'})

    }catch(error){
        return res.status(400).json({error: 'Error al eliminar el salon'})

    }
})

//buscar un solo salon del menu
salonRouter.get('/salon',async(req,response)=>{
    //obtener un salon
    const {id} = req.query
    //console.log('ID recibido:', id)
    try{
        const salonEncontrado = await salon.findOne({_id : id})
        //console.log(salonEncontrado)
        return response.status(200).json({textOk:true,data:salonEncontrado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})


module.exports = salonRouter