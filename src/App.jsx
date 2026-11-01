
import Carta from "./components/Carta.jsx";
import Pregunta from "./components/Pregunta.jsx";
import Controles from "./components/Controles.jsx";
import Marcador from "./components/Marcador.jsx";

const pikachu = {
  id: 25,
  nombre: "pikachu",
  imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    "special-attack": 50,
    "special-defense": 50,
    speed: 90,
  },
  total: 320,
};

const shuckle = {
  id: 213,
  nombre: "shuckle",
  imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/213.png",
  stats: {
    hp: 20,
    attack: 10,
    defense: 230,
    "special-attack": 10,
    "special-defense": 230,
    speed: 5,
  },
  total: 505,
};

export default function App() {
  const stat = "defense";

  return (
    <main>
      <h1>PokeStat</h1>

      <Pregunta stat={stat} />

      <div className="arena">
        <Carta
          pokemon={pikachu}
          stat={stat}
          mostrarValor={true}
          resultado={null}
        />

        <Carta
          pokemon={shuckle}
          stat={stat}
          mostrarValor={false}
          resultado={null}
        />
      </div>

      <Controles
        onResponder={() => {}}
        bloqueado={false}
      />

      <Marcador racha={0} record={0} />
    </main>
  );
}
