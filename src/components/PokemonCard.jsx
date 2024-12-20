import { useState } from "react";
import pokeshallow from "./../assets/pokeball-shallow.svg";
import { FaReact } from "react-icons/fa";

const PokemonCard = ({ pokemon, typeColors }) => {
  const { id, name, image, cry, types } = pokemon;
  const [isPlaying, setIsPlaying] = useState(false);

  const playCry = () => {
    const audio = new Audio(cry);
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div
      className={`relative overflow-hidden rounded p-4 shadow-lg backdrop-blur-2xl`}
    >
      {/* Pokeball background */}
      <div className="h-2w-28 absolute bottom-1/2 left-1/2 -z-20 w-28 -translate-x-1/2 -rotate-[20deg] transform">
        <img
          src={pokeshallow}
          alt="pokeball background"
          className="h-full w-full"
        />
      </div>

      {/* Pokemon id */}
      <div
        className={`absolute right-2 top-2 rounded-full px-3 py-1 text-fluid-base`}
        style={{
          background: typeColors[types[0]],
        }}
      >
        #{id}
      </div>

      {/* Pokemon name */}
      <div className="text-center">
        <h3 className="my-8 py-2 text-fluid-md capitalize">{name}</h3>
      </div>
      <img
        className={`mx-auto h-[12.5rem] w-full object-contain`}
        src={image}
        alt={name}
      />
      {/* Pokemon types */}
      <div>
        {types.map((type, index) => (
          <h1
            key={index}
            className={`mr-2 inline-block rounded-md px-2 py-2 text-fluid-base capitalize`}
            style={{
              background: typeColors[type],
            }}
          >
            {type}
          </h1>
        ))}
      </div>

      <div className="mt-2 flex cursor-pointer items-center justify-center rounded-md bg-pokeRed">
        <button
          className="text-fluid-md"
          onClick={() => playCry()}
          disabled={isPlaying}
        >
          <i className="fas fa-volume-up pr-3"></i>
          <span className="font-medium">Cry</span>
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
