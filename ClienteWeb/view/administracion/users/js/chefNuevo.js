// Agregar Propietario

const nuevoPropietario = document.getElementById('agregarChef')

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


  let chefs = {
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

  let chefJSON = JSON.stringify(chefs);

  console.log(chefJSON);

  try {
    let response = await fetch('http://localhost:3000/nuevoChef', {
      method: 'POST',
      body: chefJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Inventario agregado exitosamente');
    } else {
      console.log('Error al agregar el inventario');
    }
  } catch (error) {
    console.log('Error en la conexión');
  }
});
