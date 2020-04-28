import React from "react";
import Pokemon from "./pokemon";

export class Edit extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pokemon: null,
            error: null
        };

        this.pokemonId = new URLSearchParams(window.location.search).get("pokemonId");

        if(this.pokemonId === null){
            this.state.error = "Unspecified pokemon id";
        }
    }

    componentDidMount(){
        if(this.state.error === null) {
            this.fetchPokemons()
        }
    }

    async fetchPokemons(){

        const url = "/api/pokemons/" + this.pokemonId;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving pokemon: " + err,
                pokemon: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                pokemon: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                pokemon: null
            });
        }
    }


    onOk = async (pokedex, name, price, type, master, id) => {


        const url = "/api/pokemons/"+id;

        const payload = {id, pokedex, name, price, type, master};

        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 204;
    };


    render(){

        if(this.state.error !== null){
            return(
                <div>
                    <p>Cannot edit Pokèmon. {this.state.error}</p>
                </div>
            );
        }

        if(this.state.pokemon === null){
            return(<p>Loading...</p>);
        }

        return(
            <div>
                <h3>Edit Pokèmon</h3>
                <Pokemon
                    pokedex={this.state.pokemon.pokedex}
                    name={this.state.pokemon.name}
                    price={this.state.pokemon.price}
                    type={this.state.pokemon.type}
                    master={this.state.pokemon.master}
                    pokemonId={this.pokemonId}
                    ok={"Update"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}