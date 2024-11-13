document.addEventListener('DOMContentLoaded', () => {
    const formAntecedentes = document.getElementById('formAntecedentes')
    const descripcion_antecedente = document.getElementById('descripcion_antecedente')
    const errorDescripcion = document.querySelector('.errorDescripcion')
    const fechaDesdeAntecedente = document.getElementById('fechaDesdeAntecedente')
    const fechaHastaAntecedente = document.getElementById('fechaHastaAntecedente')
    const exito = document.querySelector('.exitoAn')
    const accionAntecedente = document.getElementById('accionAntecedente')

    function validarAntecedente(e){
        e.preventDefault()

        let errores = 0
        errorDescripcion.innerHTML = ''
      


        if (descripcion_antecedente.value === '' && fechaDesdeAntecedente.value === '' && fechaHastaAntecedente.value === '') {
            errorDescripcion.innerHTML = '*Debe completar un campo.'
            errores ++
        }
       
        if (errores > 0) return; 

        exito.innerHTML = accionAntecedente.value === 'update' ? 
        '¡El antecedente se actualizó exitosamente!' : 
        '¡El antecedente se cargó exitosamente!'

        fetch('/antecedente', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_antecedentes: document.getElementById('id_antecedentes').value,
                id_consulta_actual: document.getElementById('id_consulta_actual').value,
                id_consulta_antecedente: document.getElementById('id_consulta_antecedente').value,
                descripcion_antecedente: document.getElementById('descripcion_antecedente').value || null,
                fecha_desde: document.getElementById('fechaDesdeAntecedente').value || null,
                fecha_hasta: document.getElementById('fechaHastaAntecedente').value || null,
                accionAntecedente: accionAntecedente.value
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
                alert('¡Antecedente actualizado exitosamente!');
                location.reload();
            } else {
                alert('Error al actualizar antecedente');
            }
        })
        .catch(error => console.error('Error al enviar la solicitud:', error));
    }
    if (formAntecedentes) {
        formAntecedentes.addEventListener('submit', validarAntecedente)
    }
    descripcion_antecedente.addEventListener('focus', () => { errorDescripcion.innerHTML = ''; })
    fechaDesdeAntecedente.addEventListener('focus', () => { errorDescripcion.innerHTML = ''; })

    window.editarAntecedente = function(id_antecedentes, id_consulta){
        fetch(`/antecedente/${id_antecedentes}/${id_consulta}`)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    console.log('Datos del antecedente:', data);
                    document.getElementById('id_antecedentes').value = data.antecedente.id_antecedentes;
                    document.getElementById('id_consulta_antecedente').value = data.antecedente.id_consulta;
                    document.getElementById('vistaAntecedentes').style.display = 'block';
                }else {
                    alert('Error al cargar los datos del antecedente');
                }
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
                alert('Error al cargar los datos del antecedente');
            })
    }
    document.getElementById('guardarAntecedente').addEventListener('click', () => {
        accionAntecedente.value = 'insert';
    });
})