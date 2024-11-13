document.addEventListener('DOMContentLoaded', () => {
    const formHabitos = document.getElementById('formHabitos')
    const descripcion_habito = document.getElementById('descripcion_habito')
    const errorDescripcion = document.querySelector('.errorDescripcionH')
    const fecha_desde = document.getElementById('fechaDesdeHabito')
    const fecha_hasta = document.getElementById('fechaHastaHabito')
    const exito = document.querySelector('.exitoHa')
    const accionHabito = document.getElementById('accionHabito')

    function validarHabito(e){
        e.preventDefault();

        let errores = 0
        
        errorDescripcion.innerHTML = ''
        

        if (descripcion_habito.value === '' && fecha_desde.value === '' && fecha_hasta.value === '') {
            errorDescripcion.innerHTML = '*Debe completar un campo.'
            errores ++
        }
      
            
        if (errores > 0) return; 

        exito.innerHTML = accionHabito.value === 'update' ? 
        '¡El hábito se actualizó exitosamente!' : 
        '¡El hábito se cargó exitosamente!'

        fetch('/habito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_habitos: document.getElementById('id_habitos').value,
                id_consulta_actual: document.getElementById('id_consulta_actual').value,
                id_consulta_habito: document.getElementById('id_consulta_habito').value,
                descripcion_habito: document.getElementById('descripcion_habito').value || null,
                fecha_desde: document.getElementById('fechaDesdeHabito').value || null,
                fecha_hasta: document.getElementById('fechaHastaHabito').value || null,
                accionHabito: accionHabito.value
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
                alert('¡Hábito actualizado exitosamente!');
                location.reload();
            } else {
                alert('Error al actualizar antecedente');
            }
        })
        .catch(error => console.error('Error al enviar la solicitud:', error));
    }
    
    if (formHabitos) {
        formHabitos.addEventListener('submit', validarHabito)
    }

    descripcion_habito.addEventListener('focus', ()=> {
        errorDescripcion.innerHTML = ''
    })
    fecha_desde.addEventListener('focus', () => {
        errorDescripcion.innerHTML = ''
    })
    window.editarHabito = function(id_habitos, id_consulta){
        fetch(`/habito/${id_habitos}/${id_consulta}`)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    console.log('Datos del hábito:', data);
                    document.getElementById('id_habitos').value = data.habito.id_habitos;
                    document.getElementById('id_consulta_habito').value = data.habito.id_consulta;
                    document.getElementById('vistaHabitos').style.display = 'block';
                }else {
                    alert('Error al cargar los datos del hábito');
                }
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
                alert('Error al cargar los datos del hábito');
            })
    }
    document.getElementById('guardarHabito').addEventListener('click', () => {
        accionHabito.value = 'insert';
    });
})