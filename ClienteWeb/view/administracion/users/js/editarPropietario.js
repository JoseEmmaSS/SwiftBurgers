// Obtener el token de inicio de sesión
let token = localStorage.getItem('userToken')

if (token) {
  console.log(`Token Recuperado: ${token}`)
} else {
  window.location.href = '../../public/user/layout.html'
}

function obtenerIdInventarioDeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const idInventario = urlParams.get('idPropietario');
  return idInventario;
}

// Obtener el ID del inventario desde la URL
const idInventario = obtenerIdInventarioDeURL();

console.log("ID del propietario:", idInventario);

let urlApi = 'http://localhost:3000/'
let url = urlApi + 'propietario/' + idInventario

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
  document.getElementById('apellidoP').value = data.apellidoPaterno;
  document.getElementById('apellidoM').value = data.apellidoMaterno;
  document.getElementById('direccion').value = data.direccion;
  document.getElementById('numeroTelefono').value = data.numeroTelefono;
  document.getElementById('correo').value = data.correo;
  document.getElementById('password').value = data.password;
  document.getElementById('nombreUsuario').value = data.nombreUsuario;
  document.getElementById('salario').value = data.salario;


};


const editarInventario = document.getElementById('editarPropietario')

editarInventario.addEventListener('click', async (event) => {
  event.preventDefault();
  let nombre = document.getElementById('nombre').value;
  let apellidoPaterno = document.getElementById('apellidoP').value;
  let apellidoMaterno = document.getElementById('apellidoM').value;
  let direccion = document.getElementById('direccion').value;
  let numeroTelefono = document.getElementById('numeroTelefono').value;
  let correo = document.getElementById('correo').value;
  let password = document.getElementById('password').value;
  let nombreUsuario = document.getElementById('nombreUsuario').value;
  let salario = document.getElementById('salario').value;

  if (!nombre || !apellidoPaterno || !apellidoMaterno || !direccion || !numeroTelefono || !correo || !password || !nombreUsuario || !salario) {
    Swal.fire('Llene los campos para agregar al nuevo propietario', '', 'warning');
    return;
  }

  let inventario = {
    nombre: nombre,
    apellidoPaterno: apellidoPaterno,
    apellidoMaterno: apellidoMaterno,
    direccion: direccion,
    numeroTelefono: numeroTelefono,
    correo: correo,
    password:password,
    nombreUsuario: nombreUsuario,
    salario: salario
  };

  let propietarioJSON = JSON.stringify(inventario);

  console.log(propietarioJSON);

  //Relizando peticion PUT
  try {
    let response = await fetch(url, {
      method: 'PUT',
      body: propietarioJSON,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token //Pasar el token por headers --> para ser procesado
      }
    });
    if (response.ok) {
      Swal.fire('Producto actualizado', '', 'success').then(() => {
        window.location.href = './propietario.html'
      });
    } else {
      console.log('Error al actualizar')
    }
  } catch (error) {
    console.log('Error en la conexión')
  }
})