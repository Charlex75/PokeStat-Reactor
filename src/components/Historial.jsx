import { NOMBRES_STATS } from "../constantes.js";
import { formatearNombre } from "../game.js";

export default function Historial({ entradas }) {
  return (
    <section className="historial">
      <h2>Historial de rondas</h2>

      <ul>
        {entradas.toReversed().map(entrada => (
          <li key={entrada.numero}>
            #{entrada.numero} ·{" "}
            {formatearNombre(entrada.izquierdo)}{" "}
            {entrada.valorIzquierdo} vs{" "}
            {formatearNombre(entrada.derecho)}{" "}
            {entrada.valorDerecho} ·{" "}
            {NOMBRES_STATS[entrada.stat]}{" "}
            {entrada.acierto ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </section>
  );
}
