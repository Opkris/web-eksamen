import React from "react";
import Drink from "./drink";

export class CreateDrink extends React.Component{

    constructor(props){
        super(props);
    }

    onOk = async (name, price, drinkId) => {


        const url = "/api/drinks";

        //note: here dishId is ignored
        const payload = {name, price};

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
                <h3>Create a New Drink</h3>
                <Drink
                    name={""}
                    price={""}
                    ok={"Create"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}