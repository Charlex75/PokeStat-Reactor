
import { useState } from "react";
import { IMAGEN_POR_DEFECTO } from "../constantes.js";
import { formatearNombre } from "../game.js";
import ValorAnimado from "./ValorAnimado.jsx";

export default function Carta({
  pokemon,
  stat,
  mostrarValor,
  resultado,
  animar = false,
}) {
  const [imagenRota, setImagenRota] = useState(false);

  const nombre = formatearNombre(pokemon.nombre);
  const valor = pokemon.stats[stat];

  let contenido;

  if (!mostrarValor) {
    contenido = "?";
  } else if (animar) {
    contenido = <ValorAnimado valor={valor} />;
  } else {
    contenido = valor;
  }

  return (
    <div className={`carta ${resultado ?? ""}`}>
      <img
        src={imagenRota ? IMAGEN_POR_DEFECTO : pokemon.imagen}
        alt={nombre}
        onError={() => setImagenRota(true)}
      />
      <h2 className="nombre">{nombre}</h2>
      <p className="valor">{contenido}</p>
    </div>
  );
}
