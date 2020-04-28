const request = require('supertest');
const {app} = require('../../src/server/app');
const rep = require('../../src/server/repository');

beforeEach(() => {rep.initWithSomeMeals();});

test("Test get all", async () =>{

    /*
        request(app) will start the application on an ephemeral port, if not already started.
        The "get" will do an actual HTTP call toward such running server.
        These tests must be async, as the tests and the backend API are running on the same
        event-loop thread
     */

    const response = await request(app).get('/api/meals');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(15);
});


test("Test not found meal", async () => {

    const response = await request(app).get('/api/meals/-3');
    expect(response.statusCode).toBe(404);
});


test("Test retrieve each single meal", async () => {

    const responseAll = await request(app).get('/api/meals');
    expect(responseAll.statusCode).toBe(200);

    const meals = responseAll.body;
    expect(meals.length).toBe(15);

    for(let i=0; i<meals.length; i++){

        const res = await request(app).get('/api/meals/'+meals[i].id);
        const meal = res.body;

        expect(meal.title).toBe(meals[i].title)
    }
});


test("Test create meal", async () => {

    let responseAll = await request(app).get('/api/meals');
    const n = responseAll.body.length;

    const name = "foo";

    const resPost = await request(app)
        .post('/api/meals')
        .send({day:"monday", name: name, price:"42,-", allergies: "G, SM, HG"})
        .set('Content-Type', 'application/json');

    expect(resPost.statusCode).toBe(201);
    const location = resPost.header.location;

    //should had been increased by 1
    responseAll = await request(app).get('/api/meals');
    expect(responseAll.body.length).toBe(n + 1);

    const resGet = await request(app).get(location);
    expect(resGet.statusCode).toBe(200);
    expect(resGet.body.name).toBe(name);
});


test("Delete all meals", async () =>{

    let responseAll = await request(app).get('/api/meals');
    expect(responseAll.statusCode).toBe(200);

    const meals = responseAll.body;
    expect(meals.length).toBe(15);

    for(let i=0; i<meals.length; i++){

        const res = await request(app).delete('/api/meals/'+meals[i].id);
        expect(res.statusCode).toBe(204);
    }

    responseAll = await request(app).get('/api/meals');
    expect(responseAll.statusCode).toBe(200);
    expect(responseAll.body.length).toBe(0);
});


test("Update meals", async () => {

    const name = "foo";

    //create a dish
    const resPost = await request(app)
        .post('/api/meals')
        .send({day:"tuesday", name:name, price:"142", allergies: "none"})
        .set('Content-Type', 'application/json');
    expect(resPost.statusCode).toBe(201);
    const location = resPost.header.location;


    //get it back
    let resGet = await request(app).get(location);
    expect(resGet.statusCode).toBe(200);
    expect(resGet.body.name).toBe(name);


    const modified = "Modified Burger";
    const id = location.substring(location.lastIndexOf("/") + 1, location.length);

    //modify it with PUT
    const resPut = await request(app)
        .put(location)
        .send({id:id, day:"monday", name: modified, price:"9000,-", allergies:"bar"})
        .set('Content-Type', 'application/json');
    expect(resPut.statusCode).toBe(204);

    //get it back again to verify the change
    resGet = await request(app).get(location);
    expect(resGet.statusCode).toBe(200);
    expect(resGet.body.name).toBe(modified);
});