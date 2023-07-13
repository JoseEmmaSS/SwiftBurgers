// Agregar Inventario
const nuevoProducto = document.getElementById('agregarPlatillo')
// const inputs = document.querySelectorAll('#formulario input')

nuevoProducto.addEventListener('click', async (event) => {
  event.preventDefault();

  let nombre = document.getElementById('nombre').value;
  let precio = document.getElementById('precio').value;
  let descripcion = document.getElementById('descripcion').value;
  let imagen = document.getElementById('imagen').files[0];

  let nombreImagen = imagen.name;

  if (imagen) {
    let renderImagen = new FileReader();
    renderImagen.onload = (e) => {
      let imagenCargada = new Image();
      imagenCargada.src = e.target.result;
      imagenCargada.onload = () => {
        console.log(`Imagen cargada ${imagenCargada}`)
      }
    }
    renderImagen.readAsDataURL(imagen)
  }

  if (!nombre || !precio || !descripcion || !imagen) {
    Swal.fire('Llene los campos para agregar el platillo', '', 'warning');
    return;
  }

  let producto = {
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    imagen: nombreImagen
  };

  let productoJSON = JSON.stringify(producto);

  try {
    let response = await fetch('http://localhost:3000/agregarPlatillo', {
      method: 'POST',
      body: productoJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      Swal.fire('Producto agregado al inventario', '', 'success');
      console.log('Agregado correctamente al inventario');
    } else {
      console.log('Error al agregar el inventario');
    }
  } catch (error) {
    console.log('Error en la conexión');
  }
});
