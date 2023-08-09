// // Obtener el token de inicio de seción
// let token = localStorage.getItem('userToken')

// //Validar si el usuario inicio sesión, si no redirecciona a la pagina de inicio
// if (token) {
//   console.log(`Token Recuperado: ${token}`)
// } else {
//   window.location.href = '../../public/user/layout.html'
// }

//URL de servidor
let urlApi = 'http://localhost:3000/'

//Retornar imagen
/*const image = (id) => {
  fetch(`http://localhost:3000/platilloImg/${id}`)
    .then(response => response.blob())
    .then(blob => {
      const img = document.getElementById(`imagenPlatillo${id}`);
      img.src = URL.createObjectURL(blob);
    })
    .catch(error => console.error(error));
};*/


// Mostar Inventario
let url = urlApi + 'chef'
fetch(url)
  .then(response => response.json())
  .then(data => mostarData(data))
  .catch(error => console.log(error))

const mostarData = (data) => {
  let bodyInventario = '';
  console.log(data)

  for (let i = 0; i < data.length; i++) {
    bodyInventario += `
        <tr class="listaInventario border-b border-black duration-300 ease-in-out hover:bg-yellow-50 dark:border-neutral-500 dark:hover:bg-neutral-600">
          <td class="whitespace-nowrap dark:text-white text-lg font-semibold px-6 py-4">${data[i].idChef}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].nombre}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].apellidoPaterno}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].apellidoMaterno}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].direccion}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].numeroTelefono}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].correo}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">${data[i].nombreUsuario}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">$ ${data[i].salario}</td>
          <td class="whitespace-nowrap dark:text-white text-lg px-auto py-4">
            <div class="flex space-x-4">
              <a class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" id="editarInventario" onclick="editarInventario(${data[i].idChef})">
                <img class="h-4" src="../../../src/svg/editar.svg" alt="Editar">
              </a>
              <button onclick="eliminarChef(${data[i].idChef})" id="eliminarChef" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <img class="h-4" src="../../../src/svg/borrar.svg" alt="Eliminar">
              </button>

            </div>
          </td>
        </tr>
      `;
    //   image(data[i].idPropietario); 

      console.log(data[i].idChef)
  }

  document.getElementById('datosInventario').innerHTML = bodyInventario;

  eliminarChef = (idChef) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url + '/' + idChef, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (response.ok) {
              Swal.fire('Eliminado', 'Chef eliminado.', 'success').then(() => {
                location.reload();
              });
            } else {
              console.error('Error al eliminar el platillo');
              Swal.fire('Error', 'Ha ocurrido un error al eliminar al chef.', 'error');
            }
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
            Swal.fire('Error', 'Ha ocurrido un error en la solicitud.', 'error');
          });
      }
    });
  }

}

//Filtar Inventario
document.addEventListener('keyup', e => {

  //Limpiar input cuando precione tecla esc
  if (e.key == 'Escape') e.target.value = ''

  //Filtar contenido de la tabla
  if (e.target.matches('#buscador')) {
    document.querySelectorAll('.listaInventario').forEach(listaInventario => {
      listaInventario.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? listaInventario.classList.remove('hidden')
        : listaInventario.classList.add('hidden')
    })
  }
})



editarInventario = (idChef) => {
  window.location.href = `editarChef.html?idChef=${idChef}`;
}

