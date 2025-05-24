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
        instructor: evento.instructor
      }
    }));

    console.log(arrayEventos);

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridWeek',
      selectable: true, 
      editable: true, 
      events: arrayEventos,
      eventClick: function(info) {
        const eventoId = info.event.id;   
        console.log('Evento ID:', eventoId); 
        document.querySelector('#eventModal').setAttribute('data-event-id', eventoId);
        
        document.getElementById('modalTitle').textContent = info.event.title;
        document.getElementById('modalStart').textContent = info.event.start.toLocaleString();
        document.getElementById('modalEnd').textContent = info.event.end ? info.event.end.toLocaleString() : 'No especificado';
        document.getElementById('modalDescription').textContent = info.event.extendedProps.description || 'Sin descripción';
        document.getElementById('modalRoom').textContent = info.event.extendedProps.room;
        document.getElementById('modalInstructor').textContent = info.event.extendedProps.instructor;
        document.getElementById('editar-evento').href = `editar-evento.html?id=${eventoId}`;
        
        // Agregar evento para eliminar
        document.getElementById('eliminar-evento').onclick = async function() {
          try {
            const response = await axios.post('/api/eventos/eliminar', { id: eventoId });
            console.log(response.data);

            calendar.refetchEvents();
                        
            document.getElementById('eventModal').style.display = 'none';
          } catch (error) {
            console.error("Error eliminando evento:", error);
          }
        };

        document.getElementById('eventModal').style.display = 'block';
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
