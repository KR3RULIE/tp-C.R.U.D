export default class Cuentas {
  #id;
  #idUsuario;
  #password;
  #repassword;
  #email;
  constructor(idUsuario, password, repassword, email) {
    this.#id = crypto.randomUUID();
    this.#idUsuario = idUsuario;
    this.#password = password;
    this.#repassword = repassword;
    this.#email = email;
  }
  // getters
  get id() {
    return this.#id;
  }
  get idUsuario() {
    return this.#idUsuario;
  }
  get password() {
    return this.#password;
  }
  get repassword() {
    return this.#repassword;
  }
  get email() {
    return this.#email;
  }

  // setters
  set id(nuevoID) {
    this.#id = nuevoID;
  }
  set idUsuario(nuevoIDUsuario) {
    this.#idUsuario = nuevoIDUsuario;
  }
  set password(nuevoPassword) {
    this.#password = nuevoPassword;
  }
  set repassword(nuevoRePassword) {
    this.#repassword = nuevoRePassword;
  }
  set email(nuevoEmail) {
    this.#email = nuevoEmail;
  }

  toJSON() {
    return {
      id: this.id,
      idUsuario: this.idUsuario,
      password: this.password,
      repassword: this.repassword,
      email: this.email,
    };
  }
}
