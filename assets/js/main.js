function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#001</span>
               <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    <li class="slot">grass</li>
                    <li class="slot">poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt=${pokemon.name}>
            </div>
        </li>
    `    
}

const list = document.getElementById('listPokemons')

pokeApi.getPokemons().then((pokemons = []) =>{
    list.innerHTML += pokemons.map(convertPokemonToLi).join('')
})