// Obtener el token de inicio de sesión
let token = localStorage.getItem('userToken')

if (token) {
  console.log(`Token Recuperado: ${token}`)
} else {
  window.location.href = '../../public/user/layout.html'
}

function obtenerIdInventarioDeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const idInventario = urlParams.get('idCliente');
  return idInventario;
}

// Obtener el ID del inventario desde la URL
const idInventario = obtenerIdInventarioDeURL();

console.log("ID del cliente:", idInventario);

let urlApi = 'http://localhost:3000/'
let url = urlApi + 'cliente/' + idInventario

fetch(url, {
  method: 'GET',
  headers: {
    'x-access-token': token //Pasar el token por headers --> para ser procesado
  }
})
  .then(response => response.json())
  .then(data => mostarInventario(data))
  .catch(error => console.log(error))

//Precargado datos en campos de formulario
mostarInventario = (data) => {
  document.getElementById('nombre').value = data.nombre;
  document.getElementById('mesa').value = data.mesa_idMesa;


};


const editarInventario = document.getElementById('editarPropietario')

editarInventario.addEventListener('click', async (event) => {
  event.preventDefault();
  let nombre = document.getElementById('nombre').value;
  let mesa = document.getElementById('mesa').value;

  if (!nombre || !mesa) {
    Swal.fire('Llene los campos para agregar al nuevo cliente', '', 'warning');
    return;
  }

  let cliente = {
    nombre: nombre,
    mesa_idMesa: mesa
  };

  let clienteJSON = JSON.stringify(cliente);

  console.log(clienteJSON);

  //Relizando peticion PUT
  try {
    let response = await fetch(url, {
      method: 'PUT',
      body: clienteJSON,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token //Pasar el token por headers --> para ser procesado
      }
    });
    if (response.ok) {
      Swal.fire('Cliente modificado exitosamente', '', 'success').then(() => {
        window.location.href = './cliente.html'
      });
    } else {
      console.log('Error al actualizar')
    }
  } catch (error) {
    console.log('Error en la conexión')
  }
})