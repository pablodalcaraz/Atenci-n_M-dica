document.addEventListener('DOMContentLoaded', () => {
    function validarFiltros(e) {
        const fecha = document.getElementById('fecha');
        const especialidad = document.getElementById('especialidad');
        const errorFecha = document.querySelector('.errorFecha');
        const errorEspecialidad = document.querySelector('.errorEspecialidad');

        errorFecha.style.visibility = 'hidden';
        errorEspecialidad.style.visibility = 'hidden';
    
        let error = [];
    
        if (fecha.value === '') {
            error.push('Campo fecha vacío');
            errorFecha.innerHTML = ('*Seleccione una fecha.');
            errorFecha.style.visibility = 'visible';
        }
    
        if (especialidad && especialidad.value.trim() === '' || especialidad.value === ' ') {
            error.push('Campo especialidad vacío');
            errorEspecialidad.innerHTML = ('*Seleccione una especialidad.');
            errorEspecialidad.style.visibility = 'visible';
        }
    

        if (error.length > 0) {
            e.preventDefault(); 
            fecha.addEventListener('focus', () => {
                 errorFecha.style.visibility = 'hidden'; 
                 errorEspecialidad.style.visibility = 'hidden'; 
            }); 
            especialidad.addEventListener('focus', () => { 
                errorFecha.style.visibility = 'hidden'; 
                errorEspecialidad.style.visibility = 'hidden'; 
            });
            return false;
        }
        return true;
    }
    
    document.getElementById('filtros').addEventListener('submit', validarFiltros);
    

    filtros.addEventListener('submit', validarFiltros);

  
 
    
})
