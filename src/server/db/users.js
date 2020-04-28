
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

function createUser(id, password){

    if(getUser(id)){
        return false;
    }

    console.log("user created");
    const user = {
        id: id,
        password: password,
        myOwnPokemons: {
            pokedex: "001",
            name: "Bulbasaur",
            price: "99",
            type: "grass & Poison",
            master: "",
        },
    };

    console.log(user.myOwnPokemons);

    users.set(id, user);
    return true;
}

function resetAllUsers(){
    users.clear();
}

// function reportEndOfMatch(userId, isVictory){
//
//     const user = getUser(userId);
//     if(! user){
//         throw "Invalid userId: " + userId;
//     }
//
//     if(isVictory) {
//         user.victories++;
//     } else {
//         user.defeats++;
//     }
// }


module.exports = {getUser, verifyUser, createUser, resetAllUsers};
