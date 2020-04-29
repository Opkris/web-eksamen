
/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

const users = new Map();


function getUser(id){

    return users.get(id);
}


function verifyUser(id, password){

    const user = getUser(id);

    if(!user){
        return false;
    }

    return user.password === password;
}

function createUser(id, password,){

    if(getUser(id)){
        return false;
    }

    console.log("user created");
    const user = {
        id: id,
        password: password,
        balance: 1000,
        myOwnPokemons: {
            pokedex: "001",
            name: "Bulbasaur",
            price: "99",
            type: "grass & Poison",
            master: "",
        },
    };

    console.log(user.myOwnPokemons);
    console.log(user.id);
    console.log(user.balance);

    users.set(id, user);
    return true;
}


function getUserPokemon(){

    return Array.from(users.myOwnPokemons.values());
}


function resetAllUsers(){
    users.clear();
}

function transferMoney(senderId, amount){

    console.log("Sender" + senderId + " amount: " + amount);
    amount = parseInt(amount);

    if(isNaN(amount) || amount <= 0){
        return false;
    }

    const sender = users.get(senderId);

    if(!sender){
        return false;
    }

    if(sender.balance < amount){
        return false;
    }

    sender.balance -= amount;

    return true;
}



module.exports = {getUser, verifyUser, createUser, resetAllUsers, transferMoney, getUserPokemon};
