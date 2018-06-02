import React, { Component } from 'react';
import styled from 'styled-components';
import Input from "../user-interface/Input";
import Button from "../user-interface/Button";
// var $ = require('jquery');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
    // this._handleSubmit = this._handleSubmit.bind(this);
  }

  updateEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  updateUserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  updatePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  // handleSubmit(e) {
  //   e.preventDefault();
  //     $.ajax({
  //       url: process.env.NODE_ENV !== "production" ? 'http://localhost:8080/api/all' : "http://localhost:8080/api/all",
  //       // url: "./php/mailer.php",
  //       type: 'POST',
  //       data: {
  //         'login': this.state.login,
  //         'password': this.state.password,
  //         'nick': this.state.nick
  //       },
  //       success: function (data) {
  //         this.state.loginCheck = data;
  //         if (this.state.loginCheck == "Login not unique") {
  //           // callToast("Użytkownik już istnieje!");
  //           console.log("Użytkownik już istnieje");
  //         }
  //         else if (this.state.loginCheck == "notExist") {
  //           // callToast("Zarejestrowano, proszę się zalogować");
  //           // this.props.modalClose();
  //           console.log("Zarejestrowano, proszę się zalogować");
  //         }
  //         else if (this.state.loginCheck == "Nick not unique") {
  //           // callToast("Ten nick jest już zajęty!");
  //           console.log("Ten nick jest już zajęty");
  //         }


  //       }.bind(this),
  //       error: function (xhr, status, err) {
  //         console.log(xhr, status);
  //         console.log(err);
  //         this.setState({
  //           contactMessage: 'Błąd',
  //         });
  //       }.bind(this)
  //     });   
  // };

    render() {
        return (
              <Container className="col-lg-2 offset-lg-5">
                <form onSubmit={this._handleSubmit}>
                  <Input
                    onChange={this.updateEmail}
                    value={this.state.email}
                    placeholder="E-mail"
                    id="login"
                    type="email"
                    required />
      
                  <Input
                    onChange={this.updateUserName}
                    value={this.state.username}
                    placeholder="Nick"
                    id="nick"
                    type="text"
                    required />
      
                  <Input
                    onChange={this.updatePassword}
                    value={this.state.password}
                    placeholder="Password"
                    id="password"
                    type="password"
                    required />
      
                  <StyledButton
                    onClick={event => {
                      this.onSubmit;
                    }}
                    label={"Zarejestruj się"}
                  />
                </form>
              </Container>
          );
    }
}

export default SignUp;

const StyledButton = styled(Button) `
  background-color: rgb(124, 132, 131);
  font-family: 'Indie Flower', cursive;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
`;

const Container = styled.div`
  margin-top: 25vh;
`