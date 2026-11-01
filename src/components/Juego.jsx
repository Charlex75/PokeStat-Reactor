
import { useEffect, useState } from "react";
import { crearRonda, siguienteRonda, esperar } from "../ronda.js";
import { comprobarRespuesta } from "../game.js";

import Carta from "./Carta.jsx";
import Pregunta from "./Pregunta.jsx";
import Controles from "./Controles.jsx";
import Marcador from "./Marcador.jsx";
import MensajeEstado from "./MensajeEstado.jsx";
import FinPartida from "./FinPartida.jsx";

const RESULTADO_POR_FASE = {
  revelando: "acierto",
  fin: "fallo",
};

export default function Juego({ onReiniciar }) {
  const [fase, setFase] = useState("cargando");
  const [ronda, setRonda] = useState(null);
  const [error, setError] = useState(null);
  const [racha, setRacha] = useState(0);

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

  async function manejarRespuesta(eleccion) {
    const { izquierdo, derecho, stat } = ronda;

    const acierto = comprobarRespuesta(
      izquierdo,
      derecho,
      stat,
      eleccion
    );

    if (!acierto) {
      setFase("fin");
      return;
    }

    setFase("revelando");
    setRacha(r => r + 1);

    try {
      const [nueva] = await Promise.all([
        siguienteRonda(ronda),
        esperar(1500),
      ]);

      setRonda(nueva);
      setFase("jugando");
    } catch (fallo) {
      setError(fallo.message);
      setFase("error");
    }
  }

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

  const mostrarValor = fase !== "jugando";
  const bloqueado = fase !== "jugando";
  const resultado = RESULTADO_POR_FASE[fase] ?? null;

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
          mostrarValor={mostrarValor}
          resultado={resultado}
        />
      </div>

      <Controles
        onResponder={manejarRespuesta}
        bloqueado={bloqueado}
      />

      <Marcador racha={racha} record={0} />

      {fase === "fin" && (
        <FinPartida
          racha={racha}
          onReiniciar={onReiniciar}
        />
      )}
    </>
  );
}
