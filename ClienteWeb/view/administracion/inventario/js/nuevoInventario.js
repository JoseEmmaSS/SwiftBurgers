// Agregar Inventario
const nuevoInventario = document.getElementById('agregarInventario')
const inputs = document.querySelectorAll('#formulario input')

nuevoInventario.addEventListener('click', async (event) => {
  event.preventDefault();

  let nombre = document.getElementById('nombre').value;
  let fechaCaducidad = document.getElementById('fechaCaducidad').value;
  let precio = document.getElementById('precio').value;
  let cantidad = document.getElementById('cantidad').value;

  //Agregar Fecha actual de ingreso del producto
  let fechaActual = new Date();
  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;
  let año = fechaActual.getFullYear();
  let fechaActualFormateada = `${año}-${mes}-${dia}`;

  let inventario = {
    nombre: nombre,
    fechaCaducidad: fechaCaducidad,
    fechaIngreso: fechaActualFormateada,
    precio: precio,
    cantidad: cantidad,
    disponible: true
  };

  let inventarioJSON = JSON.stringify(inventario);

  // console.log(inventarioJSON);

  try {
    let response = await fetch('http://localhost:3000/agregarInventario', {
      method: 'POST',
      body: inventarioJSON,
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




