document.addEventListener('DOMContentLoaded', () => {
    const formAlergias = document.getElementById('formAlergias');
    const nombreAlergia = document.getElementById('nombreAlergia');
    const importanciaAlergia = document.getElementById('importanciaAlergia');
    const fecha_desde_alergia = document.getElementById('fecha_desde_alergia');
    const fecha_hasta_alergia = document.getElementById('fecha_hasta_alergia');
    const errorNombre = document.querySelector('.errorNombre');
    const exito = document.querySelector('.exitoAl');
    const accionAlergia = document.getElementById('accionAlergia');

    function validarYEnviarAlergia(e) {
        e.preventDefault();

        let errores = 0;
        errorNombre.innerHTML = '';

     
        if (nombreAlergia.value.trim() === '' && importanciaAlergia.value.trim() === '' && fecha_desde_alergia.value.trim() === '' && fecha_hasta_alergia.value.trim() === '' ) {
            errorNombre.innerHTML = '*Debe completar un campo.';
            errores++;
        }

        if (errores > 0) return; 

       
        exito.innerHTML = accionAlergia.value === 'update' ? 
            '¡La alergia se actualizó exitosamente!' : 
            '¡La alergia se cargó exitosamente!';

        
        fetch('/alergia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_alergia: document.getElementById('id_alergia').value,
                id_consulta_actual : document.getElementById('id_consulta_actual').value,
                id_consulta_actualizar: document.getElementById('id_consulta_actualizar').value,
                id_descripcion_alergia: nombreAlergia.value || null,
                id_importancia_alergia: importanciaAlergia.value || null,
                fecha_desde: fecha_desde_alergia.value || null,
                fecha_hasta: document.getElementById('fecha_hasta_alergia').value || null,
                accionAlergia: accionAlergia.value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(exito.innerHTML);
                location.reload(); 
            } else {
                alert('Error al actualizar la alergia');
            }
        })
        .catch(error => console.error('Error al enviar la solicitud:', error));
    }

    if (formAlergias) {
        formAlergias.addEventListener('submit', validarYEnviarAlergia);
    }

   
    nombreAlergia.addEventListener('focus', () => { errorNombre.innerHTML = ''; });
    importanciaAlergia.addEventListener('focus', () => { errorNombre.innerHTML = ''; });
    fecha_desde_alergia.addEventListener('focus', () => { errorNombre.innerHTML = ''; });

    window.editarAlergia = function(id_alergia, id_consulta) {
        fetch(`/alergia/${id_alergia}/${id_consulta}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('id_alergia').value = data.alergia.id_alergia;
                    document.getElementById('id_consulta_actualizar').value = data.alergia.id_consulta; document.getElementById('nombreAlergia').value = data.alergia.id_descripcion_alergia || ''; 
                    document.getElementById('importanciaAlergia').value = data.alergid_importancia_alergia || ''; 
                    document.getElementById('fecha_desde_alergia').value = data.alergia.fecha_desde || ''; document.getElementById('fecha_hasta_alergia').value = data.alergia.fecha_hasta || ''; document.getElementById('accionAlergia').value = 'update'; 
                    document.getElementById('vistaAlergias').style.display = 'block';
                } else {
                    alert('Error al cargar los datos de la alergia');
                }
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
                alert('Error al cargar los datos de la alergia');
            });
    };


    document.getElementById('guardarAlergia').addEventListener('click', () => {
        accionAlergia.value = 'insert';
    });
});
