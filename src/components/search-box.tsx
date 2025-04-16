import  { useState } from "react";

type SearchBoxProps = {
  onSearch: (data: string) => void;
};

export const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [data, setData] = useState("");

  return (
    <label htmlFor="Search">
      <div className="relative w-[80%] h-15 mx-auto">
        <input
          type="text"
          id="Search"
          name="data"
          value={data}
          onChange={(e) => setData((_prev) => e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onSearch(data) : null)}
          placeholder="Encuentra información sobre tus mascotas"
          className="mt-0.5 w-full h-full rounded border-orange-500 pe-10 shadow-sm sm:text-xl text-center font-semibold outline-none text-orange-800 md:text-xl lg:text-xl"
        />

        <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
          <button
            type="button"
            aria-label="Submit"
            onClick={() => data.length > 0 && onSearch(data)}
            className="rounded-full p-1.5 text-orange-700 transition-colors hover:bg-orange-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </span>
      </div>
    </label>
  );
};
