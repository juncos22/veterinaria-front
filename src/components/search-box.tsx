import { useState } from "react";

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
            onClick={() => {
              if (data.length > 0) {
                setData("");
                onSearch("");
              }
            }}
            className="rounded-full p-1.5 text-orange-700 transition-colors hover:bg-orange-200 cursor-pointer"
          >
            {data.length === 0 && (
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
            )}
            {data.length > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            )}
          </button>
        </span>
      </div>
    </label>
  );
};
