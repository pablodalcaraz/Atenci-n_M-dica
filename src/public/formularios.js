document.addEventListener('DOMContentLoaded', () => {
  const botones = [
      { boton: document.getElementById('cargarAlergias'), vista: document.getElementById('vistaAlergias') },
      { boton: document.getElementById('cargarAntecedentes'), vista: document.getElementById('vistaAntecedentes') },
      { boton: document.getElementById('cargarHabitos'), vista: document.getElementById('vistaHabitos') },
      { boton: document.getElementById('cargarMedicamentos'), vista: document.getElementById('vistaMedicamentos') },
  ];

  const ocultarTodasLasVistas = () => {
      botones.forEach(({ vista, boton }) => {
          vista.style.display = 'none';
          boton.textContent = 'Cargar/Editar ' + boton.textContent.split(' ')[1];
      });
  };

  botones.forEach(({ boton, vista }) => {
      boton.addEventListener('click', () => {
          const isVistaVisible = vista.style.display === 'block';
          ocultarTodasLasVistas();
          if (!isVistaVisible) {
              vista.style.display = 'block';
              boton.textContent = 'Cerrar ' + boton.textContent.split(' ')[1];
          }
      });
  });
  //editar diagnostico
  document.getElementById('editarDiagnostico').addEventListener('click', function() {
    document.getElementById('accion').value = 'update';
  });
  document.getElementById('guardarDiagnostico').addEventListener('click', function() {
    document.getElementById('accion').value = 'insert';
  }); 
  //editar evolucion
  document.getElementById('editarEvolucion').addEventListener('click', function() {
    document.getElementById('accionEvolucion').value = 'update';
  });
  document.getElementById('guardarEvolucion').addEventListener('click', function() {
    document.getElementById('accionEvolucion').value = 'insert';
  }); 
  //editar alergia
  document.getElementById('editarAlergia').addEventListener('click', function() {
    document.getElementById('accionAlergia').value = 'update';
  });
  document.getElementById('guardarAlergia').addEventListener('click', function() {
    document.getElementById('accionAlergia').value = 'insert';
  }); 
  //editar antecedente
  document.getElementById('editarAntecedente').addEventListener('click', function() {
    document.getElementById('accionAntecedente').value = 'update';
  });
  document.getElementById('guardarAntecedente').addEventListener('click', function() {
    document.getElementById('accionAntecedente').value = 'insert';
  }); 
  //editar habito
  document.getElementById('editarHabito').addEventListener('click', function() {
    document.getElementById('accionHabito').value = 'update';
  });
  document.getElementById('guardarHabito').addEventListener('click', function() {
    document.getElementById('accionHabito').value = 'insert';
  });
  //editar medicamentos
  document.getElementById('editarMedicamento').addEventListener('click', function() {
    document.getElementById('accionMedicamento').value = 'update';
  });
  document.getElementById('guardarMedicamento').addEventListener('click', function() {
    document.getElementById('accionMedicamento').value = 'insert';
  });
});
