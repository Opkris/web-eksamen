import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Create} from "./pokemon/create";
import {Edit} from "./pokemon/edit";
import {LootBox} from "./lootBox";
import {Home} from "./home";
import Login from "./signUp-login/login";
import SignUp from "./signUp-login/signup";
import HeaderBar from "./headerbar";
import {Chat} from "./chat";
import {UserSite} from "./userSite";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userCount: 1,
        };
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();
    }

    //
    //     let protocol = "ws:";
    //     if (window.location.protocol.toLowerCase() === "https:") {
    //         protocol = "wss:";
    //     }
    //
    //     this.socket = new WebSocket(protocol + "//" + window.location.host);
    //
    //     this.socket.onmessage = (event => {
    //         const dto = JSON.parse(event.data);
    //
    //         if (!dto || !dto.userCount) {
    //             this.setState({userCount: "ERROR"});
    //             return;
    //         }
    //         this.setState({userCount: dto.userCount});
    //     });
    // }
    //
    // componentWillUnmount() {
    //     this.socket.close();
    // }


    fetchAndUpdateUserInfo = async () => {
        console.log("index.jsx, inside fetchAndUpdateUserInfo...");
        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            //that is ok
            console.log("index.jsx, fetchAndUpdateUserInfo status 401...");
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            console.log("index.jsx, fetchAndUpdateUserInfo status 200...")
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };

    updateLoggedInUser = (user) => {
        this.setState({user: user});
    };

    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    };

    render() {
        /*
            When we have a switch, to have a component for a page we just use
            the attribute "component".
            However, if we need to pass some props to the component, we need
            to use the attribute "render".
         */

        const id = this.state.user ? this.state.user.id : null;

        return (
            <BrowserRouter>
                <div>
                    <HeaderBar userId={id}
                               updateLoggedInUser={this.updateLoggedInUser}/>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      user={this.state.user}
                                                      userCount={this.state.userCount}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>

                        <Route exact path="/" component={Home}/>
                        <Route exact path="/edit" component={Edit}/>

                        <Route exact path="/lootBox"
                               render={props => <LootBox {...props}
                                                      user={this.state.user}
                                                      userCount={this.state.userCount}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>

                        <Route exact path="/userSite"
                               render={props => <UserSite {...props}
                                                      user={this.state.user}
                                                      userCount={this.state.userCount}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/chat" component={Chat}/>
                        <Route exact path="/create" component={Create}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
