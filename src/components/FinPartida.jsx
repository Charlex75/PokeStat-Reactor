export default function FinPartida({ racha, onReiniciar }) {
  return (
    <div className="fin-partida">
      <p>Fin de partida. Racha conseguida: {racha}.</p>

      <button onClick={onReiniciar}>
        Jugar otra vez
      </button>
    </div>
  );
}
