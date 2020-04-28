/*
    This would be the access to a Database (eg, Postgres or MySQL).
    But, here, for simplicity, we do all in memory.
 */

// map from ids to Pokèmon
const pokemons = new Map();

//used to create unique ids
let counter = 0;

function initPokemons(){

    pokemons.clear();
    counter = 0;
    // Total 18 objects
    createPokemon("001", "Bulbasaur", "99,-", "Grass & Poison");
    createPokemon("002", "Ivysaur", "189,-", "Grass & Poison");
    createPokemon("003", "Venusaur", "1089,-", "Grass & Poison");

    createPokemon("004", "Charmander", "99,-", "Fire");
    createPokemon("005", "Charmelon", "189,-", "Fire");
    createPokemon("006", "Charizard", "1089,-", "Fire / Flying");

    createPokemon("007", "Squirtle", "99,-", "Water");
    createPokemon("008", "Wartortle", "189,-", "Water");
    createPokemon("009", "Blastoise", "1089,-", "Water");

    createPokemon("010", "Caterpie", "99,-", "Bug");
    createPokemon("011", "Metapod", "189,-", "Bug");
    createPokemon("012", "Butterfree", "1089,-", "bug / Flying");

    createPokemon("013", "Weedle", "99,-", "Bug");
    createPokemon("014", "Kakuna", "189,-", "Bug & Poison");
    createPokemon("015", "Beedrill", "1089,-", "Bug & Poison");

    createPokemon("016", "pidgey", "99,-", "Normal / Flying");
    createPokemon("017", "Pidgeotto", "189,-", "Normal / Flying");
    createPokemon("018", "Pidgeot", "1089,-", "Normal / Flying");
}

function createPokemon(pokedex, name, price, type){

    const id = "" + counter;
    counter++;

    const pokemon = {
        id: id,
        day: pokedex,
        name: name,
        price: price,
        type: type
    };

    pokemons.set(id, pokemon);

    return id;
}

function deletePokemon(id){

    return pokemons.delete(id);
}

function getPokemon(id){

    return pokemons.get(id);
}

function getAllPokemon(){

    return Array.from(pokemons.values());
}

function updatePokemon(pokemon){

    if(! pokemons.has(pokemon.id)){
        return false;
    }

    pokemons.set(pokemon.id, pokemon);
    return true;
}

module.exports = {initPokemon: initPokemons, getAllPokemons: getAllPokemon, createPokemon: createPokemon,
    getPokemon: getPokemon, updatePokemon: updatePokemon, deletePokemon: deletePokemon};
