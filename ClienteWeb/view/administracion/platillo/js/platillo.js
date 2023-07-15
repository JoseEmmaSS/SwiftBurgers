//URL de servidor
let urlApi = 'http://localhost:3000/'
// Mostar Inventario
let url = urlApi + 'platillos'
fetch(url)
  .then(response => response.json())
  .then(data => mostarData(data))
  .catch(error => console.log(error))

const mostarData = (data) => {
  let bodyInventario = '';

  for (let i = 0; i < data.length; i++) {
    bodyInventario += `
        <tr class="listaInventario border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
          <td class="whitespace-nowrap dark:text-white px-6 py-4 font-medium">${data[i].idPlatillo}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].nombre}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">$ ${data[i].precio}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].descripcion}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].imagen}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">
            <div class="flex space-x-4">
              <a class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" id="editarInventario" onclick="editarInventario(${data[i].idInventario})">
                <img class="h-4" src="../../../src/svg/editar.svg" alt="Editar">
              </a>
              <button onclick="eliminarPlatillo(${data[i].idPlatillo})" id="eliminarFisicoInventario" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <img class="h-4" src="../../../src/svg/borrar.svg" alt="Eliminar">
              </button>

            </div>
          </td>
        </tr>
      `;
  }

  document.getElementById('datosInventario').innerHTML = bodyInventario;
  
  eliminarPlatillo= (idInventario) => {
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
        fetch(urlApi + 'eliminarPlatillo/' + idInventario, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (response.ok) {
              Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success').then(() => {
                location.reload();
              });
            } else {
              console.error('Error al eliminar el registro');
              Swal.fire('Error', 'Ha ocurrido un error al eliminar el registro.', 'error');
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
  if(e.key == 'Escape')e.target.value = ''
  
  //Filtar contenido de la tabla
  if(e.target.matches('#buscador')){
    document.querySelectorAll('.listaInventario').forEach(listaInventario => {
      listaInventario.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ?listaInventario.classList.remove('hidden')
        :listaInventario.classList.add('hidden')
    })
  }
})



editarInventario = (idInventario) => {
  window.location.href = `editarInventario.html?idInventario=${idInventario}`;
}

