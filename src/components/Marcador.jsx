export default function Marcador({ racha, record }) {
  return (
    <div className="marcadores">
      <p id="racha">Racha: {racha}</p>
      <p id="record">Récord: {record}</p>
    </div>
  );
}
