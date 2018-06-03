import React, { Component } from 'react';
import styled from 'styled-components';
import Input from "../user-interface/Input";
import Button from "../user-interface/Button";
import axios from "axios";
import { callToast } from "../user-interface/alert";
import { toast } from "react-toastify";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  updateEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  updatePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  clearForm = () => {
    this.setState({
      email: "",
      password: ""
    })
  }

  moveToHomePage = () => {
    this.props.history.push("/");
  }

  singIn = () => {
    axios.post('http://localhost:8080/login', {
            "email": this.state.email,
            "password": this.state.password 
        })
        .then(response => {
            console.log(response);
            this.props.dispatch({
                type: "LOGIN",
                data: {
                  user: response.data
                }
              });
            callToast(
                "Zalogowano pomyślnie."
            );
            this.moveToHomePage();
        })
        .catch(function (error) {
            console.log(error);
            callToast("Wprowadzono niepoprawne dane");
        });
    }

    switchToSignUp = () => {
        this.props.history.push("/signup");
    }

    


    render() {
        return (
          <div>
              <Header>Logowanie</Header>
              <Container className="col-lg-2 offset-lg-5">
                  <Input
                    onChange={this.updateEmail}
                    value={this.state.email}
                    placeholder="E-mail"
                    id="login"
                    type="email"
                    required />
      
                  <Input
                    onChange={this.updatePassword}
                    value={this.state.password}
                    placeholder="Password"
                    id="password"
                    type="password"
                    required />
      
                  <StyledButton
                    onClick={this.singIn}               
                    label={"Zaloguj się"}
                  />
                  <a onClick={this.switchToSignUp}>Zarejestruj się</a>
              </Container>
            </div>
          );        
    }
}

export default SignIn;

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