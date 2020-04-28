import React from "react";
import Dish from "../dish/dish";
import Drink from "./drink";

export class EditDrink extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            drink: null,
            error: null
        };

        this.drinkId = new URLSearchParams(window.location.search).get("drinkId");

        if(this.drinkId === null){
            this.state.error = "Unspecified drink id";
        }
    }

    componentDidMount(){
        if(this.state.error === null) {
            this.fetchDrink();
        }
    }

    async fetchDrink(){

        const url = "/api/drinks/" + this.drinkId;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving drink: " + err,
                drink: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                drink: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                drink: null
            });
        }
    }


    onOk = async (name, price, id) => {

        const url = "/api/drinks/"+id;

        const payload = {id, name, price};

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
                    <p>Cannot edit drink. {this.state.error}</p>
                </div>
            );
        }

        if(this.state.drink === null){
            return(<p>Loading...</p>);
        }

        return(
            <div>
                <h3>Edit drink</h3>
                <Drink
                    name={this.state.dish.name}
                    price={this.state.dish.price}
                    drinkId={this.drinkId}
                    ok={"Update"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}