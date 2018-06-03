import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "./user-interface/Button";
import axios from "axios";
import Circle from 'react-circle';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: {}
        };
    }

    componentDidMount(){
        this.getStatistics();
    }

    getStatistics = () => {
        axios
        .get(`http://localhost:8080/user/${this.props.user.id}/statistics`)
        .then(response => {
            if(response.data.length <= 0){
                this.createStatistics();
            }
          this.setState({
            statistics: response.data[0]
          })
        })
        .catch(error => {
          console.log(error);
        });
    }

    createStatistics = () => {
        axios
        .post(`http://localhost:8080/user/${this.props.user.id}/statistics`, {})
        .then(response => {
            this.getStatistics();
        })
        .catch(error => {
          console.log(error);
        });
    }

    logout = () => {
        this.props.dispatch({
            type: "LOGOUT"
          });

        this.props.history.push("/")
    }

    getPercentage = () => {
        if(this.state.statistics.answeredQuestions === 0){
            return 0;
        }else{
            return this.state.statistics.correctAnswers / this.state.statistics.answeredQuestions * 100;
        }
    }

    render() {
        console.log(this.state.statistics);
        return (
            <div>
                <Text style={{fontSize: "4vh"}}>
                    Witaj w panelu użytkownika {this.props.user.email}!
                </Text>
                <Text>
                    Oto Twoje statystyki:
                </Text>
                <CircleContainer className="col-lg-2 offset-lg-5">
                    <Circle
                        animate={true}
                        responsive={true}
                        size={150}
                        lineWidth={50}
                        progress={this.getPercentage()}
                        progressColor="rgb(132, 21, 34)" 
                        bgColor="whitesmoke"
                        textColor="black"
                        textStyle={{ 
                            textAlign: "center",
                            fontFamily: 'Indie Flower',
                            fontSize: '8vh',
                            color: 'black'
                        }}
                        percentSpacing={10}
                        roundedStroke={true}
                        showPercentage={true}
                        showPercentageSymbol={true}
                    />
                </CircleContainer>
                <Text>{this.state.statistics.correctAnswers} / {this.state.statistics.answeredQuestions} poprawnych odpowiedzi</Text>
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

const Text = styled.div`
    text-align: center;
    font-family: 'Indie Flower', cursive;
    font-size: 3vh;
    margin-top: 5vh;

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
  position: fixed;
  bottom: 5px;
`

const CircleContainer = styled.div`
  margin-top: 5vh;
`

