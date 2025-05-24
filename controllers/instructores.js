const express = require('express');
const instructorRouter = express.Router();
const instructor = require('../models/instructor')

//registrar la informacion que el instructor envia
// a traves del form

instructorRouter.post('/',(request,response)=>{
    const { nombre, apellido, cedula, telefono, email, especialidades } = request.body;  //esto es lo que estoy recibiendo del front 
    console.log(nombre, apellido, cedula, telefono, email, especialidades) //aqui pruebo si esta llegando el dato al backend
    //este console.log va a aparecer en la terminal de VS


    if (!nombre || !apellido || !cedula || !telefono || !email){
        return response.status(400).json({error: 'Todos los campos son obligatorios'});
    }else{
        //guardar en la bd
        let instructor1 = new instructor({ nombre, apellido, cedula, telefono, email, especialidades });
        instructor1.nombre = nombre
        instructor1.apellido = apellido
        instructor1.cedula = cedula
        instructor1.telefono = telefono
        instructor1.email = email
        instructor1.especialidades = especialidades

        async function guardarinstructor(){
            await instructor1.save() //aqui es donde guardo en la  bd
            //consultar todos los instructores en ese modelo
            const listainstructores = await instructor.find()
            console.log(listainstructores) //terminal VS
        }

        guardarinstructor().catch(console.error)  

        return response.status(200).json({mensaje: 'Se ha creado el nuevo instructor'})
    }
})

instructorRouter.get('/lista-instructores',async(request,response)=>{
    //obtener lista de instructores 
    try{
        const listado = await instructor.find()
        console.log(listado)
        return response.status(200).json({textOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})

instructorRouter.post('/actualizar',async (request,response)=>{
    //editar instructor
    console.log('edito')
    const {nombre, apellido, cedula, telefono, email, especialidades, id} = request.body;
    console.log(request.body)
    try{    
            if(!nombre || !apellido || !cedula || !telefono || !email || !id){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const updatedinstructor = await instructor.findOneAndUpdate({_id:id},{ nombre: nombre, apellido: apellido, cedula: cedula, telefono: telefono, email: email, especialidades: especialidades });
                if (!updatedinstructor) {
                    return response.status(400).json({error: 'instructor no encontrada'});
                }

                return response.status(200).json({mensaje:'Se ha actualizado correctamente'})
            }
    
        }catch(error){
            response.status(404).json({error:'error al editar instructor'})
        }
})

instructorRouter.post('/eliminar',async(request,res)=>{
    //eliminar instructor del menu de instructores
    const {id} = request.body
    console.log(id)

    try{
        const instructorEl = await instructor.deleteOne({_id:id})
        const listado = await instructor.find()
        return res.status(200).json({mensaje:'Se ha eliminado el instructor'})

    }catch(error){
        return res.status(400).json({error: 'Error al eliminar el instructor'})

    }
})

//buscar un solo instructor del menu
instructorRouter.get('/instructor',async(req,response)=>{
    //obtener un instructor
    const {id} = req.query
    console.log('ID recibido:', id)
    try{
        const instEncontrado = await instructor.findOne({_id : id})
        console.log(instEncontrado)
        return response.status(200).json({textOk:true,data:instEncontrado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})

module.exports = instructorRouter