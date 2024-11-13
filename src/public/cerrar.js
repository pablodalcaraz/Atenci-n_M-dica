document.addEventListener('DOMContentLoaded', () => {
    const formCerrarConsulta = document.getElementById('cerrarConsultaForm');
    const mensajeError = document.getElementById('mensajeError');

    formCerrarConsulta.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idConsulta = document.querySelector('input[name="id_consulta"]').value;

        try {
            const response = await fetch('/cerrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_consulta: idConsulta })
            });

            if (response.ok) {
                window.location.href = '/agenda';
            } else {
                const result = await response.json();
                mensajeError.textContent = result.message;
                mensajeError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al cerrar consulta:', error);
            mensajeError.textContent = 'Ocurrió un error al cerrar la consulta. Intente nuevamente.';
            mensajeError.style.display = 'block';
        }
    });

    const fields = document.querySelectorAll('#formDiagnostico input, #formDiagnostico select, #formDiagnostico textarea, #formEvolucion input, #formEvolucion select'); 
    fields.forEach(field => { 
        field.addEventListener('focus', () => { 
            mensajeError.textContent = ''; 
            mensajeError.style.display = 'none'; 
        });
     });
});
