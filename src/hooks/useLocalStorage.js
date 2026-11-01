import { useEffect, useState } from "react";
import { leer, guardar } from "../almacen.js";

export default function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(
    () => leer(clave) ?? valorInicial
  );

  useEffect(() => {
    guardar(clave, valor);
  }, [clave, valor]);

  return [valor, setValor];
}
