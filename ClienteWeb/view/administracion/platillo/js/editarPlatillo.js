function obtenerIdPlatilloDeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const idPlatillo = urlParams.get('idPlatillo');
    return idPlatillo;
}

// Obtener el ID del inventario desde la URL
const idPlatillo = obtenerIdPlatilloDeURL();

console.log(idPlatillo);

//URL de servidor
let urlApi = 'http://localhost:3000/'
// Mostar Inventario
let url = urlApi + 'platillo/' + idPlatillo
console.log(url)
fetch(url)
    .then(response => response.json())
    .then(data => mostarData(data))
    .catch(error => console.log(error))

//Precargado datos en campos de formulario
mostarData = (data) => {
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('precio').value = data.precio;
    document.getElementById('descripcion').value = data.descripcion;
    document.getAnimations('file').value = data.imagen

};



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


const editarPlatillo = document.getElementById('editarPlatillo')

editarPlatillo.addEventListener('click', async (event) => {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value
    let precio = document.getElementById('precio').value
    let descripcion = document.getElementById('descripcion').value

    let nombreImagen = document.getElementById('file').value;

    console.log(nombreImagen)

    //Validaciones de formulario "Verificar que no esté vacío"
    if (!nombre || !precio || !descripcion) {
        Swal.fire('Llene todos los campos', '', 'warning');
        return;
    }
    
    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen' ,nombreImagen);
    formData.append('file', imagen);

    console.log(formData);
    
    try {
        let response = await fetch(url, {
            method: 'PUT',
            body: formData,
        });
        
        if (response.ok) {
            Swal.fire('Platillo actualizado', '', 'success');
        } else {
            throw new Error('Error al actualizar el platillo');
        }
    } catch (error) {
        console.log(error);
        Swal.fire('Error en la conexión', '', 'error');
    }
});