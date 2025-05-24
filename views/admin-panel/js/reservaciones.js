document.addEventListener('DOMContentLoaded', mostrarReservas);
const contenedorReservas = document.querySelector('#listaReservas');
const noReservasMessage = document.querySelector('#noReservasMessage');
const notificacion = document.querySelector('.notificacion');

async function mostrarReservas() {
    console.log('Cargando reservas...');
    try {
        const response = await axios.get('/api/reservas/lista-all-reservas');
        const arrayReservas = response.data.data;
        console.log(arrayReservas);

        contenedorReservas.innerHTML = ''; 

        if (arrayReservas.length === 0) {
            noReservasMessage.classList.remove('hidden');
            return;
        } else {
            noReservasMessage.classList.add('hidden');
        }

        arrayReservas.forEach(reserva => {
            const { _id, titulo_evento, fecha_evento, hora_evento, pago, fecha_reserva, estado_reserva, monto, confirmacion_admin, nombre_user } = reserva;

            const pagoBadgeClass = pago === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
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

            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-50'); 
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">${nombre_user}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${fecha_reserva}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${titulo_evento}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${fecha_evento}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${hora_evento}</td>
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
                
            `;
            contenedorReservas.appendChild(row);
        });


    } catch (error) {
        console.error('Error al cargar las reservas:', error);
        mostrarNotificacion('Error al cargar las reservas. Inténtalo de nuevo.', 'error');
        noReservasMessage.classList.remove('hidden'); 
    }
}

function mostrarNotificacion(mensaje, tipo) {
    notificacion.innerHTML = mensaje;
    notificacion.classList.remove('hidden', 'text-green-600', 'text-red-600');
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
