// Agregar Propietario

const nuevoPropietario = document.getElementById('agregarCliente')

nuevoPropietario.addEventListener('click', async (event) => {
  event.preventDefault();
  let nombre = document.getElementById('nombre').value;
  let mesa = document.getElementById('mesa').value;


  let cliente = {
    nombre: nombre,
    mesa_idMesa: mesa
  };

  let clienteJSON = JSON.stringify(cliente);

  console.log(clienteJSON);

  try {
    let response = await fetch('http://localhost:3000/agregarCliente', {
      method: 'POST',
      body: clienteJSON,
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
