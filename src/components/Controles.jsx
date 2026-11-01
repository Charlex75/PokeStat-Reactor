export default function Controles({ onResponder, bloqueado }) {
  return (
    <div className="controles">
      <button
        className="boton-mas"
        disabled={bloqueado}
        onClick={() => onResponder("mas")}
      >
        ▲ Más
      </button>

      <button
        className="boton-menos"
        disabled={bloqueado}
        onClick={() => onResponder("menos")}
      >
        ▼ Menos
      </button>
    </div>
  );
}
