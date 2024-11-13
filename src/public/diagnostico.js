document.addEventListener('DOMContentLoaded', () => {
    const formDiagnostico = document.getElementById('formDiagnostico');
    const descripcion = document.getElementById('diagnostico');
    const errorDescripcion = document.getElementById('errorDescripcion');
    const estado = document.getElementById('estado_diagnostico');
    const desde = document.getElementById('fechaDesde');
    const hasta = document.getElementById('fechaHasta');
    const exito = document.querySelector('.exito')


    function validarDiagnostico(e) {
        errorDescripcion.innerHTML = '';

        let errores = []

        if (descripcion.value.trim() === '' && estado.value.trim() === '' && desde.value.trim() === '' && hasta.value.trim() === '' ) {
            errorDescripcion.innerHTML = '*Debe completar un campo.';
            errores.push('error validación')
        }
      
        if (errores.length > 0) {
            e.preventDefault();
            
        }else{
            if (accion.value === 'update') { 
                exito.innerHTML = '¡El diagnóstico se actualizó exitosamente!'; 
            } else { 
                exito.innerHTML = '¡El diagnóstico se cargó exitosamente!'; 
            }
           
        }
        
        
    }

    if (formDiagnostico) {
        formDiagnostico.addEventListener('submit', validarDiagnostico);

    }
    

    descripcion.addEventListener('focus', () => {
        descripcion.value = ''
        errorDescripcion.innerHTML = '';
    });
    estado.addEventListener('focus', () => { 
        estado.value = ''
        errorDescripcion.innerHTML = '';
    });
    desde.addEventListener('focus', () => {   
        desde.value = ''
        errorDescripcion.innerHTML = '';
    });
    hasta.addEventListener('focus', () => {   
        hasta.value = ''
        errorDescripcion.innerHTML = '';
    });
});
