import Cuentas from "./classAccount.js";
// Funciones
const abrirModal = () => {
  const modalContacto = new bootstrap.Modal(
    document.getElementById("modalRegistro")
  );
  // Aqui abro la ventana modal
  modalContacto.show();
  // cambie la variable para que cree una cuenta
  creandoCuenta = true;
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
                <button class="btn btn-warning" onclick="prepararCuenta('${cuenta.id}')">Editar</button>
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
  tablaCuetnas.children[positionAccount].remove();
  //TODO: corregir las celdas de la tabla cuando borramos una cuenta
  cuentas.children[0] = id;
};

window.prepararCuenta = (id) => {
  // cargar datos en el modal
  const cuentaBuscada = cuentas.find((cuenta) => cuenta.id === id);
  inputIDCuenta.value = cuentaBuscada.idUsuario;
  inputContraseña.value = cuentaBuscada.password;
  inputReContraseña.value = cuentaBuscada.repassword;
  inputEmail.value = cuentaBuscada.email;
  // abrir el modal
  abrirModal();
  // guardo el id del contacto que quiero editar
  idCuentaEditar = id;
  creandoCuenta = false;
};

const editarCuenta = () => {
  console.log("Esta funcion edita una cuenta");
  // agarrar los datos del formulario y actualizarlo dentro del array cuentas
  const positionAccount = cuentas.findIndex(
    (cuenta) => cuenta.id === idCuentaEditar
  );
  cuentas[positionAccount].idUsuario = inputIDCuenta.value;
  cuentas[positionAccount].password = inputContraseña.value;
  cuentas[positionAccount].repassword = inputReContraseña.value;
  cuentas[positionAccount].email = inputEmail.value;
  // actualizar el localstorage
  guardarLocalStorage();
  // actualizar la tabla de cuentas
  // agregar un mensaje al usuario
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
let idCuentaEditar = null;
let creandoCuenta = true;

// Manejador de eventos
btnRegistro.addEventListener("click", abrirModal);
formularioRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoCuenta) {
    // aqui voy a crear un usuario
    crearUsuario();
  } else {
    // algun dia aqui voy a editar una cuenta
    editarCuenta();
  }
});

// Resto de la logica
cargarDatosEnLaTabla();
