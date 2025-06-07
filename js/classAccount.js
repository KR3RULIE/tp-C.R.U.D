export default class Cuentas {
  #id;
  #idUsuario;
  #password;
  #repassword;
  #email;
  #char;
  constructor(idUsuario, password, repassword, email, char) {
    this.#id = crypto.randomUUID();
    this.#idUsuario = idUsuario;
    this.#password = password;
    this.#repassword = repassword;
    this.#email = email;
    this.#char = char;
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
  get char() {
    return this.#char;
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
  set char(nuevoChar) {
    this.#char = nuevoChar;
  }

  toJSON() {
    return {
      id: this.id,
      idUsuario: this.idUsuario,
      password: this.password,
      repassword: this.repassword,
      email: this.email,
      char: this.char,
    };
  }
}
