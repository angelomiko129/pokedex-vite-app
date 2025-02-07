import { useState } from "react";
import Nav from "./components/Nav";
import Search from "./components/Search";
import PokemonCard from "./components/PokemonCard";
import TypeFilter from "./components/TypeFilter";
import pokeBg from "/src/assets/pokebg.svg";
import pokeRepeat from "/src/assets/pokerepeat.svg";
import { typeColors } from "./constants/typecolor";
import { usePokemonData } from "./hooks/usePokemonData";

function App() {
  const [selectedType, setSelectedType] = useState(null);
  const [searchPokemon, setSearchPokemon] = useState("");

  const { filteredResults, error } = usePokemonData(
    selectedType,
    searchPokemon,
  );
  return (
    <div className="h-screen font-poppins text-white">
      {/* Background */}
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
      <Search fetchPokeData={setSearchPokemon} />
      {/* Pokemon filter breadcrumbs */}
      <TypeFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {/* Pokemon validation */}
      {filteredResults.length === 0 ? (
        <div className="mt-10 flex justify-center text-white">
          <div className="text-center">
            <h2 className="fluid">
              {error ? "Something went wrong :(" : "No results found :)"}
            </h2>
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
