import React from "react";
import {Link} from 'react-router-dom';



export class LootBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // sendTo: "",
            amountToSend: "",
            balance: null,
            usersPokemons: null,
            id: null,
            errorMsg: null,
            pokemons: null,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchPokemon();
        this.updateBalance();
        if (this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }
// ****************************************************************
// ****************************************************************
// ****************************************************************
//
//     onSendToChange = (event) => {
//         this.setState({ sendTo: event.target.value });
//     };

    onAmountToSendChange = (event) => {
        this.setState({ amountToSend: event.target.value });
    };

    transferMoney = async () => {
        if (!this.props.userId) {
            return;
        }

        const url = "/api/transfers";

        const payload = { to: this.state.sendTo, amount: this.state.amountToSend };

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            this.setState({ errorMsg: "Invalid userId/password" });
            return;
        }

        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.updateBalance();
    };

    async updateBalance() {
        const url = "/api/user";

        let response;

        try {
            response = await fetch(url);
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving balance: " + err,
                balance: null
            });
            return;
        }

        if (response.status === 401) {
            //we are not logged in, or session did timeout
            this.props.updateLoggedInUser(null);
            return;
        }

        if (response.status === 200) {
            const payload = await response.json();

            this.setState({
                errorMsg: null,
                balance: payload.balance
            });

            this.props.updateLoggedInUser(payload.userId);
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
                balance: null
            });
        }
    }



// ****************************************************************
// ****************************************************************
// ****************************************************************

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

                <div className="signupArea">
                    <p>Your Pokemons: {this.props.id} ID</p>
                    <h3>Your currently have: {this.state.balance} Pokèmon Dollars</h3>
                    <p>Your Pokemons: {this.state.usersPokemons} Pokèmon's</p>


                    <p>Transfer money</p>

                    <form method={"get"} action={"/api/transfers"}>
                        Amount:{" "}
                        <input
                            type="text"
                            name="amount"
                            value={this.state.amountToSend}
                            onChange={this.onAmountToSendChange}
                            className="lastInput"
                        />
                        <br />
                        <button className="transBtn btn btnT">Transfer (Form)</button>
                    </form>
                </div>



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