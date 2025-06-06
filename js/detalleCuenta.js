const foto = () => {
  let rutaImagen = ""; // esta variable va a guardar la ruta

  switch (cuentaBuscado.char) {
    case "Blade Knight":
      rutaImagen = "../img/dark_knight.jpg";
      break;
    case "Soul Master":
      rutaImagen = "../img/dark_wizard.jpg";
      break;
    case "Muse Elf":
      rutaImagen = "../img/fairy_elf.jpg";
      break;
    case "Magic Gladiator":
      rutaImagen = "../img/magic_gladiator.jpg";
      break;
    default:
        // no es necesario poner algo aqui, esta diseñado para que no falle nunca.
      break;
  }

  return rutaImagen;
};

const parametroUrl = new URLSearchParams(window.location.search);
const id = parametroUrl.get("cod");

// buscar el array del localstorage
const cuentas = JSON.parse(localStorage.getItem("keyCuenta"));
// buscar dentro del array el objeto que tiene el id del parametro
const cuentaBuscado = cuentas.find((cuenta) => cuenta.id === id);
// dibujar la card con los datos
const card = document.querySelector(".card");

card.innerHTML = `<div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${foto()}"
                  class="img-fluid rounded-start"
                  alt=""
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Usuario: ${cuentaBuscado.idUsuario}
                  </h5>
                  <ul>
                    <li><b>Email:</b> ${cuentaBuscado.email}</li>
                    <li><b>Personaje favorito:</b> ${cuentaBuscado.char}</li>
                  </ul>
                </div>
              </div>
            </div>`;
