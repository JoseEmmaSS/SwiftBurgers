const btnLogin = document.getElementById('btnLogin')
const inputs = document.querySelectorAll('#formularioLogin input')

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();

    let correo = document.getElementById('correo').value;
    let password = document.getElementById('password').value;

    if (!correo || !password) {
        Swal.fire('Complete todos los campos', '', 'warning');
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
            Swal.fire('Bienvenido', '', 'success')
            
        }else{
            Swal.fire('Datos icorrectos', 'Revisa tu correo o contraseña', 'error');
        }
    } catch (error) {
        console.log('Error de conexión')
    }   
    
})

