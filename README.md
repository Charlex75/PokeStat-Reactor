# PokeStat Reactor

Misión M3 · Reactor Core — Web Development I.

Reconstrucción en React 19 de PokeStat, mi juego de «más o menos» de la M2. Aparecen dos Pokémon y una estadística, ves el valor del de la izquierda y adivinas si el de la derecha tiene más o menos. Si aciertas, el de la derecha pasa a la izquierda y entra uno nuevo; si fallas, se acaba la partida.

Novedades respecto a la M2:

- **Historial** de las rondas de la partida.
- **Contador animado**: el valor sube desde 0 al revelarse.
- **`useLocalStorage`**: custom hook para guardar el récord (bonus de la misión).

## Cómo probarlo

```bash
npm install
npm run dev
```

Abre la dirección que indica la terminal (normalmente http://localhost:5173). Con `npm run build` se genera la versión final en `dist/`.

## Estructura

```
src/
├── main.jsx             → monta React en la página
├── App.jsx              → título, récord e identificador de partida
├── api.js               → peticiones a PokéAPI, limpieza, validación y caché
├── almacen.js           → lectura y escritura en localStorage
├── constantes.js        → estadísticas, sus nombres e imagen por defecto
├── game.js              → reglas del juego en funciones puras
├── ronda.js             → prepara rondas combinando la API y las reglas
├── index.css
├── hooks/
│   └── useLocalStorage.js
├── components/
│   ├── Juego.jsx        → estado y flujo de la partida
│   ├── Carta.jsx
│   ├── ValorAnimado.jsx
│   ├── Pregunta.jsx
│   ├── Controles.jsx
│   ├── Marcador.jsx
│   ├── Historial.jsx
│   ├── FinPartida.jsx
│   └── MensajeEstado.jsx
└── fonts/               → fuente Pokemon Solid para el título
public/
└── pokeball.png         → imagen de respaldo
```

## Uso de IA

He usado **Claude Code** como asesor durante toda la misión y **Claude en Visual Studio Code** para consultas sobre retoques concretos.

Con Claude Code repetí el método de la M2. Este fue mi planteamiento:

> «Proceso exactamente el mismo, fraccionar el desarrollo en varias etapas.»

**Qué hizo la IA:**

- **Claude Code escribió el CSS entero** (`index.css`) y este README, a partir de lo ocurrido en el proceso y de lo que le conté. Se lo pedí porque el CSS me parece la parte más tediosa: «Fase 6 hecha, revísala y haz el CSS».
- **Claude Code me dio instrucciones detalladas de cada fase**, con el reparto de componentes y el estado que necesitaba. En algunos puntos me dio fragmentos de código o la estructura casi hecha, como la del efecto de carga con la bandera `ignorar`.
- **También propuso varias ideas de diseño que mantuve:** reiniciar con `key`, derivar la racha del historial, una única `fase` con `RESULTADO_POR_FASE`, el historial y el contador animado como novedades (yo elegí estas dos entre varias opciones) y `key` en las cartas para reiniciar `imagenRota`.
- **Revisó cada fase** y me señaló retoques, como repetir `replaceAll` en dos componentes o una comprobación de `fase` que no aportaba nada.
- **Claude en Visual Studio Code** me ayudó a aplicar esos retoques pequeños. Por ejemplo: crear `formatearNombre` para no repetir `replaceAll`, quitar la comprobación de `fase` que sobraba y simplificar props como `mostrarValor={true}` a `mostrarValor`. Lo usaba sobre todo para consultar, pero a veces me dio las líneas de código y alguna vez las modificó directamente, porque no tenía activado el modo de solo consulta. Revisé y estudié esos cambios después.

**Qué hice yo:**

- Monté el proyecto con Vite y traje de la M2 `api.js`, `almacen.js` y `constantes.js`. `game.js` lo rehíce como funciones puras, porque en la M2 guardaba el estado en un objeto del módulo.
- Escribí los componentes, `ronda.js`, las funciones puras de `game.js`, `useLocalStorage` y el flujo de `Juego.jsx`, siguiendo las instrucciones por fases y con la ayuda en retoques indicada arriba.
- Decidí la idea del juego y qué novedades añadir.

**Verificación:**

- Probé cada fase en el navegador antes de seguir.
- Claude Code también jugó partidas automatizadas en un navegador: aciertos, fallos, reinicio, récord tras recargar, imágenes rotas y errores de red simulados. Además, pasó `npm run lint`, compiló el proyecto y revisó el diseño a anchura de escritorio y de móvil.

## Autopsia

Adaptar la M2 a React fue la principal dificultad: pasar de decirle al DOM qué cambiar a cambiar solo el estado. Estas son las dos decisiones más discutibles. Las dos surgieron como propuestas de la IA; las valoré y decidí quedármelas por lo que explico en cada una.

1. **Reiniciar la partida con una `key`.** `App` guarda un `partidaId` y pinta `<Juego key={partidaId}>`. Al cambiarlo, React desmonta la partida y monta una nueva, que vuelve a ejecutar la carga inicial. Descarté reiniciar a mano todos los estados del juego porque es más largo y es fácil olvidarse de alguno. El coste es que la partida anterior se pierde por completo al desmontarse, incluido su historial, y que el récord tiene que vivir fuera, en `App`.

2. **Calcular la racha a partir del historial.** Al principio tenía un `useState` para la racha, pero guardarla junto al historial duplicaba información: si los dos dejaran de coincidir, el juego mostraría datos incorrectos. Por eso lo descarté y ahora cuento los aciertos con `historial.filter(entrada => entrada.acierto).length`. El coste es recorrer el array en cada render, algo sin importancia en un juego tan sencillo. Además, esto solo funciona porque la partida termina en el primer fallo: con vidas, habría que calcular la racha de otra forma.

## Créditos

- Datos e imágenes de los Pokémon: [PokéAPI](https://pokeapi.co/).
- Imagen de la Pokéball: descargada de Wikipedia.
- Fuente del título: «Pokemon Solid», fuente gratuita para uso personal.
- Pokémon y sus nombres son marcas de Nintendo, Game Freak y The Pokémon Company. Este es un proyecto educativo sin ánimo de lucro.
