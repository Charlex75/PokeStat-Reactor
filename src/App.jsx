
import { useState } from "react";
import Juego from "./components/Juego.jsx";

export default function App() {
  const [partidaId, setPartidaId] = useState(0);

  return (
    <main>
      <h1>PokeStat</h1>

      <Juego
        key={partidaId}
        onReiniciar={() => setPartidaId(id => id + 1)}
      />
    </main>
  );
}
