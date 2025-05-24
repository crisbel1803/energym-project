const express = require('express');

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const reservaRouter = express.Router();
const reserva = require('../models/reserva'); 


const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_BASE_URL = process.env.PAYPAL_API_BASE_URL;
const DOMINIO_RENDER = process.env.DOMINIO_RENDER;

async function generateAccessToken() {
    try {
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
        const response = await axios.post(
            `${PAYPAL_API_BASE_URL}/v1/oauth2/token`,
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Failed to generate PayPal Access Token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate PayPal Access Token');
    }
}

reservaRouter.post('/crear-orden-paypal', async (req, res) => {
    const { items, totalAmount } = req.body; //recibe los detalles del carrito/resumen desde el frontend

    if (!items || items.length === 0 || !totalAmount) {
        return res.status(400).json({ error: 'Faltan detalles del pedido para crear la orden.' });
    }

    try {
        const accessToken = await generateAccessToken();

        const paypalOrder = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD', 
                        value: totalAmount.toFixed(2), //2 decimales
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: totalAmount.toFixed(2),
                            },
                        },
                    },
                    items: items.map(item => ({
                        name: item.titulo_evento,
                        unit_amount: {
                            currency_code: 'USD',
                            value: item.monto.toFixed(2),
                        },
                        quantity: '1', //cada reserva es un item
                    })),
                },
            ],
            application_context: {
                return_url: `${DOMINIO_RENDER}/panel-usuario/mis-reservas.html?pago=exitoso`, //aprobación
                cancel_url: `${DOMINIO_RENDER}/panel-usuario/mis-reservas.html?pago=cancelado`, //si el usuario cancela
                user_action: 'PAY_NOW',
            },
        };

        const response = await axios.post(
            `${PAYPAL_API_BASE_URL}/v2/checkout/orders`,
            paypalOrder,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json(response.data); //envía la orden de paypal al frontend
    } catch (error) {
        console.error('Error al crear la orden de PayPal:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error interno del servidor al crear la orden de PayPal.' });
    }
});

