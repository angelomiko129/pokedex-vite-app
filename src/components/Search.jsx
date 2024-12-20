import { useState } from "react";
import pokeball from "/src/assets/pokeball.svg";

const Search = ({ fetchPokeData }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    fetchPokeData(searchQuery);
  };

  return (
    <div className="container m-10 mx-auto flex items-center justify-center text-fluid-base">
      <div className="sticky mt-10 flex w-96 flex-row items-center gap-6 sm:w-1/2">
        <img src={pokeball} className="h-11" />
        <input
          className="w-full rounded-xl border-none bg-white/5 p-4 outline-none backdrop-blur-lg"
          placeholder="Search pokemon..."
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Search;
