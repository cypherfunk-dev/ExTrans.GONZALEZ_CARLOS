let formIsValid = false;
let modalconfirmacion;

document.addEventListener('DOMContentLoaded', function() {
  let guardar = document.getElementById('guardar-cambios');

  guardar.addEventListener('click', function () {
    if (formIsValid) {
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const correo = document.getElementById("email").value;
      const cargo = document.getElementById("cargo");
      const ingreso = document.getElementById("ingreso").value;

      const selectedOption = cargo.options[cargo.selectedIndex];
      const cargo_text = selectedOption.textContent;

      agregartrabajador(nombre, apellido, correo, cargo_text, ingreso);
      renderizarTrabajadores();
      modalconfirmacion.hide();
      formIsValid = false; 
    }
  });
});

function validarMayoriaEdad() {
  let nacimiento = document.getElementById("nacimiento");
  let ingreso = document.getElementById("ingreso");
  let nac = new Date(nacimiento.value);
  let ing = new Date(ingreso.value);
  let edad = ing.getFullYear() - nac.getFullYear();
  let mes = ing.getMonth() - nac.getMonth();
  let dia = ing.getDate() - nac.getDate();
  let resultado = edad + (mes / 12) + (dia / 365);
  if (resultado < 17.983561643835618) {
    Swal.fire({
      title: "¡Error!",
      text: "El Trabajador no cumple con mayoría de edad a la fecha de ingreso.",
    });
    return false;
  } else {
    return true;
  }
}

function validarCorreo(correo) {
  const resultado = trabajadores.find(trabajador => trabajador.correo === correo);
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const test = regex.test(correo);

  const feedbackDiv = document.querySelector('.email-incorrecto');
  if (feedbackDiv) {
    feedbackDiv.remove();
  }

  const emailInput = document.getElementById("email");
  const formGroup = document.querySelector('.form-group.col-md-12.emilio');

  if (!test || correo === "") {
    const newDiv = document.createElement('div');
    newDiv.classList.add('invalid-feedback', 'email-incorrecto');
    newDiv.textContent = 'El correo no es válido';
    formGroup.appendChild(newDiv);
    emailInput.classList.add('is-invalid');
    return false;
  }

  if (resultado) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('invalid-feedback', 'email-incorrecto');
    newDiv.textContent = 'El correo ya está registrado';
    formGroup.appendChild(newDiv);
    emailInput.classList.add('is-invalid');
    return false;
  }

  return true;
}

function validarFormulario(event) {
  event.preventDefault();
  formIsValid = true; // Reinicia la variable de validación
  // Eliminar clases de error previas
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
  });

  const nombre = document.getElementById("nombre");
  if (nombre.value.trim() === "") {
    nombre.classList.add('is-invalid');
    formIsValid = false;
  }
  const apellido = document.getElementById("apellido");
  if (apellido.value.trim() === "") {
    apellido.classList.add('is-invalid');
    formIsValid = false;
  }
  const cargo = document.getElementById("cargo");
  if (cargo.value === "Escoja su opción") {
    cargo.classList.add('is-invalid');
    formIsValid = false;
  }
  const nacimiento = document.getElementById("nacimiento");
  if (nacimiento.value === "") {
    nacimiento.classList.add('is-invalid');
    formIsValid = false;
  }
  const correo = document.getElementById("email");
  if (!validarCorreo(correo.value)) {
    formIsValid = false;
  }
  const ingreso = document.getElementById("ingreso");
  if (ingreso.value === "") {
    ingreso.classList.add('is-invalid');
    formIsValid = false;
  }
  if (nacimiento.value && ingreso.value && formIsValid) {
    if (!validarMayoriaEdad()) {
      formIsValid = false;
    }
  }
  if (formIsValid) {
    modalconfirmacion = new bootstrap.Modal(document.getElementById('modalconfirmacion'));

    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = '';
    const selectedOption = cargo.options[cargo.selectedIndex];
    const cargo_text = selectedOption.textContent;

    const row = document.createElement('div');
    row.innerHTML = `
      Nombre: ${nombre.value + " " + apellido.value} <br>
      Correo: ${correo.value} <br>
      Cargo: ${cargo_text} <br>
      Ingreso: ${ingreso.value}<br>
    `;
    modalBody.appendChild(row);
    modalconfirmacion.show();
  }
}

function agregartrabajador(nombre, apellido, correo, cargo, ingreso) {
  let nuevo = {
    nombre: nombre + " " + apellido,
    correo: correo,
    cargo: cargo,
    fecha_ingreso: ingreso
  };
  trabajadores.push(nuevo);
}

function renderizarTrabajadores() {
  // Aquí puedes implementar la lógica para renderizar la lista de trabajadores
  console.log(trabajadores);
}
