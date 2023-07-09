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


mostarInventario = (data) => {
  document.getElementById('nombre').value = data.nombre
  document.getElementById('precio').value = data.precio
  document.getElementById('cantidad').value = data.cantidad
  document.getElementById('disponible').checked = data.disponible

  // const fechaC = new Date(data.fechaCaducidad)

  // const dd = fechaC.getDay()
  // const mm = fechaC.getMonth() + 1
  // const yy = fechaC.getFullYear()

  // const fechaFormateada = `${dd.toString().padStart(2, '0')}/${mm.toString().padStart(2, '0')}/${yy}`

  // const fechaInput = document.getElementById('fechaCaducidad');
  // fechaInput.value = fechaFormateada;
}

const editarInventario = document.getElementById('editarInventario')

editarInventario.addEventListener('click', async (event) => {
  event.preventDefault();
  let nombre = document.getElementById('nombre').value
  let fechaCaducidad = document.getElementById('fechaCaducidad').value
  let precio = document.getElementById('precio').value
  let cantidad = document.getElementById('cantidad').value
  let disponible = document.getElementById('disponible').checked

  let inventario = {
    nombre: nombre,
    fechaCaducidad: fechaCaducidad,
    precio: precio,
    cantidad: cantidad,
    disponible: disponible
  }
  let inventarioJSON = JSON.stringify(inventario)
  console.log(inventarioJSON)

  try {
    let response = await fetch(url, {
      method: 'PUT',
      body: inventarioJSON,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(response.ok){
      console.log('Actualizado')
    }else{
      console.log('Error al actualizar')
    }
  } catch (error) {
    console.log('Error en la conexión')
  }
})