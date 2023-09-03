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
    const url = 'pokeDetail.html';
    const larguraDaJanela = 600;
    const alturaDaJanela = 400;
    // Obtém as dimensões da tela
    const larguraDaTela = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const alturaDaTela = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Calcula as coordenadas x e y para centralizar a janela
    const posX = (larguraDaTela - larguraDaJanela) / 2;
    const posY = (alturaDaTela - alturaDaJanela) / 2;

    // Define as configurações da janela

    const configuracoesPopup = `width=${larguraDaJanela},height=${alturaDaJanela},toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,titlebar=no,left=${posX},top=${posY}`;

    // Abre a janela popup centralizada
    const popup = window.open(url, 'NomeDaJanela', configuracoesPopup);
    
    // Verifica se a janela popup foi bloqueada pelo navegador
    if (popup === null) {
      alert('A janela popup foi bloqueada pelo navegador. Por favor, habilite pop-ups.');
    }
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



