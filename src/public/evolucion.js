document.addEventListener("DOMContentLoaded", () => {
  const formEvolucion = document.getElementById("formEvolucion");
  const fechaEv = document.getElementById("fechaEvolucion");
  const editor = document.getElementById('editor-container')
  const errorFechaEv = document.querySelector(".errorFechaEv");
  const exito = document.querySelector(".exitoEv");
  const accion = document.getElementById('accionEvolucion')

  function validarEvolucion(e) {
  
    errorFechaEv.innerHTML = "";
  
    let errores = [];
  
    if (fechaEv.value.trim() === "" ) {
      errorFechaEv.innerHTML = "*Debe completar los campos.";
      errores.push("error validación");
    }
  
    if (errores.length > 0) {
      e.preventDefault();
      
    }else{
      if (accion.value === 'update') { 
          exito.innerHTML = '¡La evolución se actualizó exitosamente!'; 
      } else { 
          exito.innerHTML = '¡La evolución se cargó exitosamente!'; 
      }
     
  }

  }
  if (formEvolucion) {
    formEvolucion.addEventListener("submit", validarEvolucion);
  }
  


  fechaEv.addEventListener("focus", () => {
    fechaEv.value = ''
    errorFechaEv.innerHTML = ""
  });
});

