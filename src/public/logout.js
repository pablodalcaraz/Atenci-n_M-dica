document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('userIcon');
    const cerrarSesion = document.getElementById('cerrarSesion');

    if (userIcon && cerrarSesion) {
        cerrarSesion.style.display = 'none';

        userIcon.addEventListener('click', () => {
            cerrarSesion.style.display = cerrarSesion.style.display === 'block' ? 'none' : 'block';
        });

        cerrarSesion.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    
});


