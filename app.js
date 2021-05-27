const searchResult = document.getElementById('search-result');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const searchPoke = async (pokemon) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = res.data;
  const card = `<div class="card shadow-sm">
  <img src='${data.sprites.other.dream_world.front_default}' class="card-img-top rounded mx-auto mt-4 p-5 main-img" alt=${data.name}>
  <div class="card-body">
      <h4 class="card-title text-center">${data.name}</h4>
      <p class='card-text text-capitalize pt-3'><strong>Pokemon Number</strong>: ${res.data.id}</p>
    <table class='table' id='pokemon-table'>
      <tr>
      <th scope="col">#</th>
      <th scope="col">Move</th>
      </tr>
  </table>
  </div>
  <div class='card-body d-flex flex-column align-items-center' id='pokemon-data'></div>
</div>`;

  searchResult.insertAdjacentHTML('beforeend', card);

  const pokemonTable = document.getElementById('pokemon-table');
  displayMoves(data, pokemonTable);

  const pokemonData = document.getElementById('pokemon-data');
  findPreviousEvol(pokemon, pokemonData);
};

const displayMoves = (data, selector) => {
  data.moves.map((move, idx) => {
    const singleMove = `
      <tr id='pokemon-tr'>
      <th scope="row">${idx + 1}</th>
      <td>
      ${move.move.name}
      </td>
        </tr>
      
      `;
    if (idx < 6) selector.insertAdjacentHTML('beforeend', singleMove);
  });
};

const findPreviousEvol = async (pokemon, pokemonData) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const name = res.data.evolves_from_species.name;

    const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const img = res2.data.sprites.other.dream_world.front_default;

    if (name !== null) {
      const prevEvol = `<p class='card-text text-capitalize'>Previous evolution: <strong>${name}</strong></p><img src='${img}' class="rounded prev-evol" alt=${name}>`;
      pokemonData.insertAdjacentHTML('beforeend', prevEvol);
    }
  } catch (e) {
    console.log(e);
  }
};

searchButton.onclick = (e) => {
  searchResult.innerHTML = '';
  e.preventDefault();
  searchPoke(searchInput.value);
  searchInput.value = '';
};
