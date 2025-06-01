import Cuentas from "./classAccount.js";
// Funciones
const abrirModal = () => {
  const modalContacto = new bootstrap.Modal(
    document.getElementById("modalRegistro")
  );
  // Aqui abro la ventana modal
  modalContacto.show();
};

const crearUsuario = () => {
  //TODO: tomar los datos del formulario

  // con los datos voy a crear un objeto usuario
  const usuarioNuevo = new Cuentas(
    inputIDCuenta.value,
    inputContraseña.value,
    inputReContraseña.value,
    inputEmail.value
  );
  // guardar el usuario en un array
  cuentas.push(usuarioNuevo);
  // guardar el array de cuentas en el local storage
  guardarLocalStorage();
  // dibujar esta cuenta en la tabla
  dibujarFIla(usuarioNuevo, cuentas.length);
  // limpiar el form
  limpiarFormulario();
  // mostrar un mensaje al usuario cuando crea su cuenta
  Swal.fire({
    title: "Cuenta creada",
    // text: `La cuenta ${cuentas.length} fue creada exitosamente`,
    text: "Su cuenta fue creada exitosamente",
    icon: "success",
  });
};

const limpiarFormulario = () => {
  formularioRegistro.reset();
};

const guardarLocalStorage = () => {
  localStorage.setItem("keyCuenta", JSON.stringify(cuentas));
};

const cargarDatosEnLaTabla = () => {
  // verificar si la tabla tiene datos
  if (cuentas.length != 0) {
    // dibujar una fila por cada contacto de la agenda
    cuentas.map((cuenta, indice) => dibujarFIla(cuenta, indice + 1));
  } else {
    //TODO: si no hay datos en la agenda mostrar un mensaje para el usuario
  }
};

const dibujarFIla = (cuenta, indice) => {
  // agregar una fila (tr) nueva al tbody de la tabla de cuetnas
  tablaCuetnas.innerHTML += `<tr>
              <th scope="row">${indice}</th>
              <td>${cuenta.idUsuario}</td>
              <td>${cuenta.password}</td>
              <td>${cuenta.repassword}</td>
              <td>${cuenta.email}</td>
              <td>
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger" onclick="eliminarCuenta('${cuenta.id}')">Borrar</button>
                <button class="btn btn-info">Ver</button>
              </td>
            </tr>`;
};

window.eliminarCuenta = (id) => {
  // buscar y borrar el contacto de la tabla de las cuentas
  const positionAccount = cuentas.findIndex((cuenta) => cuenta.id === id);
  cuentas.splice(positionAccount, 1);
  // actualizar el local storage
  guardarLocalStorage();
  // actualizar la tabla de cuentas
};

// Variables
const btnRegistro = document.getElementById("btnRegistro");
const formularioRegistro = document.querySelector("form");
const inputIDCuenta = document.querySelector("#idcuenta");
const inputContraseña = document.querySelector("#contraseña");
const inputReContraseña = document.querySelector("#recontraseña");
const inputEmail = document.querySelector("#email");
const cuentas = JSON.parse(localStorage.getItem("keyCuenta")) || [];
const tablaCuetnas = document.querySelector("tbody");

// Manejador de eventos
btnRegistro.addEventListener("click", abrirModal);
formularioRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  // aqui voy a crear un usuario
  crearUsuario();
});

// Resto de la logica
cargarDatosEnLaTabla();
