import React from "react";
import {Link} from 'react-router-dom';
import {Chat} from "./chat";
import {ItemList} from "./itemList";


export class Home extends React.Component {

    render() {
        return (
            <div>

                <h2>Pokèmon Available</h2>
                    <ItemList/>

                <div className="chat">
                    <h2>Chat</h2>
                    <Chat/>
                </div>
            </div>

        );// end return
    }// end render
}// end class