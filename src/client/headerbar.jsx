import React from "react";
import { Link, withRouter } from "react-router-dom";

/*
    Just provide a header component for all pages, where we have a link to the
    home-page, and login/sing-up/logout buttons.
 */
export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status);
      return;
    }

    this.props.updateLoggedInUser(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId) {
    return (
      <div className="msgDiv">

        <h3 className="notLoggedInMsg">
          Trainer {userId}
          !
        </h3>

        <div className="btn btnPartHeader" onClick={this.doLogout} id="logoutBtnId">
          Logout
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="msgDiv">

          <Link className="btn home" to={"/"}>
            Home
          </Link>

        <div className="notLoggedInMsg">Professor Samuel Oak Shop</div>
        <div className="btnPartHeader">
          <Link className="btn" to="/login">
            LogIn
          </Link>
          <Link className="btn" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;

    let content;
    if (! userId) {
      content = this.renderNotLoggedIn();

    } else {
      content = this.renderLoggedIn(userId);
    }

    return (
      <div className={"headerBar"}>
        {content}
      </div>
    );
  }
}

export default withRouter(HeaderBar);
