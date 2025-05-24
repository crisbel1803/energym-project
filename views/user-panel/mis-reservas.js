const user = JSON.parse(localStorage.getItem('user'));
document.getElementById('btn-user').textContent = user.nombre || 'Desconocido';

document.addEventListener('DOMContentLoaded', () => {
    mostrarReservas();
});

const contenedorReservas = document.querySelector('#listaReservas');
const noReservasMessage = document.querySelector('#noReservasMessage');
const notificacion = document.querySelector('.notificacion'); 
const contenedorResumen = document.querySelector('#resumenCompra');
const noResumenMessage = document.querySelector("#noResumenMessage");
const notificacionResumen = document.querySelector('.notificacion-resumen');

const resumenCompra = []; 

async function mostrarReservas() {
    console.log('Cargando reservas');
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const id_user = user.id;
        const response = await axios.get('/api/reservas/lista-reservas', { params: { id_user } });
        const arrayReservas = response.data.data;
        console.log(arrayReservas);

        contenedorReservas.innerHTML = '';

        if (arrayReservas.length === 0) {
            noReservasMessage.classList.remove('hidden');

            localStorage.removeItem('resumenCompra');
            resumenCompra.length = 0;
            mostrarResumen();
            return;
        } else {
            noReservasMessage.classList.add('hidden');
        }

        arrayReservas.forEach(reserva => {
            const { _id, titulo_evento, fecha_evento, hora_evento, pago, fecha_reserva, estado_reserva, monto, confirmacion_admin } = reserva;

            const pagoBadgeClass = pago === 'pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            let estadoReservaBadgeClass;
            switch (estado_reserva) {
                case 'Confirmada':
                    estadoReservaBadgeClass = 'bg-blue-100 text-blue-800';
                    break;
                case 'Pendiente':
                    estadoReservaBadgeClass = 'bg-yellow-100 text-yellow-800';
                    break;
                case 'Cancelada':
                    estadoReservaBadgeClass = 'bg-red-100 text-red-800';
                    break;
                default:
                    estadoReservaBadgeClass = 'bg-gray-100 text-gray-800';
            }

            const confirmacionAdminBadgeClass = confirmacion_admin ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            const confirmacionAdminText = confirmacion_admin ? 'Confirmado' : 'Pendiente';


            const row = document.createElement('tr');
            row.dataset.id = _id; 
            row.classList.add('hover:bg-gray-50');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${fecha_reserva}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${titulo_evento}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${fecha_evento}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${hora_evento}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold text-center">${monto}$</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pagoBadgeClass}">
                        ${pago}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${estadoReservaBadgeClass}">
                        ${estado_reserva}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${confirmacionAdminBadgeClass}">
                        ${confirmacionAdminText}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div class="flex gap-2 justify-center items-center">
                        ${pago === 'sin pagar' ? `
                            <button data-id="${_id}" class="pagar px-3 py-1.5 text-sm font-semibold text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition-colors duration-200">
                                Pagar
                            </button>
                            <button data-id="${_id}" class="eliminar px-2.5 py-1 text-sm text-gray-600 bg-red-200 rounded-md hover:bg-red-300 transition-colors duration-200">
                                Eliminar
                            </button>
                        ` : ''}
                    </div>
                </td>
            `;
            contenedorReservas.appendChild(row);
        });

        document.querySelectorAll('.pagar').forEach(button => {
            button.addEventListener('click', (e) => agregarAResumen(e.target));
        });
        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', confirmarEliminar);
        });

        //actualizar el estado de los botones si ya estan en el resumen
        const resumenGuardado = JSON.parse(localStorage.getItem('resumenCompra')) || [];
        resumenGuardado.forEach(reservaResumen => {
            const botonPagar = document.querySelector(`.pagar[data-id="${reservaResumen._id}"]`);
            const botonEliminar = document.querySelector(`.eliminar[data-id="${reservaResumen._id}"]`);
            if (botonPagar) {
                botonPagar.disabled = true;
                botonPagar.classList.add('opacity-50', 'cursor-not-allowed');
            }
            if (botonEliminar) {
                botonEliminar.disabled = true;
                botonEliminar.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });

        mostrarResumen();

    } catch (error) {
        console.error('Error al cargar las reservas:', error);
        mostrarNotificacion('Error al cargar tus reservas. Inténtalo de nuevo.', 'error', notificacion);
        noReservasMessage.classList.remove('hidden');
    }
}

async function confirmarEliminar(e) {
    if (e.target.classList.contains('eliminar')) {
        const confirmar = window.confirm('¿Desea eliminar esta reserva?');

        if (confirmar) {
            const id = e.target.dataset.id;
            console.log('ID a eliminar (frontend):', id);
            try {
                const response = await axios.post('/api/reservas/eliminar', { id });
                if (response.status === 200) {
                    mostrarNotificacion('Reserva eliminada con éxito!', 'success', notificacion);
                    let resumenGuardado = JSON.parse(localStorage.getItem('resumenCompra')) || [];
                    resumenGuardado = resumenGuardado.filter(reserva => reserva._id !== id);
                    localStorage.setItem('resumenCompra', JSON.stringify(resumenGuardado));
                    mostrarResumen();
                    mostrarReservas();
                } else {
                    mostrarNotificacion('Error al eliminar la reserva.', 'error', notificacion);
                }
            } catch (error) {
                console.error("Error al eliminar reserva:", error);
                mostrarNotificacion("Hubo un problema al eliminar la reserva. Intenta nuevamente.", "error", notificacion);
            }
        }
    }
}

function agregarAResumen(boton) {
    const filaCompleta = boton.closest('tr');
    if (!filaCompleta) {
        console.error('Error: No se encontró la fila.');
        mostrarNotificacion('No se pudo agregar la reserva al resumen.', 'error', notificacionResumen);
        return;
    }

    const id_reserva = filaCompleta.getAttribute('data-id');
    const titulo_evento = filaCompleta.children[1].textContent;
    const hora = filaCompleta.children[3].textContent;
    const monto = parseFloat(filaCompleta.children[4].textContent.replace('$', ''));

    if (!id_reserva) {
        console.error("Error: ID de reserva no encontrado en la fila.");
        mostrarNotificacion('ID de reserva no encontrado.', 'error', notificacionResumen);
        return;
    }

    const resumenGuardado = JSON.parse(localStorage.getItem('resumenCompra')) || [];

    const existe = resumenGuardado.some(reserva => reserva._id === id_reserva);
    if (existe) {
        mostrarNotificacion('Esta reserva ya está en tu carrito.', 'error', notificacionResumen);
        return;
    }

    resumenGuardado.push({ _id: id_reserva, titulo_evento, hora, monto });
    localStorage.setItem('resumenCompra', JSON.stringify(resumenGuardado));

    resumenCompra.length = 0;
    resumenCompra.push(...resumenGuardado);

    const botonEliminar = filaCompleta.querySelector('.eliminar');
    boton.disabled = true;
    boton.classList.add('opacity-50', 'cursor-not-allowed');

    if (botonEliminar) {
        botonEliminar.disabled = true;
        botonEliminar.classList.add('opacity-50', 'cursor-not-allowed');
    }

    mostrarNotificacion('Reserva añadida al carrito.', 'success', notificacionResumen);
    mostrarResumen();
}


function mostrarResumen() {
    const resumenGuardado = localStorage.getItem('resumenCompra');
    resumenCompra.length = 0; 
    if (resumenGuardado) {
        resumenCompra.push(...JSON.parse(resumenGuardado));
    }

    contenedorResumen.innerHTML = ''; 

    if (resumenCompra.length === 0) {
        noResumenMessage.classList.remove('hidden');
        return;
    } else {
        noResumenMessage.classList.add('hidden');
    }

    let total = 0;
    resumenCompra.forEach(reserva => {
        const item = document.createElement('div');
        item.classList.add('flex', 'justify-between', 'items-center', 'py-2', 'border-b', 'border-gray-100');
        item.innerHTML = `
            <p class="text-gray-700 font-medium">${reserva.titulo_evento} (${reserva.hora})</p>
            <p class="text-gray-800 font-semibold">${reserva.monto}$</p>
            <button data-id="${reserva._id}" class="eliminar-resumen text-red-500 hover:text-red-700 transition-colors duration-200">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        contenedorResumen.appendChild(item);
        total += reserva.monto;
    });

    document.querySelectorAll('.eliminar-resumen').forEach(button => {
        button.addEventListener('click', (e) => eliminarDelResumen(e.target.closest('button').dataset.id));
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('flex', 'justify-between', 'items-center', 'font-bold', 'mt-4', 'text-xl', 'text-gray-900');
    totalElement.innerHTML = `
        <span>Total a pagar:</span>
        <span>${total}$</span>
    `;
    contenedorResumen.appendChild(totalElement);

    //botones de paypal
    const paypalButtonsContainer = document.createElement('div');
    paypalButtonsContainer.id = 'paypal-button-container';
    paypalButtonsContainer.classList.add('mt-6'); 
    contenedorResumen.appendChild(paypalButtonsContainer); 

    //mostrar los botones de PayPal
    if (typeof paypal !== 'undefined' && paypal.Buttons) {
        paypal.Buttons({
            createOrder: async function(data, actions) {
                try {
                    const response = await axios.post('/api/reservas/crear-orden-paypal', {
                        items: resumenCompra.map(item => ({
                            titulo_evento: item.titulo_evento,
                            monto: item.monto,
                        })),
                        totalAmount: total 
                    });
                    return response.data.id; 
                } catch (error) {
                    console.error('Error en createOrder:', error);
                    mostrarNotificacion('Error al iniciar el pago con PayPal. Intenta de nuevo.', 'error', notificacionResumen);
                    return actions.reject(error);
                }
            },
            onApprove: async function(data, actions) {
                try {
                    const idsReservas = resumenCompra.map(reserva => reserva._id);
                    const response = await axios.post('/api/reservas/capturar-pago-paypal', {
                        orderID: data.orderID,
                        idsReservas: idsReservas 
                    });

                    if (response.data.success) {
                        mostrarNotificacion("Pago realizado con éxito.", "success", notificacionResumen);
                        localStorage.removeItem('resumenCompra'); 
                        resumenCompra.length = 0; 
                        mostrarReservas(); 
                        mostrarResumen(); 
                    } else {
                        mostrarNotificacion("El pago no se completó: " + response.data.message, "error", notificacionResumen);
                    }
                } catch (error) {
                    console.error('Error en onApprove:', error);
                    mostrarNotificacion('Hubo un problema al procesar el pago con PayPal. Intenta nuevamente.', 'error', notificacionResumen);
                }
            },
            onCancel: function(data) {
                console.log('Pago cancelado por el usuario:', data);
                mostrarNotificacion('Pago cancelado por el usuario.', 'info', notificacionResumen);
            },
            onError: function(err) {
                console.error('Error de PayPal:', err);
                mostrarNotificacion('Ocurrió un error con PayPal. Intenta de nuevo.', 'error', notificacionResumen);
            }
        }).render('#paypal-button-container');
    } else {
        console.warn('PayPal SDK no está cargado. El botón de PayPal no se renderizará.');
        const fallbackButton = document.createElement('button');
        fallbackButton.textContent = 'Pagar (PayPal no disponible)';
        fallbackButton.classList.add('px-4', 'py-2.5', 'text-lg', 'font-bold', 'text-white', 'bg-gray-400', 'rounded-lg', 'shadow-md', 'cursor-not-allowed', 'w-full', 'mt-4');
        paypalButtonsContainer.appendChild(fallbackButton);
    }

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar Compra';
    botonCancelar.classList.add('px-4', 'py-2.5', 'text-lg', 'font-bold', 'text-white', 'bg-red-500', 'rounded-lg', 'shadow-md', 'hover:bg-red-600', 'transition-colors', 'duration-200', 'w-full', 'mt-4');
    botonCancelar.addEventListener('click', cancelarCompra);
    contenedorResumen.appendChild(botonCancelar);
}

function eliminarDelResumen(idReserva) {
    let resumenGuardado = JSON.parse(localStorage.getItem('resumenCompra')) || [];
    resumenGuardado = resumenGuardado.filter(reserva => reserva._id !== idReserva);
    localStorage.setItem('resumenCompra', JSON.stringify(resumenGuardado));

    const filaTabla = document.querySelector(`tr[data-id="${idReserva}"]`);
    if (filaTabla) {
        const botonPagar = filaTabla.querySelector('.pagar');
        const botonEliminar = filaTabla.querySelector('.eliminar');
        if (botonPagar) {
            botonPagar.disabled = false;
            botonPagar.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        if (botonEliminar) {
            botonEliminar.disabled = false;
            botonEliminar.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    mostrarNotificacion('Reserva eliminada del carrito.', 'success', notificacionResumen);
    mostrarResumen();
}


function cancelarCompra() {
    localStorage.removeItem('resumenCompra');
    resumenCompra.length = 0;

    mostrarNotificacion('Compra cancelada. Tu carrito está vacío.', 'info', notificacionResumen);
    mostrarResumen();
    mostrarReservas(); //recargar las reservas para rehabilitar los botones de pagar etc
}

function mostrarNotificacion(mensaje, tipo, contenedor) {
    if (!contenedor) {
        console.error("Contenedor de notificación no proporcionado.");
        return;
    }
    contenedor.innerHTML = mensaje;
    contenedor.classList.remove('hidden', 'text-green-600', 'text-red-600', 'border-green-600', 'border-red-600', 'text-yellow-900', 'border-yellow-900', 'text-blue-600', 'border-blue-600');
    contenedor.classList.add('block');

    if (tipo === 'success') {
        contenedor.classList.add('text-green-600', 'border-green-600');
    } else if (tipo === 'error') {
        contenedor.classList.add('text-red-600', 'border-red-600');
    } else if (tipo === 'info') { 
        contenedor.classList.add('text-blue-600', 'border-blue-600');
    }

    setTimeout(() => {
        contenedor.classList.remove('block', 'text-green-600', 'text-red-600', 'border-green-600', 'border-red-600', 'text-blue-600', 'border-blue-600');
        contenedor.classList.add('hidden');
    }, 3000);
}
