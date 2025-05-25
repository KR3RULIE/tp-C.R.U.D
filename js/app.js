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
  // limpiar el form
  limpiarFormulario();
};

const limpiarFormulario = () => {
  formularioRegistro.reset();
};

const guardarLocalStorage = () => {
  localStorage.setItem("keyCuenta", JSON.stringify(cuentas));
};

// Variables
const btnRegistro = document.getElementById("btnRegistro");
const formularioRegistro = document.querySelector("form");
const inputIDCuenta = document.querySelector("#idcuenta");
const inputContraseña = document.querySelector("#contraseña");
const inputReContraseña = document.querySelector("#recontraseña");
const inputEmail = document.querySelector("#email");
const cuentas = JSON.parse(localStorage.getItem("keyCuenta")) || [];

// Manejador de eventos
btnRegistro.addEventListener("click", abrirModal);
formularioRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  // aqui voy a crear un usuario
  crearUsuario();
});
