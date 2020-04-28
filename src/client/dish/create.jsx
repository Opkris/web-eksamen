import React from "react";
import Dish from "./dish";

export class Create extends React.Component{

    constructor(props){
        super(props);
    }

    onOk = async (day, name, price, allergies, dishId) => {


        const url = "/api/meals";

        //note: here dishId is ignored
        const payload = {day, name, price, allergies};
        // const payload = {name, price, allergies};

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
                <h3>Create a New Meal</h3>
                <Dish
                    day={""}
                    name={""}
                    price={""}
                    allergies={""}
                    ok={"Create"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}