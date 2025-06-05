import Cuentas from "./classAccount.js";
// Funciones
const abrirModal = () => {
  // Aqui abro la ventana modal
  modalContacto.show();
  // cambie la variable para que cree una cuenta
  creandoCuenta = true;
};

const cerrarModal = () => {
  modalContacto.hide();
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
  // Eliminar el mensaje si existe
  if (
    tablaCuentas.children.length === 1 &&
    tablaCuentas.children[0].textContent.indexOf(
      "No hay cuentas registradas."
    ) !== -1
  ) {
    tablaCuentas.innerHTML = "";
  }
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
    // si no hay datos, podrías mostrar una fila que diga "No hay cuentas registradas"
    tablaCuentas.innerHTML = `<tr>
      <td colspan="6" class="text-center text-muted">No hay cuentas registradas.</td>
    </tr>`;
  }
};

const dibujarFIla = (cuenta, indice) => {
  // agregar una fila (tr) nueva al tbody de la tabla de cuetnas
  tablaCuentas.innerHTML += `<tr>
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
  Swal.fire({
    title: "Estas seguro/a?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
    cancelButtonText: "No, cancelar!",
  }).then((result) => {
    if (result.isConfirmed) {
      // buscar y borrar el contacto de la tabla de las cuentas
      const positionAccount = cuentas.findIndex((cuenta) => cuenta.id === id);
      cuentas.splice(positionAccount, 1);
      // actualizar el local storage
      guardarLocalStorage();
      // actualizar la tabla de cuentas
      tablaCuentas.children[positionAccount].remove();
      //TODO: corregir las celdas de la tabla cuando borramos una cuenta
      for (let i = positionAccount; i < tablaCuentas.children.length; i++) {
        const fila = tablaCuentas.children[i];
        fila.querySelector("th").textContent = i + 1;
      }
      // verifica si ya no hay usuarios en la tabla, si no lo hay, muestro un mensaje
      if (cuentas.length === 0) {
        tablaCuentas.innerHTML = `<tr>
      <td colspan="6" class="text-center text-muted">No hay cuentas registradas.</td>
      </tr>`;
      }
      // mensaje para que el usuario sepa que se elimino la cuenta
      Swal.fire({
        title: "Cuenta eliminada",
        text: "La cuenta fue eliminada correctamente",
        icon: "success",
      });
    }
  });
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
  // limpiar el formulario
  limpiarFormulario();
  // cerrar el modal
  cerrarModal();
  // actualizar la tabla de cuentas

  // agregar un mensaje al usuario
  Swal.fire({
    title: "Cuenta actualizada",
    text: "Los datos de la cuenta se an actualizado correctamente",
    icon: "success",
  });
};

// Variables
const btnRegistro = document.getElementById("btnRegistro");
const formularioRegistro = document.querySelector("form");
const inputIDCuenta = document.querySelector("#idcuenta");
const inputContraseña = document.querySelector("#contraseña");
const inputReContraseña = document.querySelector("#recontraseña");
const inputEmail = document.querySelector("#email");
const cuentas = JSON.parse(localStorage.getItem("keyCuenta")) || [];
const tablaCuentas = document.querySelector("tbody");
let idCuentaEditar = null;
let creandoCuenta = true;
const modalContacto = new bootstrap.Modal(
  document.getElementById("modalRegistro")
);

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
