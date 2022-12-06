const apiEndPoint = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = getElement('.search-input');
const searchButton = getElement('.search-button');
const container = getElement('.pokemon');
const erroMessage = getElement('.error');

var searchPoke;
var pokemon;
var card;



// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
    return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokemon(url, name) {
    fetch(url + name)
        .then(response => response.json())
        .then(data => {
            pokemon = data
        })
        .catch(error => console.log(error));
}
// Criar card
function creatCardPok() {
    card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
        <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
    return card;
}
// Função que faz a chamada das principais funções e inicia o app
function startApp(searchPoke) {
    requestPokemon(apiEndPoint, searchPoke);

    setTimeout(() => {
        container.innerHTML = creatCardPok();
    }, 1000)

}

//Event Button
searchButton.addEventListener('click', evt => {
    evt.preventDefault();
    searchPoke = searchInput.value.toLowerCase();
    requestPokemon(apiEndPoint, searchPoke);
    startApp(searchPoke)
    clearInputs()
});

function clearInputs() {
    searchInput.value = '';
}


