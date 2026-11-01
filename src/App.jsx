import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import Juego from "./components/Juego.jsx";

export default function App() {
  const [partidaId, setPartidaId] = useState(0);

  const [record, setRecord] = useLocalStorage(
    "pokestat-record",
    0
  );

  return (
    <main>
      <h1>PokeStat</h1>

      <Juego
        key={partidaId}
        record={record}
        onRacha={racha => setRecord(r => Math.max(r, racha))}
        onReiniciar={() => setPartidaId(id => id + 1)}
      />
    </main>
  );
}
