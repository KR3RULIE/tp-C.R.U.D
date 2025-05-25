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
  const usuarioNuevo = new Cuentas();
  // guardar el usuario en un array
};

// Variables
const btnRegistro = document.getElementById("btnRegistro");
const formularioRegistro = document.querySelector("form");
const cuentas = [];

// Manejador de eventos
btnRegistro.addEventListener("click", abrirModal);
formularioRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  // aqui voy a crear un usuario
  crearUsuario();
});
