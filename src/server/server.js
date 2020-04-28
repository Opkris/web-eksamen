const {app} = require('./app');
const repository = require("./repository");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    repository.initPokemon();
    console.log('Started server on port ' + port);
});

