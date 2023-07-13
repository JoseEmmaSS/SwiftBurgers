// Agregar Inventario
const nuevoProducto = document.getElementById('agregarPlatillo')
// const inputs = document.querySelectorAll('#formulario input')

nuevoProducto.addEventListener('click', async (event) => {
  event.preventDefault();

  let nombre = document.getElementById('nombre').value;
  let precio = document.getElementById('precio').value;
  let descripcion = document.getElementById('descripcion').value;
  let imagen = document.getElementById('file').files[0];
  let nombreImagen = imagen.name;

  if(!nombre || !precio || !descripcion){
    Swal.fire('Llene todos los campos', '', 'warning');
    return
  }
 
  if (imagen) {

    let renderImagen = new FileReader();
    renderImagen.onload = (e) => {
      let imagenCargada = new Image();
      imagenCargada.src =  e.target.result;
      imagenCargada.onload = () => {
        console.log(`Imagen cargada ${imagenCargada}`);
      }
    }
    renderImagen.readAsDataURL(imagen)

    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen' ,nombreImagen);


    try {
      let response = await fetch('http://localhost:3000/agregarPlatillo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire('Producto agregado al inventario', '', 'success');
      } else {
        console.log('Error al agregar el inventario');
      }
    } catch (error) {
      console.log('Error en la conexión');
    }
  } else {
    Swal.fire('Llene los campos para agregar el platillo', '', 'warning');
  }
});
