import { useEffect, useState } from "react";

const DURACION = 700;

export default function ValorAnimado({ valor }) {
  const [mostrado, setMostrado] = useState(0);

  useEffect(() => {
    const inicio = performance.now();
    let id;

    function paso(ahora) {
      const progreso = Math.min((ahora - inicio) / DURACION, 1);

      setMostrado(Math.round(valor * progreso));

      if (progreso < 1) {
        id = requestAnimationFrame(paso);
      }
    }

    id = requestAnimationFrame(paso);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [valor]);

  return <>{mostrado}</>;
}
