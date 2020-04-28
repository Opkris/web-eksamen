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
    createNewMeal("monday", "Grillet Kyllingfilet", "99,-", "M, S, GB, GH");
    createNewMeal("monday", "Kyllinglårbiff", "89,-", "S, GH, SE, M, S, GB");
    createNewMeal("monday", "Nachos", "89,-", "M");
    createNewMeal("tuesday", "Grillet laks", "99,-", "S, M, SF, E, SN");
    createNewMeal("tuesday", "Chicken burger", "189,-", "GH, E, GR, SM, S, SE, SN, M");

    createNewMeal("tuesday", "Steakburger", "209,-", "SE, GH, M, S, GR, E");
    createNewMeal("wednesday", "Spareribs", "209,-", "GH, S, SE, E, SN, M");
    createNewMeal("wednesday", "Farmer's choice", "189,-", "SE, M, S, GB, GH");
    createNewMeal("wednesday", "All you can eat", "299,-", "**");
    createNewMeal("thursday", "Quorn burger", "189,-", "E, M, S, GH, SE, SN, SM, GR");

    createNewMeal("thursday", "Biffsalat", "149,-", "S, M, GH, GB, GR, E, SN");
    createNewMeal("thursday", "Gratinerte chevre", "139,-", "N, SF, SN, M, GH, SM, S, GB, GR");
    createNewMeal("friday", "Bacon/cheeseburger", "299,-", "M, S, GH, SE, SN, SM, GR, E");
    createNewMeal("friday", "Cæsarsalat", "129,-", "S, GM, M, N, SM, GB, E, F, SN");
    createNewMeal("friday", "Cheesecake", "89,-", "M, E, GH, N, NH");

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
