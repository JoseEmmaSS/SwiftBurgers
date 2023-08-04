// // Obtener el token de inicio de seción
// let token = localStorage.getItem('userToken')

const { default: Swal } = require("sweetalert2");

// //Validar si el usuario inicio sesión, si no redirecciona a la pagina de inicio
// if (token) {
//   console.log(`Token Recuperado: ${token}`)
// } else {
//   window.location.href = '../../public/user/layout.html'
// }

// Agregar Propietario
const nuevoPropietario = document.getElementById('agregarPropietario')

nuevoPropietario.addEventListener('click', async (event) => {
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

  try {
    let response = await fetch('http://localhost:3000/nuevoPropietario', {
      method: 'POST',
      body: propietarioJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      Swal.fire("Propietario agregado exitosamente")
      console.log('Propietario agregado exitosamente');
  } else {
      const responseData = await response.json();
      if (responseData.error) {
          Swal.fire(responseData.msg, '', 'warning');
      } else {
        Swal.fire(responseData.msg, '', 'Repeated mail');
        console.log('Error al agregar al nuevo propietario');
      }
  }
} catch (error) {
  console.log('Error en la conexión');
}
});
