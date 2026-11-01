export default function Carta({ pokemon, stat, mostrarValor, resultado }) {
  const nombre = pokemon.nombre.replaceAll("-", " ");
  const valor = mostrarValor ? pokemon.stats[stat] : "?";

  return (
    <div className={`carta ${resultado ?? ""}`}>
      <img src={pokemon.imagen} alt={nombre} />
      <h2 className="nombre">{nombre}</h2>
      <p className="valor">{valor}</p>
    </div>
  );
}
