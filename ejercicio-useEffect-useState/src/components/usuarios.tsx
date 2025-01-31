import { useEffect, useState } from "react";
import { IUsuario } from "../models/iUsuario";
import "./styleUsuario.css";

export default function Usuarios() {
  // Estado para los usuarios y campos del formulario
  const [usuarios, setUsuarios] = useState<IUsuario[]>(() => {
    const saved = localStorage.getItem("usuarios");
    return saved ? JSON.parse(saved) : [];
  });
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Persistir usuarios en localStorage
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  // Calcular edad desde la fecha de nacimiento
  const calcularEdad = (fecha: string) => {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  // Agregar nuevo usuario
  const agregarUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoUsuario: IUsuario = {
      nombre,
      apellido,
      email,
      telefono,
      fechaNacimiento,
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    // Limpiar formulario
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setFechaNacimiento("");
  };

  // Eliminar usuario por indice
  // El indice es la posicion del usuario en el array. Ejemplo: si hay 3 usuarios, sus indices son 0, 1, 2.
  const eliminarUsuario = (indice: number) => {
    //.filter(...) crea un nuevo array con todos los usuarios excepto el que esta en la posicion indice.
    //La condición (_, i) => i !== indice significa: "Manten todos los usuarios excepto el que tenga el mismo indice que indice".
    const nuevaLista = usuarios.filter((_, i) => i !== indice);
    setUsuarios(nuevaLista);
  };

  return (
    <div className="container">
      <h2>Registro de Usuarios</h2>
      
      {/* Formulario de Registro */}
      <form onSubmit={agregarUsuario}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Fecha Nacimiento</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                />
              </td>
              <td>
                <button type="submit">Registrar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {/* Tabla de Usuarios Registrados */}
      <h2>Usuarios Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Fecha Nacimiento</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, indice) => (
            <tr key={indice}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>{new Date(usuario.fechaNacimiento).toLocaleDateString()}</td>
              <td>{calcularEdad(usuario.fechaNacimiento)}</td>
              <td>
                <button onClick={() => eliminarUsuario(indice)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}