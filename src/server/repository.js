/*
    This would be the access to a Database (eg, Postgres or MySQL).
    But, here, for simplicity, we do all in memory.
 */

// map from ids to meals
const meals = new Map();
const drinks = new Map();

//used to create unique ids
let counter = 0;

function initWithSomeMeals(){

    meals.clear();
    counter = 0;
    //15 objects
    createNewMeal("monday", "Bulbasaur", "99,-", "");
    createNewMeal("monday", "Ivysaur", "89,-", "");
    createNewMeal("monday", "Venusaur", "89,-", "");

    createNewMeal("tuesday", "Charmander", "99,-", "");
    createNewMeal("tuesday", "Charmelon", "189,-", "");
    createNewMeal("tuesday", "Charizard", "209,-", "");

    createNewMeal("wednesday", "Squirtle", "209,-", "");
    createNewMeal("wednesday", "Wartortle", "189,-", "");
    createNewMeal("wednesday", "Blastoise", "299,-", "");

    createNewMeal("thursday", "Caterpie", "189,-", "");
    createNewMeal("thursday", "Metapod", "149,-", "");
    createNewMeal("thursday", "Butterfree", "139,-", "");

    createNewMeal("friday", "Weedle", "299,-", "");
    createNewMeal("friday", "Kakuna", "129,-", "");
    createNewMeal("friday", "Beedrill", "89,-", "");

}

function initWithSomeDrinks(){

    drinks.clear();
    counter = 0;

    createNewDrink("Water", "0,-");
    createNewDrink("Coffee", "12,-");
    createNewDrink("Coffee latte", "30,-");
    createNewDrink("Irish latte", "59,-");
    createNewDrink("Warm kakao", "30,-");
    createNewDrink("Tea", "12,-");
    createNewDrink("Burn", "30,-");
    createNewDrink("Red Bull", "28,-");
}

function createNewMeal(day, name, price, allergies){

    const id = "" + counter;
    counter++;

    const meal = {
        id: id,
        day: day,
        name: name,
        price: price,
        allergies: allergies
    };

    meals.set(id, meal);

    return id;
}

function createNewDrink(name, price){

    const id = "" + counter;
    counter++;

    const drink = {
        id: id,
        name: name,
        price: price,
    };

    drinks.set(id, drink);

    return id;
}

function deleteMeal(id){

    return meals.delete(id);
}

function getMeal(id){

    return meals.get(id);
}

function getAllMeals(){

    return Array.from(meals.values());
}

function updateMeal(meal){

    if(! meals.has(meal.id)){
        return false;
    }

    meals.set(meal.id, meal);
    return true;
}
/**************************************************/
/******************** Drink ***********************/
/**************************************************/
function deleteDrink(id){

    return drinks.delete(id);
}

function getDrink(id){

    return drinks.get(id);
}

function getAllDrinks(){

    return Array.from(drinks.values());
}

function updateDrink(drink){

    if(! drinks.has(drink.id)){
        return false;
    }

    drinks.set(drink.id, drink);
    return true;
}

/**************************************************/
/**************************************************/
/**************************************************/


module.exports = {initWithSomeMeals: initWithSomeMeals, getAllMeals: getAllMeals,
    createNewMeal: createNewMeal, getMeal: getMeal, updateMeal: updateMeal, deleteMeal: deleteMeal, initWithSomeDrinks: initWithSomeDrinks,
getAllDrinks: getAllDrinks, createNewDrink: createNewDrink, getDrink: getDrink, updateDrink: updateDrink, deleteDrink: deleteDrink};
