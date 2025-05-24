document.addEventListener('DOMContentLoaded', mostrarreservasPagadas);

const contenedorPagos = document.querySelector("#listaPagos");
const noPagosMessage = document.querySelector("#noPagosMessage");
const notificacion = document.querySelector('.notificacion');

async function mostrarreservasPagadas() {
    try {
        const response = await axios.get('/api/reservas/reservas-pagadas');
        const reservasPagadas = response.data.data;

        contenedorPagos.innerHTML = ''; 

        if (reservasPagadas.length === 0) {
            noPagosMessage.classList.remove('hidden');
            return;
        } else {
            noPagosMessage.classList.add('hidden');
        }

        reservasPagadas.forEach(evento => {
            const { _id, nombre_user, fecha_pago, titulo_evento, monto, metodo_pago, pago, confirmacion_admin } = evento;

            let fechaPagoFormateada = fecha_pago;
            try {
                const fechaObjeto = new Date(fecha_pago);

                if (!isNaN(fechaObjeto.getTime())) {
                    const dia = fechaObjeto.toLocaleDateString('es-ES'); 
                    const hora = fechaObjeto.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }); 
                    fechaPagoFormateada = `${dia} ${hora}`;
                }
            } catch (e) {
                console.error("Error formateando fecha_pago:", e);
            }

            const pagoBadgeClass = pago === 'pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

            const confirmacionAdminBadgeClass = confirmacion_admin ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            const confirmacionAdminText = confirmacion_admin ? 'Confirmado' : 'Pendiente';


            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">${nombre_user}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${fechaPagoFormateada}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${titulo_evento}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold text-center">${monto}$</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${metodo_pago}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pagoBadgeClass}">
                        ${pago === "pagado" ? "Pagado" : "Pendiente"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${confirmacionAdminBadgeClass}">
                        ${confirmacionAdminText}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    ${!confirmacion_admin ? `
                        <button data-id="${_id}" class="btn-confirmar-pago bg-verde hover:bg-verde/80 text-white font-bold py-1 px-3 rounded-md text-xs transition-colors duration-200">
                            Confirmar Pago
                        </button>` : ''
                    }
                </td>
            `;
            contenedorPagos.appendChild(row);
        });

        document.querySelectorAll('.btn-confirmar-pago').forEach(button => {
            button.addEventListener('click', (e) => confirmarPago(e.target.dataset.id));
        });

    } catch (error) {
        console.error("Error obteniendo reservas pagadas:", error);
        mostrarNotificacion('Error al cargar los pagos. Inténtalo de nuevo.', 'error');
        noPagosMessage.classList.remove('hidden');
    }
}

async function confirmarPago(idReserva) {
    try {
        const response = await axios.post('/api/reservas/confirmar-pago', { id: idReserva });

        if (response.status === 200) {
            mostrarNotificacion("Pago confirmado exitosamente.", "success");
            mostrarreservasPagadas();
        } else {
            mostrarNotificacion("Error al confirmar el pago.", "error");
        }
    } catch (error) {
        console.error("Error al confirmar el pago:", error);
        mostrarNotificacion("Hubo un problema al confirmar el pago. Intenta nuevamente.", "error");
    }
}

function mostrarNotificacion(mensaje, tipo) {
    notificacion.innerHTML = mensaje;
    notificacion.classList.remove('hidden', 'text-green-600', 'text-red-600', 'border-green-600', 'border-red-600');
    notificacion.classList.add('block');

    if (tipo === 'success') {
        notificacion.classList.add('text-green-600', 'border-green-600');
    } else if (tipo === 'error') {
        notificacion.classList.add('text-red-600', 'border-red-600');
    }

    setTimeout(() => {
        notificacion.classList.remove('block', 'text-green-600', 'text-red-600', 'border-green-600', 'border-red-600');
        notificacion.classList.add('hidden');
    }, 3000);
}
