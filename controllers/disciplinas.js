const express = require('express');
const disciplinaRouter = express.Router();
const disciplina = require('../models/disciplina'); 

disciplinaRouter.post('/', (request, response) => {
    const { nombre, descripcion, duracion, nivel, status, imagen } = request.body;

    if (!nombre || !descripcion || !duracion || !nivel || !status) {
        return response.status(400).json({ error: 'Todos los campos son obligatorios' });
    } else {
        let disciplina1 = new disciplina({
            nombre,
            descripcion,
            duracion,
            nivel,
            status,
            imagen
        });


        async function guardardisciplina() {
            try {
                await disciplina1.save();
                return response.status(200).json({ mensaje: 'Se ha creado la nueva disciplina', disciplina: disciplina1 });
            } catch (error) {
                console.error('Error al guardar la disciplina:', error);
                return response.status(500).json({ error: 'Error interno del servidor al guardar la disciplina' });
            }
        }

        guardardisciplina();
    }
});

disciplinaRouter.get('/lista-disciplinas', async (request, response) => {
    try {
        const listado = await disciplina.find();
        return response.status(200).json({ textOk: true, data: listado });
    } catch (error) {
        console.error('Error al obtener las disciplinas:', error);
        return response.status(500).json({ error: 'Ha ocurrido un error al obtener las disciplinas' });
    }
});

disciplinaRouter.post('/actualizar', async (request, response) => {
    const { nombre, descripcion, duracion, nivel, status, id, imagen } = request.body;

    try {
        if (!nombre || !descripcion || !duracion || !nivel || !status || !id) {
            return response.status(400).json({ error: 'Todos los campos son obligatorios para la actualización' });
        } else {
            const updateFields = { nombre, descripcion, duracion, nivel, status };
            if (imagen !== undefined) {
                updateFields.imagen = imagen;
            }

            const updateddisciplina = await disciplina.findOneAndUpdate(
                { _id: id },
                { $set: updateFields },
                { new: true }
            );

            if (!updateddisciplina) {
                return response.status(404).json({ error: 'Disciplina no encontrada para actualizar' });
            }

            return response.status(200).json({ mensaje: 'Se ha actualizado correctamente', disciplina: updateddisciplina });
        }
    } catch (error) {
        console.error('Error al editar disciplina:', error);
        response.status(500).json({ error: 'Error interno del servidor al editar disciplina' });
    }
});

disciplinaRouter.post('/eliminar', async (request, res) => {
    const { id } = request.body;

    try {
        const disciplinaEl = await disciplina.deleteOne({ _id: id });
        if (disciplinaEl.deletedCount === 0) {
            return res.status(404).json({ error: 'Disciplina no encontrada para eliminar' });
        }
        return res.status(200).json({ mensaje: 'Se ha eliminado la disciplina' });
    } catch (error) {
        console.error('Error al eliminar la disciplina:', error);
        return res.status(500).json({ error: 'Error interno del servidor al eliminar la disciplina' });
    }
});

disciplinaRouter.get('/disciplina', async (req, response) => {
    const { id } = req.query;
    try {
        const disciplinaEncontrada = await disciplina.findOne({ _id: id });
        if (!disciplinaEncontrada) {
            return response.status(404).json({ error: 'Disciplina no encontrada' });
        }
        return response.status(200).json({ textOk: true, data: disciplinaEncontrada });
    } catch (error) {
        console.error('Error al obtener una disciplina:', error);
        return response.status(500).json({ error: 'Ha ocurrido un error al obtener la disciplina' });
    }
});

module.exports = disciplinaRouter;
