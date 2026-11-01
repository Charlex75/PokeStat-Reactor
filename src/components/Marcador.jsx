export default function Marcador({ racha, record }) {
  return (
    <div className="marcadores">
      <p className="racha">Racha: {racha}</p>
      <p className="record">Récord: {record}</p>
    </div>
  );
}
