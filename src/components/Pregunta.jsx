import { NOMBRES_STATS } from "../constantes.js";

export default function Pregunta({ stat }) {
  return (
    <h2 className="pregunta">
      ¿Quién tiene más {NOMBRES_STATS[stat]}?
    </h2>
  );
}
