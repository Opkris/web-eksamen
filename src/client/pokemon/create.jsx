import React from "react";
import Pokemon from "./pokemon";

export class Create extends React.Component{

    constructor(props){
        super(props);

    }


    onOk = async (pokedex, name, price, type, master, pokemonId) => {


        const url = "/api/pokemons";

        //note: here pokemonId is ignored
        const payload = {pokedex: pokedex, name, price, type: type, master: master};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 201;
    };

    render(){

        return(
            <div>
                <h3>Create a New Pokèmon</h3>
                <Pokemon
                    pokedex={""}
                    name={""}
                    price={""}
                    type={""}
                    master={""}
                    ok={"Create"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}