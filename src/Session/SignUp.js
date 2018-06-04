import React, { Component } from 'react';
import styled from 'styled-components';
import Input from "../user-interface/Input";
import Button from "../user-interface/Button";
import axios from "axios";
import { callToast } from "../user-interface/alert";
import { toast } from "react-toastify";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
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

  validateEmail = email => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  checkConditions = () => {
    if (
      this.state.password.length >= 8 &&
      this.validateEmail(this.state.email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  clearForm = () => {
    this.setState({
      email: "",
      username: "",
      password: ""
    })
  }

  wrongRegistrationAlerts = () => {
    if (
      this.state.password.length < 8 &&
      !this.validateEmail(this.state.login)
    ) {
      callToast("Wprowadzone hasło jest za krótkie oraz podano nieprawidłowy adres e-mail.");
    } else if (!this.validateEmail(this.state.email)) {
      callToast("Wprowadzony adres e-mail nie jest poprawny.");
    } else {
      callToast(
        "Wprowadzone hasło jest za krótkie. Wprowadź hasło zawierające conajmniej 8 znaków."
      );
    }
    this.clearForm();
  };

  register = () => {
    if(this.checkConditions()){
        axios.post('http://localhost:8080/register', {
          "username": this.state.username,
          "email": this.state.email,
          "password": this.state.password,
          "role": 2     
      })
      .then(response => {
        console.log(response);
        callToast(
          "Zarejestrowano pomyślnie."
        );
        this.switchToSignIn();
      })
      .catch(function (error) {
        console.log(error);
        callToast("Podany adres e-mail już istnieje");
      });
    }else{
      this.wrongRegistrationAlerts();
    }   
  }

  switchToSignIn = () => {
    this.props.history.push("/signin");
  }

    render() {
        return (
          <div>
              <Header>Rejestracja</Header>
              <Container className="col-lg-2 offset-lg-5">
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
                    onClick={this.register}               
                    label={"Zarejestruj się"}
                  />
                  <a onClick={this.switchToSignIn}>Zaloguj się</a>
              </Container>
            </div>
          );        
    }
}

export default SignUp;

const options = {
  autoClose: 3000,
  type: toast.TYPE.WARN,
  hideProgressBar: false,
  position: toast.POSITION.TOP_CENTER
};

const StyledButton = styled(Button) `
  background-color: rgb(124, 132, 131);
  font-family: 'Indie Flower', cursive;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
`;

const Container = styled.div`
  margin-top: 5vh;
  color: blue;
  a{
    font-size: 2vh;
    float: right;
    &:hover{
      cursor: pointer;
    }

    @media screen and (max-width: 600px) {
      font-size: 3vh;
    } 
  }
`

const Header = styled.div`
  margin-top: 5vh;
  font-size: 7vh;
  text-align: center;
  font-family: 'Indie Flower', cursive;
`