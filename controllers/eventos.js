const express = require('express');
const eventoRouter = express.Router();
const evento = require('../models/evento')

//registrar la informacion que el evento envia
// a traves del form
eventoRouter.post('/',(request,response)=>{
    const { title, start, end, description, room, instructor } = request.body;
    console.log(title, start, end, description, room, instructor)
    if (!title || !start || !room || !instructor){
        return response.status(400).json({error: 'Todos los campos son obligatorios'});
    }
    else{
        //guardar en la bd
        let evento1 = new evento({ title, start, end, description, room, instructor });
        evento1.title = title
        evento1.start = start
        evento1.end = end
        evento1.description = description
        evento1.room = room
        evento1.instructor = instructor

        async function guardarEvento(){
            await evento1.save()
            const listaEventos = await evento.find()
            console.log(listaEventos)
        }

        guardarEvento().catch(console.error)  

        return response.status(200).json({mensaje: 'Se ha creado el nuevo evento'})
    }
}
)
eventoRouter.get('/lista-eventos',async(request,response)=>{
    //obtener lista de eventos 
    try{
        const listado = await evento.find()
        console.log(listado)
        return response.status(200).json({textOk:true,data:listado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})
eventoRouter.post('/actualizar',async (request,response)=>{
    //editar evento
    console.log('edito')
    const {title, start, end, description, room, instructor, id} = request.body;
    console.log(request.body)
    try{    
            if(!title || !start || !room || !instructor || !id){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const updatedEvento = await evento.findOneAndUpdate({_id:id},{ title: title, start: start, end: end, description: description, room: room, instructor: instructor });
                if (!updatedEvento) {
                    return response.status(404).json({error:'No se encontró el evento'});
                }
                return response.status(200).json({mensaje:'Evento actualizado correctamente'})
            }
        }catch(error){
            return response.status(400).json({error:'Ha ocurrido un error'})
        }
})
eventoRouter.post('/eliminar',async (request,response)=>{
    //eliminar evento
    console.log('elimino')
    const {id} = request.body;
    try{    
            if(!id){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const deleteEvento = await evento.findOneAndDelete({_id:id});
                if (!deleteEvento) {
                    return response.status(404).json({error:'No se encontró el evento'});
                }
                return response.status(200).json({mensaje:'Evento eliminado correctamente'})
            }
        }catch(error){
            return response.status(400).json({error:'Ha ocurrido un error'})
        }
})

/*eventoRouter.post('/eliminar-multiple',async (request,response)=>{
    //eliminar evento
    console.log('elimino')
    const {ids} = request.body;
    console.log(request.body)
    try{    
            if(!ids){
                return response.status(400).json({error: 'Todos los campos son obligatorios'});
            }else {
                const deleteEvento = await evento.deleteMany({_id:{$in:ids}});
                if (!deleteEvento) {
                    return response.status(404).json({error:'No se encontró el evento'});
                }
                return response.status(200).json({mensaje:'Evento eliminado correctamente'})
            }
        }catch(error){
            return response.status(400).json({error:'Ha ocurrido un error'})
        }
})*/

eventoRouter.get('/evento',async(req,response)=>{
    //obtener un evento
    const {id} = req.query
    console.log(id)
    try{
        const eventoEncontrado = await evento.findOne({_id:id})
        console.log(eventoEncontrado)
        return response.status(200).json({textOk:true,data:eventoEncontrado})
    }catch(error){
        return response.status(400).json({error:'Ha ocurrido un error'})
    }
})
module.exports = eventoRouter