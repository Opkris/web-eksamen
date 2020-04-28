import React from "react";
import {Link, withRouter} from 'react-router-dom'


class Pokemon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pokedex: this.props.pokedex ? this.props.pokedex : "",
            name: this.props.name ? this.props.name : "",
            price: this.props.price ? this.props.price : "",
            type: this.props.type ? this.props.type : "",
            master: this.props.master ? this.props.master : ""
        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

    onFormSubmit = async (event) => {
        /*
            in this component, we have an actual HTML form.
            when it is submitted, we want to prevent it from doing
            an actual POST using x-www-form-urlencoded format, we need JSON.
         */
        event.preventDefault();

        /*
            here we make the call with AJAX, on which we have full control
         */
        const completed = await this.props.okCallback(
            this.state.pokedex,
            this.state.name,
            this.state.price,
            this.state.type,
            this.state.master,
            this.props.pokemonId);

        /*
            when the call is completed, we need to decide what to do.
            If there was no problem, then we need to tell the browser
            to go to the homepage.
            otherwise, should issue an error
         */

        if (completed) {
            /*
                this will change the address bar, and so trigger
                a re-rendering of React-Router
             */
            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Pokemon")
        }
    };

    onPokedexChange = (event) => {
        this.setState({pokedex: event.target.value});
    };

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onPriceChange = (event) => {
        this.setState({price: event.target.value});
    };

    onTypeChange = (event) => {
        this.setState({type: event.target.value});
    };

    onMasterChange = (event) => {
        this.setState({master: event.target.value});
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>

                    <div className="inputTitle">Pokedex:</div>
                    <input
                        placeholder={"What pokedex is the pokèmon?"}
                        value={this.state.pokedex.toLocaleLowerCase()}
                        onChange={this.onPokedexChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Name:</div>
                    <input
                        placeholder={"type the pokèmon you want to add"}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Price:</div>
                    <input
                        placeholder={"Price of the pokèmon"}
                        value={this.state.price}
                        onChange={this.onPriceChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Type:</div>
                    <input
                        placeholder={"Type in type of the pokèmon, if any"}
                        value={this.state.type}
                        onChange={this.onTypeChange}
                        className="dishInput"
                    />

                    <div className="inputTitle">Master:</div>
                    <input
                        placeholder={"Master of the pokèmon.."}
                        value={this.state.master}
                        onChange={this.onMasterChange}
                        className="dishInput"
                    />

                    <button type="submit" className={"btn btnM"}>{this.ok}</button>
                    <Link to={"/"}>
                        <button className={"btn btnM"}>Cancel</button>
                    </Link>
                </form>
            </div>
        );
    }
}


/*
    Needed, because otherwise this.props.history would be undefined
 */
export default withRouter(Pokemon);