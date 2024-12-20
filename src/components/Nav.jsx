import pikachu from "./../assets/pikachu.svg";
import pokeballShallow from "./../assets/pokeball-shallow.svg";

const Nav = () => {
  return (
    <div className="bg-pokeRed relative w-full p-3">
      <div className="flex justify-center gap-5 px-3 min-[480px]:justify-start min-[480px]:items-center container mx-auto">
        <img
          src={pokeballShallow}
          className="w-[2rem] min-[480px]:w-[2.875rem]"
        />
        <h1 className="font-poppins text-white text-fluid-lg font-bold">
          Pokédex
        </h1>
      </div>
      <div className="absolute -bottom-[2.063rem] left-1/2 transform -translate-x-1/2">
        <img src={pikachu} className="hidden min-[480px]:block" />
      </div>
    </div>
  );
};

export default Nav;
