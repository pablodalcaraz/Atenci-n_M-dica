document.addEventListener('DOMContentLoaded', () => {
    const formMedicamentos = document.getElementById('formMedicamentos')
    const nombre_medicamento = document.getElementById('nombre_medicamento')
    const errorDescripcion = document.querySelector('.errorDescripcionM')
    const fecha_desde = document.getElementById('fechaDesdeMedicamento')
    const fecha_hasta = document.getElementById('fechaHastaMedicamento')
    const exito = document.querySelector('.exitoMe')
    const accionMedicamento = document.getElementById('accionMedicamento')

    function validarMedicamento(e){
        e.preventDefault()

        let errores = 0

        errorDescripcion.innerHTML = ''
      

        

        if (nombre_medicamento.value === '' && fecha_desde.value === '' && fecha_hasta.value === '') {
            errorDescripcion.innerHTML = '*Debe completar un campo'
            errores ++
        }
       
        if (errores > 0) return; 

        exito.innerHTML = accionMedicamento.value === 'update' ? 
        '¡El medicamento se actualizó exitosamente!' : 
        '¡El medicamento se cargó exitosamente!'

        fetch('/medicamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_medicamento: document.getElementById('id_medicamento').value,
                id_consulta_actual: document.getElementById('id_consulta_actual').value,
                id_consulta_medicamento: document.getElementById('id_consulta_medicamento').value,
                nombre_medicamento: document.getElementById('nombre_medicamento').value || null,
                fecha_registro: document.getElementById('fechaDesdeMedicamento').value || null,
                fecha_hasta: document.getElementById('fechaHastaMedicamento').value || null,
                accionMedicamento: accionMedicamento.value
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
                alert('¡Medicamento actualizado exitosamente!');
                location.reload();
            } else {
                alert('Error al actualizar antecedente');
            }
        })
        .catch(error => console.error('Error al enviar la solicitud:', error));
    }
    
    if (formMedicamentos) {
        formMedicamentos.addEventListener('submit', validarMedicamento )
    }
    nombre_medicamento.addEventListener('focus', ()=> {
        errorDescripcion.innerHTML = ''
    })
    fecha_desde.addEventListener('focus', () => {
         errorDescripcion.innerHTML = ''
    })

    window.editarMedicamento = function(id_medicamento, id_consulta){
        fetch(`/medicamento/${id_medicamento}/${id_consulta}`)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    console.log('Datos del medicamento:', data);
                    document.getElementById('id_medicamento').value = data.medicamento.id_medicamento;
                    document.getElementById('id_consulta_medicamento').value = data.medicamento.id_consulta;
                    document.getElementById('vistaMedicamentos').style.display = 'block';
                }else {
                    alert('Error al cargar los datos del medicamento');
                }
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
                alert('Error al cargar ZZZZlos datos del medicamento');
            })
    }
    document.getElementById('guardarMedicamento').addEventListener('click', () => {
        accionMedicamento.value = 'insert';
    });
   
    
})