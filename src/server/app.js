const express = require('express');
const repository = require("./repository");
const bodyParser = require('body-parser');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require("express-session");
const authApi = require('./routes/auth-api');
const Users = require('./db/users');


const app = express();
const ews = require('express-ws')(app);
const WS = require('ws');


Users.createUser("Kristoffer", "1");
//to handle JSON payloads
app.use(bodyParser.json());

app.use(express.static('public'));


//***********************************************************//
//*************************** Chat **************************//
//***********************************************************//
let counter = 0;

const messages = [];


app.get('/api/messages', (req, res) => {

    const since = req.query["since"];

    const data = messages;

    if (since) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
});


app.post('/api/messages', (req, res) => {

    const dto = req.body;

    const id = counter++;

    const msg = {id: id, author: dto.author, text: dto.text};

    messages.push(msg);

    res.status(201); //created
    res.send();

    const nclients = ews.getWss().clients.size;
    console.log("Going to broadcast message to " + nclients +" clients");

    ews.getWss().clients.forEach((client) => {
        if (client.readyState === WS.OPEN) {
            const json = JSON.stringify(msg);
            console.log("Broadcasting to client: " + JSON.stringify(msg));
            client.send(json);
        } else {
            console.log("Client not ready");
        }
    });
});


app.ws('/', function(ws, req) {
    console.log('Established a new WS connection');
    const numberOfClients = ews.getWss().clients.size;
    console.log('Going to broadcast message to ' + numberOfClients + ' clients');


    ews.getWss().clients.forEach((client) => {
        if (client.readyState === WS.OPEN) {
            const json = JSON.stringify(msg);

            console.log('Broadcasting to client: ' + JSON.stringify(msg));
            client.send(json);
        } else {
            console.log('Client not ready');
        }
    });

    ews.getWss().clients.forEach((client) => {
        const data = JSON.stringify({userCount: n});

        client.send(data);
    });
});

//***********************************************************//
//************************ Auth *****************************//
//***********************************************************//

app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

//***********************************************************//
//************************ Pokèmon **************************//
//***********************************************************//

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/pokemons', (req, res) => {

        res.json(repository.getAllPokemons());
});

app.get('/api/randomPokemons', (req, res) => {

        res.json(repository.getSomePokemon());
});


app.get('/api/myPokemons', (req, res) => {

        res.json(repository.getMyPokemon());
});


/*
    Note the use of ":" to represent a variable placeholder.
    Here we return a specific book with a specific id, eg
    "http://localhost:8080/books/42"
 */
app.get('/api/pokemons/:id', (req, res) => {

    const pokemon = repository.getPokemon(req.params["id"]);

    if (!pokemon) {
        res.status(404);
        res.send()
    } else {
        res.json(pokemon);
    }
    /*
        Either "send()" or "json()" needs to be called, otherwise the
        call of the API will hang waiting for the HTTP response.
        The "json()" also setups the other needed headers related to the
        body, eg things like content-type and content-length
     */
});

/*
    Handle HTTP DELETE request on a book specified by id
 */
app.delete('/api/pokemons/:id', (req, res) => {

    const deleted = repository.deletePokemon(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        //this can happen if book already deleted or does not exist
        res.status(404);
    }
    res.send();
});

/*
    Create a new pokèmon. The id will be chosen by the server.
    Such method should return the "location" header telling
    where such book can be retrieved (ie its URL)
 */
app.post('/api/pokemons', (req, res) => {

    const dto = req.body;

    const id = repository.createPokemon(dto.pokedex, dto.name, dto.price, dto.type, dto.master);

    res.status(201); //created
    res.header("location", "/api/pokemons/" + id);
    res.send();
});

app.put('/api/pokemons/:id', (req, res) => {

    if(req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = repository.updatePokemon(req.body);

    if (updated) {
        res.status(204);
    } else {
        //this can happen if entity did not exist
        res.status(404);
    }
    res.send();
});

/** --------- Routes ---------**/
app.use('/api', authApi);

//needed to server static files, like HTML, CSS and JS.
// app.use(express.static('public'));


module.exports = {app};