reservaRouter.post('/capturar-pago-paypal', async (req, res) => {
    const { orderID, idsReservas } = req.body;

    if (!orderID || !idsReservas || idsReservas.length === 0) {
        return res.status(400).json({ error: 'Faltan datos para capturar el pago.' });
    }

    try {
        const accessToken = await generateAccessToken();
        const response = await axios.post(
            `${PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const capture = response.data.purchase_units[0].payments.captures[0];

        if (capture.status === 'COMPLETED') {
            //pago exitoso con paypal
            await Promise.all(idsReservas.map(async id => {
                const reservaExistente = await reserva.findById(id);
                if (reservaExistente) {
                    reservaExistente.pago = "pagado";
                    reservaExistente.metodo_pago = "PayPal";
                    reservaExistente.confirmacion_admin = false;
                    reservaExistente.fecha_pago = new Date();
                    await reservaExistente.save();
                }
            }));

            res.status(200).json({ success: true, message: 'Pago procesado y reservas actualizadas.', paypalResponse: response.data });
        } else {
            console.error('PayPal capture status not COMPLETED:', capture.status);
            res.status(400).json({ success: false, message: 'El pago no se completó en PayPal.', paypalResponse: response.data });
        }
    } catch (error) {
        console.error('Error al capturar el pago de PayPal:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error interno del servidor al capturar el pago.' });
    }
});


reservaRouter.post('/', (request, response) => {
    console.log("Datos recibidos en la reserva:", request.body);
    const { id_user, id_evento, nombre_user, titulo_evento, fecha_evento, hora_evento, pago, fecha_reserva, estado_reserva, metodo_pago, fecha_pago, monto, confirmacion_admin, comentarios } = request.body; //esto es lo que estoy recibiendo del front 


    if (!id_user || !id_evento) {
        return response.status(400).json({ error: 'Todos los campos son obligatorios' });
    } else {
        //guardar en la bd
        let reserva1 = new reserva({ id_user, id_evento, nombre_user, titulo_evento, fecha_evento, hora_evento, pago, fecha_reserva, estado_reserva, metodo_pago, fecha_pago, monto, confirmacion_admin, comentarios });


        async function guardarReserva() {
            try {
                await reserva1.save();
                return response.status(200).json({ mensaje: 'Se ha creado la nueva reserva' });
            } catch (error) {
                console.error('Error al guardar la reserva:', error);
                return response.status(500).json({ error: 'Error interno del servidor al guardar la reserva' });
            }
        }

        guardarReserva();
    }
});

//obtener lista de reservas del usuario
reservaRouter.get('/lista-reservas', async (request, response) => {
    const { id_user } = request.query;
    try {
        const listado = await reserva.find({ id_user });
        return response.status(200).json({ textOk: true, data: listado });
    } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        return response.status(500).json({ error: 'Ha ocurrido un error al obtener las reservas' });
    }
});

//obtener lista de reservas completa para admin
reservaRouter.get('/lista-all-reservas', async (request, response) => {
    try {
        const listado = await reserva.find();
        return response.status(200).json({ textOk: true, data: listado });
    } catch (error) {
        console.error('Error al obtener todas las reservas:', error);
        return response.status(500).json({ error: 'Ha ocurrido un error al obtener las reservas' });
    }
});

reservaRouter.post('/actualizar', async (request, response) => {
    //editar reserva
    const { id_user, id_evento, nombre_user, pago, fecha_reserva, estado_reserva, metodo_pago, fecha_pago, monto, confirmacion_admin, comentarios, id } = request.body;
    try {
        if (!id_user || !id_evento || !pago || !nombre_user || !fecha_reserva || !estado_reserva || !metodo_pago || !fecha_pago || !monto || !confirmacion_admin || !comentarios || !id) {
            return response.status(400).json({ error: 'Todos los campos son obligatorios para la actualización' });
        } else {
            const updatedReserva = await reserva.findOneAndUpdate({ _id: id }, { id_user: id_user, id_evento: id_evento, nombre_user: nombre_user, pago: pago, fecha_reserva: fecha_reserva, estado_reserva: estado_reserva, metodo_pago: metodo_pago, fecha_pago: fecha_pago, monto: monto, confirmacion_admin: confirmacion_admin, comentarios: comentarios });
            if (!updatedReserva) {
                return response.status(404).json({ error: 'Reserva no encontrada para actualizar' });
            }

            return response.status(200).json({ mensaje: 'Se ha actualizado correctamente' });
        }

    } catch (error) {
        console.error('Error al editar reserva:', error);
        response.status(500).json({ error: 'Error interno del servidor al editar reserva' });
    }
});

reservaRouter.post('/eliminar', async (request, res) => {
    //eliminar reserva del menu de reservas
    const { id } = request.body;

    try {
        const reservaEl = await reserva.deleteOne({ _id: id });
        if (reservaEl.deletedCount === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada para eliminar' });
        }
        return res.status(200).json({ mensaje: 'Se ha eliminado la reserva' });

    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        return res.status(500).json({ error: 'Error interno del servidor al eliminar la reserva' });
    }
});

//buscar una sola reserva del menu
reservaRouter.get('/reserva', async (req, response) => {
    const { id } = req.query;
    try {
        const reservaEncontrada = await reserva.findOne({ _id: id });
        if (!reservaEncontrada) {
            return response.status(404).json({ error: 'Reserva no encontrada' });
        }
        return response.status(200).json({ textOk: true, data: reservaEncontrada });
    } catch (error) {
        console.error('Error al obtener una reserva:', error);
        return response.status(500).json({ error: 'Ha ocurrido un error al obtener la reserva' });
    }
});

reservaRouter.post('/registrar-pago', async (request, response) => {
    console.log("Datos recibidos para registrar pago:", request.body);
    const { id_reservas, metodo_pago } = request.body;

    try {
        if (!id_reservas || id_reservas.length === 0) {
            return response.status(400).json({ error: "No se proporcionaron reservas para pago." });
        }

        await Promise.all(id_reservas.map(async id => {
            const reservaExistente = await reserva.findById(id);
            if (reservaExistente) {
                reservaExistente.pago = "pagado";
                reservaExistente.metodo_pago = metodo_pago;
                reservaExistente.confirmacion_admin = false;

                //convertir fecha_pago a formato Date válido
                reservaExistente.fecha_pago = new Date();

                await reservaExistente.save();
            }
        }));

        return response.status(200).json({ mensaje: "Pago registrado exitosamente" });

    } catch (error) {
        console.error("Error al procesar el pago:", error);
        return response.status(500).json({ error: "Error interno del servidor" });
    }
});

reservaRouter.get('/reservas-pagadas', async (request, response) => {
    try {
        const eventosPagados = await reserva.find({ pago: "pagado" });

        if (!eventosPagados.length) {
            return response.status(404).json({ mensaje: "No hay eventos pagados registrados." });
        }

        return response.status(200).json({ data: eventosPagados });
    } catch (error) {
        console.error("Error al obtener eventos pagados:", error);
        return response.status(500).json({ error: "Error interno del servidor." });
    }
});

reservaRouter.post('/confirmar-pago', async (request, response) => {
    const { id } = request.body; 

    try {
        const reservaExistente = await reserva.findById(id);

        if (!reservaExistente) {
            return response.status(404).json({ error: "Reserva no encontrada" });
        }

        if (reservaExistente.estado_reserva !== "Confirmada" && reservaExistente.estado_reserva !== "Cancelada") {
            reservaExistente.estado_reserva = "Confirmada";
            reservaExistente.confirmacion_admin = true;
            reservaExistente.pago = "Pagado";
            await reservaExistente.save();
            return response.status(200).json({ mensaje: "Pago y reserva confirmados por el administrador." });
        } else {
            return response.status(400).json({ error: "La reserva ya está confirmada o cancelada." });
        }
    } catch (error) {
        console.error("Error al confirmar pago:", error);
        return response.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = reservaRouter;
