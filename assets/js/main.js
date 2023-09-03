const list = document.getElementById('listPokemons')
const btnLoadMore = document.getElementById('btnLoadMore')


const maxRecord = 151
const limit = 10
let offset = 0


function loadPokemonitens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      pokemons.forEach((pokemon) => {
        const li = document.createElement('li');
        li.classList.add('pokemon', pokemon.type);

        const spanNumber = document.createElement('span');
        spanNumber.classList.add('number');
        spanNumber.textContent = `#${pokemon.number}`;

        const spanName = document.createElement('span');
        spanName.classList.add('name');
        spanName.textContent = pokemon.name;
  
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btnDetail');        
  
        button.innerHTML = `          
          <div class="detail">
           
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        `;
  
        // Adicione um ouvinte de evento de clique ao botão
        button.addEventListener('click', function () {
          // Coloque o código para lidar com o clique aqui
          abrirDetalhesPokemon(pokemon);
        });

        li.appendChild(spanNumber);
        li.appendChild(spanName);
  
        li.appendChild(button);
        list.appendChild(li);
      });
    });
  }
function abrirDetalhesPokemon(pokemon) {
  const dialog = document.getElementById('pokemonDetails');
  const dialogContent = dialog.querySelector('.dialog-content'); // Substitua '.dialog-content' pelo seletor apropriado para o conteúdo do diálogo

  // Preencha o conteúdo do diálogo com os detalhes do Pokémon
  dialogContent.innerHTML = `
    <h2>${pokemon.name}</h2>
    <p>Number: #${pokemon.number}</p>
    <p>Types:</p>
    <ul>
      ${pokemon.types.map(type => `<li>${type}</li>`).join('')}
    </ul>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
  `;

  // Abra o diálogo
  dialog.showModal();
   
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



