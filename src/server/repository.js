/*
    This would be the access to a Database (eg, Postgres or MySQL).
    But, here, for simplicity, we do all in memory.
 */

// map from ids to Pokèmon
const pokemons = new Map();
// const monster = new Map();

//used to create unique ids
let counter = 0;

const randomPokemonArray = [];
const myPokemonArray = [];

const pokemonsArray = [
    {
        pokedex: "001",
        name: "Bulbasaur",
        price: "99",
        type: "grass & Poison",
        master: "",
    },
    {
        pokedex: "002",
        name: "Ivysaur",
        price: "189",
        type: "grass & Poison",
        master: "",
    },
    {
        pokedex: "003",
        name: "Venusaur",
        price: "1089",
        type: "grass & Poison",
        master: "",
    },
    {
        pokedex: "004",
        name: "Charmander",
        price: 99,
        type: [
            "Fire"
        ],
        master: "",
    },
    {
        pokedex: "005",
        name: "Charmelon",
        price: 199,
        type: [
            "Fire"
        ],
        master: "",
    },
    {
        pokedex: "006",
        name: "Charizard",
        price: 1089,
        type: [
            "Fire",
            "Flying"
        ],
        master: "",
    },
    {
        pokedex: "007",
        name: "Squirtle",
        price: 99,
        type: [
            "Water"
        ],
        master: "",
    },
    {
        pokedex: "008",
        name: "Wartortle",
        price: 99,
        type: [
            "Water"
        ],
        master: "",
    },
    {
        pokedex: "009",
        name: "Blastoise",
        price: 99,
        type: [
            "Water"
        ],
        master: "",
    },
    {
        pokedex: "010",
        name: "Caterpie",
        price: 99,
        type: [
            "Bug"
        ],
        master: "",
    },
    {
        pokedex: "011",
        name: "Metapod",
        price: 99,
        type: [
            "Bug"
        ],
        master: "",
    },
    {
        pokedex: "012",
        name: "Butterfree",
        price: 99,
        type: [
            "Bug",
            "Flying"
        ],
        master: "",
    },
    {
        pokedex: "013",
        name: "Weedle",
        price: 99,
        type: [
            "Bug"
        ],
        master: "",
    },
    {
        pokedex: "014",
        name: "Kakuna",
        price: 99,
        type: [
            "Bug",
            "Poison"
        ],
        master: "",
    },
    {
        pokedex: "015",
        name: "Beedrill",
        price: 99,
        type: [
            "Bug",
            "Poison"
        ],
        master: "",
    },
    {
        pokedex: "16",
        name: "Pidgey",
        price: 99,
        type: [
            "Normal",
            "Flying"
        ],
        master: "",
    },
    {
        pokedex: "017",
        name: "Pidgeotto",
        price: 99,
        type: [
            "Normal",
            "Flying"
        ],
        master: "",
    },
    {
        pokedex: "018",
        name: "Pidgeot",
        price: 99,
        type: [
            "Normal",
            "Flying"
        ],
        master: "",
    },
];


function initPokemons(){

    pokemons.clear();
    counter = 0;
    // Total 18 objects

//
//
//
//     createPokemon("001", "Bulbasaur", "99,-", "Grass & Poison","");
//     createPokemon("002", "Ivysaur", "189,-", "Grass & Poison","");
//     createPokemon("003", "Venusaur", "1089,-", "Grass & Poison","");
//
//     createPokemon("004", "Charmander", "99,-", "Fire","");
//     createPokemon("005", "Charmelon", "189,-", "Fire","");
//     createPokemon("006", "Charizard", "1089,-", "Fire / Flying","");
//
//     createPokemon("007", "Squirtle", "99,-", "Water","");
//     createPokemon("008", "Wartortle", "189,-", "Water","");
//     createPokemon("009", "Blastoise", "1089,-", "Water","");
//
//     createPokemon("010", "Caterpie", "99,-", "Bug","");
//     createPokemon("011", "Metapod", "189,-", "Bug","");
//     createPokemon("012", "Butterfree", "1089,-", "bug / Flying","");
//
//     createPokemon("013", "Weedle", "99,-", "Bug","");
//     createPokemon("014", "Kakuna", "189,-", "Bug & Poison","");
//     createPokemon("015", "Beedrill", "1089,-", "Bug & Poison","");
//
//     createPokemon("016", "pidgey", "99,-", "Normal / Flying","");
//     createPokemon("017", "Pidgeotto", "189,-", "Normal / Flying","");
//     createPokemon("018", "Pidgeot", "1089,-", "Normal / Flying","");
}

function createPokemon(pokedex, name, price, type, master){

    const id = "" + counter;
    counter++;

    const pokemon = {
        id: id,
        pokedex: pokedex,
        name: name,
        price: price,
        type: type,
        master: master
    };

    // pokemons.set(id, pokemon);
    pokemonsArray.push(pokemon);

    return id;
}

function deletePokemon(id){

    // return pokemons.delete(id);
    return pokemonsArray.splice(id, 1)
}


function getAllPokemon(){
    return Array.from(pokemonsArray.values());
}
function getMyPokemon(){
    return Array.from(myPokemonArray.values());
}
function getSomePokemon() {
    let i = 0;

    if(randomPokemonArray.length > 0){
        while ( randomPokemonArray.length > 0){
            randomPokemonArray.pop()
        }
    }
    while (i < 3) {

            const newPokemon = Math.floor(pokemonsArray.length * Math.random());

            // console.log(pokemonsArray[newPokemon]);

            randomPokemonArray.push(pokemonsArray[newPokemon]);
            myPokemonArray.push(pokemonsArray[newPokemon]);
            i++;
        }
    return Array.from(randomPokemonArray.values());
}

function updatePokemon(pokemon){

    if(! pokemons.has(pokemon.id)){
        return false;
    }

    pokemons.set(pokemon.id, pokemon);
    return true;
}


function getRandomPokemons(numberOfPokemons){

    if(numberOfPokemons < 1){
        throw "Invalid number of requested pokemons: " + n;
    }

    if(numberOfPokemons > pokemonsArray.length){
        throw "Too many pokemons";
    }

    const selection = Array(numberOfPokemons);

    let i = 0;
    while (i < numberOfPokemons) {

        const k = Math.floor(pokemonsArray.length * Math.random());
        if (selection.includes(k)) {
            continue;
        }

        selection[i] = k;
        i++;
    }

    return Array.from(selection).map(e => pokemonsArray[e]);
}


module.exports = {initPokemon: initPokemons, getAllPokemons: getAllPokemon, createPokemon: createPokemon,
    updatePokemon: updatePokemon, deletePokemon: deletePokemon, getSomePokemon: getSomePokemon, getMyPokemon: getMyPokemon};
