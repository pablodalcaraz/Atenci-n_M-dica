document.addEventListener('DOMContentLoaded', () => {
    const body = document.body.style
    if (window.location.pathname === '/') {
        body.backgroundImage = "url('/images/familias-felices.jpg')"
        body.backgroundSize = 'cover'
        body.backgroundRepeat = 'no repeat'
    }else{
        body.backgroundColor= "#f2f0eb"
      
    }
   
    const ingresar = document.getElementById('ingresar');
    const formLogin = document.getElementById('formLogin');
    if (ingresar && formLogin) {
        ingresar.addEventListener('click', () => {
            formLogin.style.visibility = formLogin.style.visibility === 'visible' ? 'hidden' : 'visible';
        });
    }
    // validar formulario login
    const userLogin = document.getElementById('userLogin');
    const mail = document.getElementById('mail');
    const password = document.getElementById('password');
    const errorMail = document.querySelector('.errorMail');
    const errorPassword = document.querySelector('.errorPassword');
    //const errorCredenciales = document.getElementById('errorCredenciales')
    const validarLogin = (e) => {
        let isValid = true;
        errorMail.innerHTML = '';
        errorPassword.innerHTML = '';

        if (mail.value.trim() === '' && password.value.trim() === '') {
            errorMail.innerHTML = '*Debe completar los campos.';
            errorMail.style.visibility = 'visible';
            isValid = false;
        } else {
            let mail_er = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let pass_er = /^(?=.*[A-Z])(?=.*[a-z])(?=(?:\D*\d){3})[A-Za-z\d]{1,10}$/;
            if (mail.value.trim() === '') {
                errorMail.innerHTML = '*Campo obligatorio.';
                errorMail.style.visibility = 'visible';
                isValid = false;
            } else if (!mail_er.test(mail.value)) {
                errorMail.innerHTML = '*E-mail no válido.';
                errorMail.style.visibility = 'visible';
                isValid = false;
            }
            if (password.value.trim() === '') {
                errorPassword.innerHTML = '*Campo obligatorio.';
                errorPassword.style.visibility = 'visible';
                isValid = false;
            } else if (!pass_er.test(password.value)) {
                errorPassword.innerHTML = '*Contraseña no válida.';
                errorPassword.style.visibility = 'visible';
                isValid = false;
            }
        }

        
    }

    userLogin.addEventListener('submit', validarLogin);
    
    userLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        validarLogin(e);
        if (errorMail.innerHTML || errorPassword.innerHTML) {
            return; 
        }
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mail: mail.value,
                    password: password.value
                })
            });
    
            console.log('Respuesta del servidor:', response);
            
            if (response.ok) {
                console.log('Redireccionando a agenda...');
                window.location.href = '/agenda';
            } else {
                const result = await response.json();
                console.log('Error en las credenciales:', result);
                errorCredenciales.textContent = result.errorCredenciales || 'Credenciales incorrectas';
                errorCredenciales.style.display = 'block';
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            errorCredenciales.textContent = 'Error al conectar con el servidor. Intente nuevamente.';
            errorCredenciales.style.display = 'block';
        }
    });

    mail.addEventListener('focus', () => {
        errorCredenciales.textContent = ''
        mail.value = '';
        errorMail.innerHTML = '';
        errorMail.style.visibility = 'hidden';
    });

    password.addEventListener('focus', () => {
        errorCredenciales.textContent = ''
        password.value = '';
        errorPassword.innerHTML = '';
        errorPassword.style.visibility = 'hidden';
    });


    // mostrar/ocultar botón logout
    const userIcon = document.getElementById('userIcon');
    const cerrarSesion = document.getElementById('cerrarSesion');
    if (userIcon && cerrarSesion) {
        cerrarSesion.style.display = 'none';
        userIcon.addEventListener('click', () => {
            console.log('Evento click en userIcon')
            cerrarSesion.style.display = cerrarSesion.style.display === 'block' ? 'none' : 'block';
        });
        cerrarSesion.addEventListener('click', () => {
            window.location.href = '/';
        });
    }
});
