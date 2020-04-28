import React from "react";
import {Link} from 'react-router-dom';
import {Chat} from "./Chat";


export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinks: null,
            meals: null,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchMeals();
        this.fetchDrinks();
        // this.fetchMessages();
        if (this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }

    }


    async fetchMeals() {

        const url = "/api/meals";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of meals: " + err,
                meals: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                meals: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                meals: null
            });
        }
    }

    async fetchDrinks() {

        const url = "/api/drinks";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of drinks: " + err,
                drinks: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                drinks: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                drinks: null
            });
        }
    }

    deleteMeal = async (id) => {

        const url = "/api/meals/" + id;

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

        this.fetchMeals();

        return true;
    };

    deleteDrink = async (id) => {

        const url = "/api/drinks/" + id;

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

        this.fetchDrinks();

        return true;
    };// end delete

    render() {

        const user = this.props.user;
        let table_monday;
        let tableDrink;


        if (this.state.error !== null) {
            table_monday = <p>{this.state.error}</p>;
        } else if (this.state.meals === null || this.state.meals.length === 0) {
            table_monday = <p>There is no Menu registered in the database</p>;
        } else {
            table_monday = <div>
                <table className="allMeals">
                    <thead>
                    <tr>
                        <th>Meal(s)</th>
                        <th>Price</th>
                        <th>Allergies</th>
                        {user ? (
                            <th>Options</th>
                        ) : (
                            <p></p>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.meals.map(m =>
                        <tr key={"key_" + m.id} className="oneMeal">
                            <td>{m.name}</td>
                            <td>{m.price}</td>
                            <td>{m.allergies}</td>

                            {user ? (
                                <td>
                                    <Link to={"/edit?dishId=" + m.id}>
                                        <button className="btn btnM">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </Link>
                                    <button className="btn btnM" onClick={_ => this.deleteMeal(m.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            ) : (
                                <p></p>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>; // end table


        }// end else

        if (this.state.drinks === null || this.state.drinks.length === 0) {
            tableDrink = <p>There is no Drink registered in the database</p>
        } else {
            tableDrink = <div>
                <table className="allDrinks">
                    <thead>
                    <tr>
                        <th>Drink(s)</th>
                        <th>Price</th>
                        {user ? (
                            <th>Options</th>
                        ) : (
                            <p></p>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.drinks.map(d =>
                        <tr key={"key_" + d.id} className="oneMeal">
                            <td>{d.name}</td>
                            <td>{d.price}</td>

                            {user ? (
                                <td>
                                    <Link to={"/edit?DrinkId=" + d.id}>
                                        <button className="btn btnM">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </Link>
                                    <button className="btn btnM" onClick={_ => this.deleteDrink(d.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            ) : (
                                <p></p>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>; // end table
        }


        return (
            <div>

                <div>
                    <h2>Sweet Escape Monday</h2>
                    {table_monday}
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

                <div className="chat">
                    <h2>Chat</h2>
                    <Chat/>
                </div>
            </div>

        );// end return
    }// end render
}// end class