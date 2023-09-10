function Card({ name, id }) {
  const urlPokemon = `${import.meta.env.POKEMON_WIKI_URL}${name}`;
  const imagePokemon = `${import.meta.env.POKEMON_IMAGE_URL}${id}.png`;
  
  return (
    <li class="link-card">
      <a href={urlPokemon}>
        <h2 class="capitalize">
          {id} - {name}
        </h2>
        <span>
          <img class="m-auto" src={imagePokemon} alt={`image-pokemon-${id}`} />
        </span>
      </a>
    </li>
  );
}

export default Card;
