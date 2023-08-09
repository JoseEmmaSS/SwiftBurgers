const btnLogin = document.getElementById('btnLogin')
const inputs = document.querySelectorAll('#formularioLogin input')

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();

    let correo = document.getElementById('correo').value;
    let password = document.getElementById('password').value;

    if (!correo || !password) {
        Swal.fire({
            title: 'Complete los campos',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            confirmButtonColor: '#facc15'

        })
        return;
    }

    let login = {
        correo: correo,
        password: password
    }

    let loginJSON = JSON.stringify(login)

    try {
        let login = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: loginJSON,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (login.ok) {
            // Obtener el token del usuario que accedio
            let data = await login.json()
            let token = data.token
            console.log(token)
            //Almacenar el token el el navegador usando localStorage
            localStorage.setItem('userToken', token)
            //Mensaje de acceso correcto
            Swal.fire({
                title: 'Bienvenido',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                confirmButtonColor: '#facc15'
            })
            setTimeout(() => {
                window.location.href = '../administracion/index.html'
            }, 1700);

        } else {
            Swal.fire({
                title: 'Datos Incorrectos',
                text: 'Verifique su correo y contraseña',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#FF0000'
            });
        }
    } catch (error) {
        console.log('Error de conexión')
    }
})

