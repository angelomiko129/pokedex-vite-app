import { useState, useEffect, useMemo } from "react";
import Nav from "./components/Nav";
import Search from "./components/Search";
import PokemonCard from "./components/PokemonCard";
import pokeBg from "/src/assets/pokebg.svg";
import pokeRepeat from "/src/assets/pokerepeat.svg";
import clsx from "clsx";

function App() {
  const [pokemonResults, setPokemonResults] = useState([]);
  const [error, setError] = useState(false);
  const [isSearchChanged, setIsSearchChanged] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [allTypes, setAllTypes] = useState(new Set());

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  const fetchPokeData = async (searchPokemon = "") => {
    try {
      const cachedData = localStorage.getItem("pokemonData");
      const cacheTimeStamp = localStorage.getItem("timeStamp");
      const cachedValidation =
        cacheTimeStamp && Date.now() - cacheTimeStamp < 24 * 60 * 60 * 1000;

      if (cachedData && cachedValidation) {
        const parsedPokemonData = JSON.parse(cachedData);
        const filteredPokemon = parsedPokemonData.filter((pokemon) =>
          pokemon.name.startsWith(searchPokemon.toLowerCase()),
        );

        setPokemonResults(filteredPokemon);
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1302`,
      );
      const data = await response.json();
      console.log(data);

      const filteredPokemon = data.results.filter((pokemon) =>
        pokemon.name.startsWith(searchPokemon.toLowerCase()),
      );

      // Returns a promise and object
      const detailedResults = await Promise.all(
        filteredPokemon.map(async (pokemon) => {
          const pokeResponse = await fetch(pokemon.url);
          const pokeData = await pokeResponse.json();

          const cries = pokeData.cries.latest;
          const types = pokeData.types.map((type) => type.type.name);

          return {
            name: pokeData.name,
            image: pokeData.sprites.front_default,
            id: pokeData.id,
            cry: cries,
            types: types,
          };
        }),
      );
      // Stores fetched data to localStorage
      localStorage.setItem("pokemonData", JSON.stringify(detailedResults));
      localStorage.setItem("timeStamp", Date.now());

      const sortedResults = detailedResults.sort((a, b) => a.id - b.id);

      const typesSet = new Set();
      sortedResults.forEach((pokemon) => {
        pokemon.types.forEach((type) => typesSet.add(type));
      });

      setAllTypes(typesSet);
      setError(false);
      setIsSearchChanged(false);
      setError(false);
      setPokemonResults(sortedResults);
    } catch (err) {
      console.log(err);
      setError(true);
      setPokemonResults([]);
    }
  };

  const filteredResults = useMemo(() => {
    return selectedType
      ? pokemonResults.filter((pokemon) => pokemon.types.includes(selectedType))
      : pokemonResults;
  }, [pokemonResults, selectedType]);

  useEffect(() => {
    fetchPokeData();
  }, []);

  return (
    // background images
    <div className="h-screen font-poppins text-white">
      <div
        style={{
          backgroundImage: `url(${pokeBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          position: "fixed",
          inset: 0,
          zIndex: -2,
        }}
      ></div>
      <div
        style={{
          backgroundImage: `url(${pokeRepeat})`,
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      ></div>
      {/* Nav component */}
      <Nav />
      {/* Search component */}
      <Search fetchPokeData={fetchPokeData} />
      {/* Pokemon filter breadcrumbs */}
      <div className="mx-3 flex flex-wrap items-center justify-center gap-3">
        <h2 className="text-fluid-md">Filter:</h2>
        {Object.keys(typeColors).map((type) => (
          <button
            key={type}
            className={clsx(
              "rounded-full px-3 py-1 capitalize transition-all ease-in-out",
              selectedType === type
                ? "scale-125 border-[2px] border-white"
                : "",
            )}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            style={{
              background: typeColors[type],
            }}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Pokemon validation */}
      {isSearchChanged && error ? (
        <div className="mt-10 flex justify-center text-red-400">
          <div className="text-center">
            <h2 className="fluid">No results found</h2>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-10 grid items-center justify-center gap-8 max-[640px]:px-3 max-[480px]:grid-cols-2 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {filteredResults.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              typeColors={typeColors}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
