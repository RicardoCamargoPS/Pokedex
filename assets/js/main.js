const list = document.getElementById('listPokemons')
const btnLoadMore = document.getElementById('btnLoadMore')

const maxRecord = 151
const limit = 10
let offset = 0


function loadPokemonitens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        list.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type  ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `).join('')
    })
}

loadPokemonitens(offset, limit)

btnLoadMore.addEventListener('click', () =>{
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonitens(offset, newLimit)

        btnLoadMore.parentElement.removeChild(btnLoadMore)

    } 
    else{
            loadPokemonitens(offset, limit)
    }

})



