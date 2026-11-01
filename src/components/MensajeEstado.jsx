export default function MensajeEstado({ texto, onReintentar }) {
  return (
    <div className="estado">
      <p>{texto}</p>

      {onReintentar && (
        <button onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}
