const searchResult = document.getElementById('search-result');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const searchPoke = async (pokemon) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = res.data;
  const card = `<div class="card shadow-sm main-card">
  <img src='${data.sprites.other.dream_world.front_default}' class="card-img-top rounded mx-auto mt-4 p-5 main-img" alt=${data.name}>
  <div class="card-body">
      <h4 class="card-title text-center">${data.name}</h4>
      <p class='card-text text-center text-capitalize p-2 mt-3 border border-warning rounded-pill'><strong>Pokemon Number</strong>: ${res.data.id}</p>
    <div class='border border-success rounded p-3 mt-4'>
    <table class='table' id='pokemon-table'>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Move</th>
    </tr>
    </table>
    <p>
    <button class="btn btn-outline-danger text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapseButton" aria-expanded="false" aria-controls="collapseButton">
   Show all the other moves
    </button>
     </p>
     <div class="collapse" id="collapseButton"> 
     <table class='table' id='other-moves'>
    <tr>
   </tr>
    </table>
    </div>
   </div>
  </div>
  <div class='card-body d-flex flex-column align-items-center border border-secondary rounded mb-5 mt-3 mx-3' id='pokemon-evolution'></div>
</div>`;

  searchResult.insertAdjacentHTML('beforeend', card);

  const pokemonTable = document.getElementById('pokemon-table');
  const otherMoves = document.getElementById('other-moves');
  displayMoves(data, pokemonTable, otherMoves);

  const pokemonEvol = document.getElementById('pokemon-evolution');
  findPreviousEvol(pokemon, pokemonEvol);
};

const displayMoves = (data, pokemonTable, otherMoves) => {
  data.moves.map((move, idx) => {
    const firstMoves = `
      <tr id='pokemon-tr'>
      <th scope="row">${idx + 1}</th>
      <td>
      ${move.move.name}
      </td>
        </tr>`;
    const otherMoveElements = `<tr id='pokemon-tr'>
    <th scope="row">${idx + 1}</th>
    <td>
    ${move.move.name}
    </td>
      </tr>`;
    if (idx < 4) pokemonTable.insertAdjacentHTML('beforeend', firstMoves);
    else otherMoves.insertAdjacentHTML('beforeend', otherMoveElements);
  });
};

const findPreviousEvol = async (pokemon, pokemonEvol) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const name = res.data.evolves_from_species.name;

    const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const img = res2.data.sprites.other.dream_world.front_default;

    if (name !== null) {
      const prevEvol = `<p class='card-text text-capitalize'>Previous evolution: <strong>${name}</strong></p><img src='${img}' class="rounded prev-evol p-3" alt=${name}>`;
      pokemonEvol.insertAdjacentHTML('beforeend', prevEvol);
    }
  } catch (e) {
    console.log(e);
    pokemonEvol.classList.remove('border', 'mb-5', 'mt-3');
  }
};

searchButton.onclick = (e) => {
  searchResult.innerHTML = '';
  e.preventDefault();
  searchPoke(searchInput.value);
  searchInput.value = '';
};
