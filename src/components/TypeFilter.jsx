import clsx from "clsx";
import { typeColors } from "@constants/typecolor";

const TypeFilter = ({ selectedType, setSelectedType }) => {
  return (
    <div className="mx-3 flex flex-wrap items-center justify-center gap-3">
      <h2 className="text-fluid-md">Filter:</h2>
      {Object.keys(typeColors).map((type) => (
        <button
          key={type}
          className={clsx(
            "rounded-full px-3 py-1 capitalize transition-all ease-in-out",
            selectedType === type ? "scale-125 border-[2px] border-white" : "",
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
  );
};

export default TypeFilter;
