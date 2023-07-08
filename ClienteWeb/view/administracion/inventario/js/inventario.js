let urlApi = 'http://localhost:3000/'

// Mostar Inventario
let url = urlApi + 'inventario'
fetch(url)
  .then(response => response.json())
  .then(data => mostarData(data))
  .catch(error => console.log(error))

const mostarData = (data) => {
  let bodyInventario = '';

  for (let i = 0; i < data.length; i++) {
    bodyInventario += `
        <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
          <td class="whitespace-nowrap dark:text-white px-6 py-4 font-medium">${data[i].idInventario}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].nombre}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].fechaCaducidad.substring(0, 10)}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].fechaIngreso.substring(0, 10)}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">$ ${data[i].precio}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].cantidad}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">${data[i].disponible ? 'SI' : 'NO'}</td>
          <td class="whitespace-nowrap dark:text-white px-6 py-4">
            <div class="flex space-x-4">
              <a class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" id="editarInventario" onclick="editarInventario(${data[i].idInventario})">
                <img class="h-4" src="../../../src/svg/editar.svg" alt="Editar">
              </a>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <img class="h-4" src="../../../src/svg/borrar.svg" alt="Eliminar">
              </button>
            </div>
          </td>
        </tr>
      `;
  }

  document.getElementById('datosInventario').innerHTML = bodyInventario;
}

function editarInventario(idInventario) {
  window.location.href = `editarInventario.html?idInventario=${idInventario}`;
}