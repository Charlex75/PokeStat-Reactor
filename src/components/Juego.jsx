import { useEffect, useState } from "react";
import { crearRonda } from "../ronda.js";

import Carta from "./Carta.jsx";
import Pregunta from "./Pregunta.jsx";
import Controles from "./Controles.jsx";
import Marcador from "./Marcador.jsx";
import MensajeEstado from "./MensajeEstado.jsx";

export default function Juego({ onReiniciar }) {
  const [fase, setFase] = useState("cargando");
  const [ronda, setRonda] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignorar = false;

    async function cargar() {
      try {
        const nuevaRonda = await crearRonda();

        if (!ignorar) {
          setRonda(nuevaRonda);
          setFase("jugando");
        }
      } catch (fallo) {
        if (!ignorar) {
          setError(fallo.message);
          setFase("error");
        }
      }
    }

    cargar();

    return () => {
      ignorar = true;
    };
  }, []);

  if (fase === "cargando") {
    return <MensajeEstado texto="Cargando Pokémon..." />;
  }

  if (fase === "error") {
    return (
      <MensajeEstado
        texto={error}
        onReintentar={onReiniciar}
      />
    );
  }

  const { izquierdo, derecho, stat } = ronda;

  return (
    <>
      <Pregunta stat={stat} />

      <div className="arena">
        <Carta
          pokemon={izquierdo}
          stat={stat}
          mostrarValor={true}
          resultado={null}
        />

        <Carta
          pokemon={derecho}
          stat={stat}
          mostrarValor={false}
          resultado={null}
        />
      </div>

      <Controles
        onResponder={() => {}}
        bloqueado={fase !== "jugando"}
      />

      <Marcador racha={0} record={0} />
    </>
  );
}
