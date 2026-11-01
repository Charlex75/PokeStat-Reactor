import { STATS } from "./constantes.js";

const TOTAL_POKEMON = 1025;

export function idAleatorio() {
  return Math.floor(Math.random() * TOTAL_POKEMON) + 1;
}

export function statAleatoria() {
  const indice = Math.floor(Math.random() * STATS.length);
  return STATS[indice];
}

export function hayEmpate(izquierdo, derecho, stat) {
  return izquierdo.stats[stat] === derecho.stats[stat];
}

export function comprobarRespuesta(izquierdo, derecho, stat, eleccion) {
  const valorIzquierdo = izquierdo.stats[stat];
  const valorDerecho = derecho.stats[stat];

  return (
    (eleccion === "mas" && valorDerecho > valorIzquierdo) ||
    (eleccion === "menos" && valorDerecho < valorIzquierdo)
  );
}
