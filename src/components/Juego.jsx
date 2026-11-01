
import { useEffect, useState } from "react";
import { crearRonda, siguienteRonda, esperar } from "../ronda.js";
import { comprobarRespuesta } from "../game.js";

import Carta from "./Carta.jsx";
import Pregunta from "./Pregunta.jsx";
import Controles from "./Controles.jsx";
import Marcador from "./Marcador.jsx";
import MensajeEstado from "./MensajeEstado.jsx";
import FinPartida from "./FinPartida.jsx";
import Historial from "./Historial.jsx";

const RESULTADO_POR_FASE = {
  revelando: "acierto",
  fin: "fallo",
};

export default function Juego({ onReiniciar, record, onRacha }) {
  const [fase, setFase] = useState("cargando");
  const [ronda, setRonda] = useState(null);
  const [error, setError] = useState(null);
  const [historial, setHistorial] = useState([]);

  const racha = historial.filter(entrada => entrada.acierto).length;

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

    const entrada = {
      numero: historial.length + 1,
      izquierdo: izquierdo.nombre,
      derecho: derecho.nombre,
      stat,
      valorIzquierdo: izquierdo.stats[stat],
      valorDerecho: derecho.stats[stat],
      acierto,
    };

    setHistorial(h => [...h, entrada]);

    if (!acierto) {
      setFase("fin");
      return;
    }

    setFase("revelando");
    onRacha(racha + 1);

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
          key={izquierdo.id}
          pokemon={izquierdo}
          stat={stat}
          mostrarValor
          resultado={null}
        />

        <Carta
          key={derecho.id}
          pokemon={derecho}
          stat={stat}
          mostrarValor={mostrarValor}
          resultado={resultado}
          animar
        />
      </div>
      
      <Controles
        onResponder={manejarRespuesta}
        bloqueado={bloqueado}
      />

      <Marcador racha={racha} record={record} />

      {fase === "fin" && (
        <FinPartida
          racha={racha}
          onReiniciar={onReiniciar}
        />
      )}

      {historial.length > 0 && (
        <Historial entradas={historial} />
      )}
    </>
  );
}
