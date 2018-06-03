import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "./user-interface/Button";

class UserPanel extends Component {

    logout = () => {
        this.props.dispatch({
            type: "LOGOUT"
          });

        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <Welcome>
                    Witaj w panelu użytkownika {this.props.user.email}!
                </Welcome>
                <ButtonContainer className="col-lg-2 offset-lg-5">
                    <StyledButton
                        onClick={this.logout}               
                        label={"Wyloguj się"}
                    />
                </ButtonContainer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.session.user
    };
  };

export default connect(mapStateToProps)(withRouter(UserPanel));

const Welcome = styled.div`
    text-align: center;
    font-family: 'Indie Flower', cursive;
    font-size: 3vh;

`;

const StyledButton = styled(Button) `
  background-color: rgb(132, 21, 34);
  font-family: 'Indie Flower', cursive;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 5vh;
`

