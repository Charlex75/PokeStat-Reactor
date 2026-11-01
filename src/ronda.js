import { obtenerPokemon } from "./api.js";
import { idAleatorio, statAleatoria, hayEmpate } from "./game.js";

export async function resolverEmpate(izquierdo, derecho, stat) {
  const MAX_INTENTOS = 10;

  for (let intento = 0; intento < MAX_INTENTOS; intento++) {
    if (!hayEmpate(izquierdo, derecho, stat)) {
      return derecho;
    }

    derecho = await obtenerPokemon(idAleatorio());
  }

  if (hayEmpate(izquierdo, derecho, stat)) {
    throw new Error(
      "No se pudo preparar una ronda sin empate. Prueba otra vez."
    );
  }

  return derecho;
}

export async function crearRonda() {
  const [izquierdo, derechoInicial] = await Promise.all([
    obtenerPokemon(idAleatorio()),
    obtenerPokemon(idAleatorio()),
  ]);

  const stat = statAleatoria();
  const derecho = await resolverEmpate(izquierdo, derechoInicial, stat);

  return { izquierdo, derecho, stat };
}
