import Fuse from "fuse.js";
import { useState } from "react";
import Card from './Card';

const options = {
  keys: ["name"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

function Search({ searchList }) {
  const [query, setQuery] = useState("");
  const fuse = new Fuse(searchList, options);

  const pokemons = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 10);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div className="w-full">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Buscar
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="gray"
              d="M6 2h8v2H6V2zM4 6V4h2v2H4zm0 8H2V6h2v8zm2 2H4v-2h2v2zm8 0v2H6v-2h8zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm0-8h2v8h-2V6zm0 0V4h-2v2h2z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          className="block w-full p-4 pl-10 text-sm 
                                text-gray-900 
                               border border-gray-300
                               rounded-lg bg-gray-50

                               focus:outline-none
                               focus:ring-blue-500
                               focus:border-blue-500"
          placeholder="Busca a tu pokemon..."
        />
      </div>

      {query.length > 1 && (
        <div className="my-4">
          Has encontrado {query.length}{" "}
          {query.length === 1 ? "pokemon" : "pokemons"} para '{query}'
        </div>
      )}

	  {query.length < 1 && (
		<div class="grid grid-cols-3 gap-2 my-8">
		{
		  searchList.map((pokemon, index) => (
			<Card name={pokemon.name} id={index + 1} />
		  ))
		}
	  </div>
	  )}

      <ul className="list-none">
        {pokemons &&
          pokemons.map((pokemon) => (
            <li key={pokemon.name} className="py-2">
              <a
                className="text-lg text-blue-700 hover:text-blue-900 hover:underline underline-offset-2"
                href="#"
              >
                {pokemon.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
