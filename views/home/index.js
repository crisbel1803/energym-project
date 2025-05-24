document.addEventListener('DOMContentLoaded', async function () {
  var calendarEl = document.getElementById('calendar');

  try {
    const eventosRes = await axios.get('/api/eventos/lista-eventos');

    const arrayEventos = eventosRes.data.data.map(evento => ({
      id: evento._id,
      title: evento.title,
      start: evento.start,
      end: evento.end,
      extendedProps: {
        description: evento.description,
        room: evento.room,
        instructor: evento.instructor,
        capacidad: evento.capacidad,
        precio: evento.precio
      }
    }));

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridWeek',
      events: arrayEventos,
      eventClick: function(info) {
        const eventoId = info.event.id;   
        console.log('Evento ID:', eventoId); 

        const modalInfo = document.querySelector('#eventModal');

        document.getElementById('modalTitle').textContent = info.event.title;
        document.getElementById('modalStart').textContent = info.event.start.toLocaleString();
        document.getElementById('modalEnd').textContent = info.event.end ? info.event.end.toLocaleString() : 'No especificado';
        document.getElementById('modalDescription').textContent = info.event.extendedProps.description || 'Sin descripción';
        document.getElementById('modalRoom').textContent = info.event.extendedProps.room;
        document.getElementById('modalInstructor').textContent = info.event.extendedProps.instructor;
        document.getElementById('modalCapacidad').textContent = info.event.extendedProps.capacidad;
        document.getElementById('modalPrecio').textContent = info.event.extendedProps.precio;

        // reservar evento
        const btnReservar = document.querySelector('#btn-reservar-evento');

        btnReservar.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Reservar evento:', eventoId);


          eventoReservado = {
            id_evento: eventoId,
            titulo_evento: info.event.title,
            fecha_evento: info.event.start.toLocaleDateString(),
            hora_evento: info.event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            monto: Number(info.event.extendedProps.precio) || 0
            
          }

          reservarEvento(eventoReservado);
        });
        
        //mostrar el modal
        modalInfo.style.display = 'block';
      },

      eventContent: function(arg) {
        return {
          html: `
            <div class="flex flex-col items-center bg-gray-300 w-full overflow-ellipsis rounded-2xl">
              <span class="font-bold text-verde">${arg.event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              <span>${arg.event.title}</span>
            </div>`
        };
      }
    });

    calendar.render();
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
  }
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('eventModal').style.display = 'none';
});

async function reservarEvento(eventoReservado) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('Usuario almacenado:', user);

  if (!user) {
    alert('Debes iniciar sesión para reservar una clase');
    window.location.href = '/login';
    return;
  }

  try {
    //obtener todas las reservas del usuario
    const response = await axios.get('/api/reservas/lista-reservas', { params: { id_user: user.id } });
    const reservasUsuario = response.data.data;

    //verificar si ya reservó este evento
    const yaReservado = reservasUsuario.some(reserva => reserva.id_evento === eventoReservado.id_evento);

    if (yaReservado) {
      alert('Ya has reservado esta clase. No puedes reservarla nuevamente.');
      return;
    }else{
      console.log('Evento data:', eventoReservado);
      console.log('User ID:', user.id);
      console.log('User nombre:', user.nombre);

      fechaActual = new Date();
      console.log('Fecha actual:', fechaActual.toLocaleDateString());

      const reservaData = {
        id_evento: eventoReservado.id_evento,
        id_user: user.id,
        nombre_user: user.nombre,
        titulo_evento: eventoReservado.titulo_evento,
        fecha_evento: eventoReservado.fecha_evento,
        hora_evento: eventoReservado.hora_evento,
        pago: "sin pagar",
        fecha_reserva: fechaActual.toLocaleDateString(),
        estado_reserva: "pendiente",
        monto: eventoReservado.monto,
        confirmacion_admin: false,
      };

      await axios.post('/api/reservas', reservaData);
      alert('Clase reservada con éxito');
      window.location.href = '/panel-usuario/mis-reservas.html';
      }

  } catch (error) {
    console.error('Error al verificar las reservas:', error);
    alert('Hubo un problema al reservar la clase. Intenta nuevamente.');
  }
}