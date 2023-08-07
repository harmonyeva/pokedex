const fetchPokemon = () => {

    const promises = [];
    for(let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            weight: data.weight,
            image: data.sprites['front_default'],
            type: data.types.map( type => type.type.name).join(', '),
        }));
        displayPokemon(pokemon)
    });
    
};




const displayPokemon = (pokemon) => {
    const pokemonHTML = pokemon.map( mon => `
    <li class="card">
        <p class="name">${mon.id}. ${mon.name}</p>
        <img class="img" src="${mon.image}"/>
        <p class="type">Type: ${mon.type}</p>
        <p class="weight">Weight: ${mon.weight} hectograms</p>
    </li>
`
        )
        .join('');
        pokedex.innerHTML = pokemonHTML;
}

fetchPokemon();