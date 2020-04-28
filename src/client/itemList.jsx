import React from "react";
import {Link, withRouter} from "react-router-dom";

export class ItemList extends React.Component {


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

        const url = "/api/pokemons";

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


    deletePokemon = async (id) => {

        const url = "/api/pokemons/" + id;

        let response;

        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            alert("Delete operation failed: " + err);
            return false;
        }

        if (response.status !== 204) {
            alert("Delete operation failed: status code " + response.status);
            return false;
        }

        this.fetchPokemon();

        return true;
    };

    render() {

        let table;


        if (this.state.error !== null) {
            table = <p>{this.state.error}</p>;
        } else if (this.state.pokemons === null || this.state.pokemons.length === 0) {
            table = <p>There is no Menu registered in the database</p>;
        } else {
            table = <div>
                <table className="allMeals">
                    <thead>
                    <tr>
                        <th>Pokèmon's</th>
                        <th>Price</th>
                        <th>Type</th>

                        <th>Options</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.pokemons.map(m =>
                        <tr key={"key_" + m.id} className="oneMeal">
                            <td>{m.name}</td>
                            <td>{m.price}</td>
                            <td>{m.type}</td>

                            <td>
                                <Link to={"/edit?pokemonId=" + m.id}>
                                    <button className="btn btnM">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </Link>
                                <button className="btn btnM" onClick={_ => this.deletePokemon(m.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>; // end table
        }

        return (
            <div>

                <div>
                    {table}
                </div>
                {user ? (
                    <div>
                        <Link to={"/create"}>
                            <button className="btn btnM">New</button>
                        </Link>
                    </div>
                ) : (
                    <p>
                    </p>
                )}
            </div>

        );// end return
    }// end render
}


export default withRouter(ItemList);