import React from "react";
import {Link, withRouter} from 'react-router-dom'


class Dish extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            day: this.props.day ? this.props.day : "",
            name: this.props.name ? this.props.name : "",
            price: this.props.price ? this.props.price : "",
            allergies: this.props.allergies ? this.props.allergies : ""
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
            this.state.day,
            this.state.name,
            this.state.price,
            this.state.allergies,
            this.props.dishId);

        /*
            when the call is completed, we need to decide what to do.
            If there was no problem, then we need to tell the browser
            to go to the homepage.
            otherwise, should issue an error
         */

        if(completed) {
            /*
                this will change the address bar, and so trigger
                a re-rendering of React-Router
             */
            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Dish")
        }
    };

    onDayChange = (event) => {
        this.setState({day: event.target.value});
    };

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onPriceChange = (event) => {
        this.setState({price: event.target.value});
    };

    onAllergiesChange = (event) => {
        this.setState({allergies: event.target.value});
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>

                    <div className="inputTitle">Day:</div>
                    <input
                        placeholder={"What day is the meal?"}
                        value={this.state.day.toLocaleLowerCase()}
                        onChange={this.onDayChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Name:</div>
                    <input
                        placeholder={"type the meal you want to add"}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Price:</div>
                    <input
                        placeholder={"Price of the meal"}
                        value={this.state.price}
                        onChange={this.onPriceChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Allergies:</div>
                    <input
                        placeholder={"Type in allergies of the meal, if any"}
                        value={this.state.allergies}
                        onChange={this.onAllergiesChange}
                        className="dishInput"
                    />

                    <button type="submit" className={"btn btnM"}>{this.ok}</button>
                    <Link to={"/"}><button className={"btn btnM"}>Cancel</button></Link>
                </form>
            </div>
        );
    }
}


/*
    Needed, because otherwise this.props.history would be undefined
 */
export default withRouter(Dish);