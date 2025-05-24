document.addEventListener('DOMContentLoaded', mostrarUsuariosRegistrados);

const contenedorUsuarios = document.querySelector("#listaUsuarios");
const noUsuariosMessage = document.querySelector("#noUsuariosMessage");
const notificacion = document.querySelector('.notificacion');

async function mostrarUsuariosRegistrados() {
    console.log('Cargando usuarios registrados...');
    try {
        const response = await axios.get('/api/users/lista-users');
        const arrayUsuarios = response.data.data;
        console.log(arrayUsuarios);

        contenedorUsuarios.innerHTML = '';

        if (arrayUsuarios.length === 0) {
            noUsuariosMessage.classList.remove('hidden');
            return;
        } else {
            noUsuariosMessage.classList.add('hidden');
        }

        arrayUsuarios.forEach(usuario => {
            const { id, nombre, email, telefono, rol, verified } = usuario; 

            let rolBadgeClass;
            switch (rol) {
                case 'admin':
                    rolBadgeClass = 'bg-blue-100 text-blue-800';
                    break;
                case 'instructor':
                    rolBadgeClass = 'bg-purple-100 text-purple-800';
                    break;
                case 'afiliado':
                default:
                    rolBadgeClass = 'bg-gray-100 text-gray-800';
                    break;
            }

            const verifiedBadgeClass = verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            const verifiedText = verified ? 'Sí' : 'No';

            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">${nombre}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">${telefono || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rolBadgeClass} capitalize">
                        ${rol}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verifiedBadgeClass}">
                        ${verifiedText}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button data-id="${id}" class="btn-eliminar-usuario bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-xs transition-colors duration-200">
                        Eliminar
                    </button>
                </td>
            `;
            contenedorUsuarios.appendChild(row);
        });

        document.querySelectorAll('.btn-eliminar-usuario').forEach(button => {
            button.addEventListener('click', (e) => eliminarUsuario(e.target.dataset.id));
        });

    } catch (error) {
        console.error("Error obteniendo usuarios registrados:", error);
        mostrarNotificacion('Error al cargar los usuarios. Inténtalo de nuevo.', 'error');
        noUsuariosMessage.classList.remove('hidden');
    }
}

async function eliminarUsuario(idUsuario) {
    console.log('ID a eliminar (frontend):', idUsuario);
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmar) {
        try {
            const response = await axios.post('/api/users/eliminar', { id_user: idUsuario });

            if (response.status === 200) {
                mostrarNotificacion("Usuario eliminado exitosamente.", "success");
                mostrarUsuariosRegistrados();
            } else {
                mostrarNotificacion("Error al eliminar el usuario.", "error");
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            mostrarNotificacion("Hubo un problema al eliminar el usuario. Intenta nuevamente.", "error");
        }
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