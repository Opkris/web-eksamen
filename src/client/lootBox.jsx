import React from "react";
import {Link} from 'react-router-dom';



export class LootBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemons: null,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchPokemon();
        if (this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }


    async fetchPokemon() {

        const url = "/api/randomPokemons";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of Pokèmon's: " + err,
                pokemons: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                pokemons: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                pokemons: null
            });
        }
    }

    render() {

        let tableUser;

        if (this.state.error !== null) {
            tableUser = <p>{this.state.error}</p>;
        } else if (this.state.pokemons === null || this.state.pokemons.length === 0) {
            tableUser = <p>There is no Menu registered in the database</p>;
        } else {
            tableUser = <div>
                <table className="allMeals">
                    <thead>
                    <tr>
                        <th>Pokèmon's</th>
                        <th>Price</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.pokemons.map(m =>
                        <tr key={"key_" + m.id} className="oneMeal">
                            <td>{m.name}</td>
                            <td>{m.price}</td>
                            <td>{m.type}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>; // end table
        }
        return (

            <div>
                <h2>Pokèmon loot: </h2>
                <div>
                    <Link to={"/userSite"}>
                        <button className="btn btnM">
                            To User
                        </button>
                    </Link>
                </div>
                {tableUser}
            </div>

        );// end return
    }// end render
}// end class