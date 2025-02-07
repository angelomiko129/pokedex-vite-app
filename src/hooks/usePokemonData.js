import { useState, useEffect, useMemo } from "react";

export const usePokemonData = (selectedType, searchPokemon = "") => {
  const [pokemonResults, setPokemonResults] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokeData = async () => {
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
          return;
        }

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000",
        );
        const data = await response.json();

        const filteredPokemon = data.results.filter((pokemon) =>
          pokemon.name.startsWith(searchPokemon.toLowerCase()),
        );

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
              types,
            };
          }),
        );

        localStorage.setItem("pokemonData", JSON.stringify(detailedResults));
        localStorage.setItem("timeStamp", Date.now());

        const sortedResults = detailedResults.sort((a, b) => a.id - b.id);

        setError(false);
        setPokemonResults(sortedResults);
      } catch (err) {
        console.log(err);
        setError(true);
        setPokemonResults([]);
      }
    };

    fetchPokeData();
  }, [searchPokemon]);

  const filteredResults = useMemo(() => {
    return selectedType
      ? pokemonResults.filter((pokemon) => pokemon.types.includes(selectedType))
      : pokemonResults;
  }, [pokemonResults, selectedType]);

  return { filteredResults, error };
};
