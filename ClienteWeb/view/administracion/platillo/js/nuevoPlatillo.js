// Agregar Inventario
const nuevoProducto = document.getElementById('agregarPlatillo')

let fileInput = document.getElementById('file');

let imagen;

fileInput.addEventListener('change', e => {
  imagen = e.target.files[0];
  console.log(imagen)
  let previewImag = document.getElementById('previewImage');
  if (imagen) {
    let renderImagen = new FileReader();
    renderImagen.onload = (e) => {
      previewImag.src = e.target.result;
    }
    renderImagen.readAsDataURL(imagen)
  }
});

nuevoProducto.addEventListener('click', async (event) => {
  event.preventDefault();

  let nombre = document.getElementById('nombre').value;
  let precio = document.getElementById('precio').value;
  let descripcion = document.getElementById('descripcion').value;
  
  let nombreImagen = imagen.name;

  console.log(nombreImagen)

  if(!nombre || !precio || !descripcion){
    Swal.fire('Llene todos los campos', '', 'warning');
    return
  } 
    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen' ,nombreImagen);
    formData.append('file', imagen);
    
    try {
      let response = await fetch('http://localhost:3000/agregarPlatillo', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        Swal.fire('Producto agregado', '', 'success');
      } else {
        console.log('Error al agregar el producto');
      }
    } catch (error) {
      console.log('Error en la conexión');
    }
});