const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokemonDetail){
    const poke = new Pokemon()
    poke.number = pokemonDetail.id
    poke.name =pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    poke.types = types
    poke.type = type

    poke.photo = pokemonDetail.sprites.other.dream_world.front_default

    return poke
      

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailResquest) => Promise.all(detailResquest))
            .then((pokemonsDetails) => pokemonsDetails)
            .catch((error) => console.error(error));
   
}