//URL de servidor
let urlApi = 'http://localhost:3000/'

//Retornar imagen
const image = (id) => {
    fetch(`http://localhost:3000/platilloImg/${id}`)
        .then(response => response.blob())
        .then(blob => {
            const img = document.getElementById(`imagenPlatillo${id}`);
            img.src = URL.createObjectURL(blob);
        })
        .catch(error => console.error(error));
};

let url = urlApi + 'platillo'
fetch(url)
    .then(response => response.json())
    .then(data => mostarData(data))
    .catch(error => console.log(error))


mostarData = (data) => {

    // console.log(data);

    for (let i = 0; i < data.length; i++) {
        const contenedor = document.createElement('div');
        contenedor.classList.add("w-full", "max-w-lg", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700");

        //Crear ancla de contenedor de imagen
        const contenedorImagen = document.createElement('div');
        contenedorImagen.classList.add('modal-container');

        document.body.appendChild(contenedorImagen); 

        document.querySelectorAll('.modal-container img').forEach(el => {
            el.addEventListener('click', function (ev) {
                ev.stopImmediatePropagation();
                this.parentNode.classList.add('active');
                console.log('Imagen clicada');
            });
        });

        document.querySelectorAll('.modal-container').forEach(el => {
            el.addEventListener('click', function (ev) {
                this.classList.remove('active');
                console.log('Imagen clicada');
            });
        });




        //Contenedor de la imagen
        const imagen = document.createElement('img');
        imagen.id = `imagenPlatillo${data[i].idPlatillo}`

        image(data[i].idPlatillo);

        contenedorImagen.appendChild(imagen);

        contenedor.appendChild(contenedorImagen)


        //Crear contenedor de información
        const contenedorInformacion = document.createElement('div')
        contenedorInformacion.classList.add("px-5", "pb-5");

        const anclaTitulo = document.createElement('a')

        //Mostrar nombre
        const nombre = document.createElement('h5')
        nombre.classList.add("text-xl", "font-semibold", "tracking-tight", "text-gray-900", "dark:text-white");

        //Valor para mostrar
        nombre.textContent = data[i].nombre

        //Agregarlo a su contendor
        anclaTitulo.appendChild(nombre)

        //Agregar a su contenedor padre
        contenedorInformacion.appendChild(anclaTitulo)


        //Contenedor precio
        const contenedorPrecio = document.createElement('div');
        contenedorPrecio.classList.add("flex", "items-center", "justify-between")

        //Mostar precio
        const precio = document.createElement('span');
        precio.classList.add("text-3xl", "font-bold", "dark:text-white")
        precio.textContent = `$ ${data[i].precio}`

        //Mostar boton
        const verBotton = document.createElement('a');
        verBotton.textContent = 'Ver'
        verBotton.classList.add("text-white", "bg-yellow-700", "hover:bg-yellow-800", "focus:ring-4", "focus:outline-none", "focus:ring-yellow-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-yellow-600", "dark:hover:bg-yellow-700", "dark:focus:ring-yellow-800");

        //Agregar precio a su contenedor
        contenedorPrecio.appendChild(precio)

        contenedorPrecio.appendChild(verBotton)

        //Agregar al contenedor padre de información
        contenedorInformacion.appendChild(contenedorPrecio)

        contenedor.appendChild(contenedorInformacion)

        const contenedorPadre = document.getElementById('dynamic-container')
        contenedorPadre.appendChild(contenedor)

    }
}
