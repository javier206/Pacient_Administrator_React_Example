import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  // if(!citasIniciales){
  //   citasIniciales = [];
  // }

  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  /*use effect para evitar que se ejecute varias veces hay que mandarle arreglo vacio
  el arreglo vacio se llama dependencia basicamente cada vez que cambie la dependencia el useEffect se ejecutara
  en jquery useEffect seria como document.ready
  funcion que tome las citas actualies y agrege la nueva*/

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //funcion que eliminar una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrado de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita
                key={cita.id} //no se documenta el propTypes
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
