let idPropietario = localStorage.getItem('idPropietario');

const menuButton = document.getElementById('menuButton');
const menuDropdown = document.getElementById('menuDropdown');

menuButton.addEventListener('click', function () {
    menuDropdown.classList.toggle('hidden');
});

//Token
// Obtener el token de inicio de seción
const btnLogOut = document.getElementById('logOut')

btnLogOut.addEventListener('click', async () => {
    let token = localStorage.getItem('userToken')

    //Validar si el usuario inicio sesión, si no redirecciona a la pagina de inicio
    if (token) {
        console.log(`Token Recuperado: \n ${token}`)
    } else {
        console.log('No hay nada')
    }

    let logOut = {
        idPropietario: idPropietario
    }

    let logOutJSON = JSON.stringify(logOut)

    try {
        let logOutPOST = await fetch('http://localhost:3000/logOut', {
            method: 'POST',
            body: logOutJSON,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (logOutPOST.ok) {
            console.log('Token eliminado')
            localStorage.removeItem('userToken', null)
            window.location.href = '../auth/login.html'
            
        } else {
            console.log('Token no eliminado')
        }
    } catch (error) {
        console.log(error)
    }

})

