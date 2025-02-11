import pikachu from "@assets/pikachu.svg";
import pokeballShallow from "@assets/pokeball-shallow.svg";

const Nav = () => {
  return (
    <div className="relative w-full bg-pokeRed p-3">
      <div className="container mx-auto flex justify-center gap-5 px-3 min-[480px]:items-center min-[480px]:justify-start">
        <img
          src={pokeballShallow}
          className="w-[2rem] min-[480px]:w-[2.875rem]"
        />
        <h1 className="font-poppins text-fluid-lg font-bold text-white">
          Pokédex
        </h1>
      </div>
      <div className="absolute -bottom-[2.063rem] left-1/2 -translate-x-1/2 transform">
        <img src={pikachu} className="hidden min-[480px]:block" />
      </div>
    </div>
  );
};

export default Nav;
