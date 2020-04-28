import React from "react";
import {Link, withRouter} from 'react-router-dom'


class Drink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            name: this.props.name ? this.props.name : "",
            price: this.props.price ? this.props.price : "",

        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

    onFormSubmit = async (event) => {

        event.preventDefault();

        const completed = await this.props.okCallback(

            this.state.name,
            this.state.price,

            this.props.drinkId);

        if(completed) {

            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Drink")
        }
    };


    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onPriceChange = (event) => {
        this.setState({price: event.target.value});
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>


                    <div className="inputTitle">Name:</div>
                    <input
                        placeholder={"type the drink you want to add"}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="dishInput"
                    />
                    <div className="inputTitle">Price:</div>
                    <input
                        placeholder={"Price of the drink"}
                        value={this.state.price}
                        onChange={this.onPriceChange}
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
export default withRouter(Drink);