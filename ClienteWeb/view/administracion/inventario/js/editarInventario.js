function obtenerIdInventarioDeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const idInventario = urlParams.get('idInventario');
  return idInventario;
}

// Obtener el ID del inventario desde la URL
const idInventario = obtenerIdInventarioDeURL();

console.log("ID del inventario:", idInventario);

let urlApi = 'http://localhost:3000/'
let url = urlApi + 'inventario/' + idInventario
fetch(url)
  .then(response => response.json())
  .then(data => mostarInventario(data))
  .then(error => console.log(error))

//Precargado datos en campos de formulario
mostarInventario = (data) => {
  document.getElementById('nombre').value = data.nombre;
  document.getElementById('precio').value = data.precio;
  document.getElementById('cantidad').value = data.cantidad;
  document.getElementById('disponible').checked = data.disponible;

  const fechaC = new Date(data.fechaCaducidad);

  const dd = fechaC.getDate(); // Obtener el día del mes
  const mm = fechaC.getMonth() + 1; // Obtener el mes (se suma 1 porque los meses en JavaScript son 0-11)
  const yy = fechaC.getFullYear(); // Obtener el año

  const fechaFormateada = `${yy}-${mm.toString().padStart(2, '0')}-${dd.toString().padStart(2, '0')}`;

  const fechaInput = document.getElementById('fechaCaducidad');
  fechaInput.value = fechaFormateada;
};


const editarInventario = document.getElementById('editarInventario')

editarInventario.addEventListener('click', async (event) => {
  event.preventDefault();
  let nombre = document.getElementById('nombre').value
  let fechaCaducidad = document.getElementById('fechaCaducidad').value
  let precio = document.getElementById('precio').value
  let cantidad = document.getElementById('cantidad').value
  let disponible = document.getElementById('disponible').checked

  //Validaciones de formulario "Verificar que no este vacio"
  if (!nombre || !fechaCaducidad || !precio || !cantidad) {
    Swal.fire('Llene todos los campos', '', 'wraning')
    return;
  }

  //Obtener valores en arreglo
  let inventario = {
    nombre: nombre,
    fechaCaducidad: fechaCaducidad,
    precio: precio,
    cantidad: cantidad,
    disponible: disponible
  }
  //Dar formato JSON para ser procesado
  let inventarioJSON = JSON.stringify(inventario)

  //Relizando peticion PUT
  try {
    let response = await fetch(url, {
      method: 'PUT',
      body: inventarioJSON,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      Swal.fire('Producto actualizado', '', 'success').then(()=>{
        window.location.href = './inventario.html'
      });
    } else {
      console.log('Error al actualizar')
    }
  } catch (error) {
    console.log('Error en la conexión')
  }
})