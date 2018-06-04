import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "./user-interface/Button";
import axios from "axios";
import Circle from 'react-circle';
import { callToast } from "./user-interface/alert";
import curiosityImage from "./images/curiosity4.jpg";

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: {},
            curiosity: "",
            anterooms: []
        };
    }

    componentDidMount(){
        this.getStatistics();
        this.getAnterooms();
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

    getAnterooms = () => {
        axios
        .get(`http://localhost:8080/anteroom/curiosities`)
        .then(response => {
            this.setState({
                anterooms: response.data
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
        if(this.state.statistics !== undefined){
            if(this.state.statistics.answeredQuestions === 0){
                return 0;
            }else{
                return Math.round(this.state.statistics.correctAnswers / this.state.statistics.answeredQuestions * 100);
            }
        }else{
            return 0;
        }
    }

    updateContent = e => {
        this.setState({
            curiosity: e.target.value
        });
      };

      clearContent = () => {
        this.setState({
            curiosity: ""
        });
      }

    addAnteroom = () => {
        if(this.state.curiosity.length > 19){
            axios
            .post(`http://localhost:8080/anteroom/add`, {content: this.state.curiosity})
            .then(response => {
                this.clearContent();
                callToast("Pomyślnie dodano ciekawostkę");
                this.getAnterooms();
            })
            .catch(error => {
            console.log(error);
            callToast("Dodawanie ciekawostki nie powiodło się");
            });
        }else{
            callToast("Ciekawostka musi mieć przynajmniej 20 znaków!");
        }
        
    }

    deleteAnteroom = id => {
        axios
        .delete(`http://localhost:8080/anteroom/delete/${id}`)
        .then(response => {
            this.getAnterooms();
        })
        .catch(error => {
          console.log(error);
        });
    }

    addCuriosity = (newContent, id) => {
        axios
        .post(`http://localhost:8080/curiosities/add`, {content: newContent})
        .then(response => {
            this.deleteAnteroom(id);
        })
        .catch(error => {
          console.log(error);
        });
    }

    render() {
        if(this.props.user.role === 2){
            if(this.state.statistics === undefined){
                return(<div>Loading...</div>);
            }else{
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
                        <Text>
                            Dowiedziałeś się czegoś ciekawego? Podziel się tym z nami, a może trafisz na stronę główną!
                        </Text>
                        <InputContainer className="col-lg-6 offset-lg-3">
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Twoja ciekawostka</label>
                                <textarea 
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    onChange={this.updateContent}
                                    value={this.state.curiosity} />
                            </div>
                            <CuriosityButtonContainer>
                                <StyledButton
                                    style={{backgroundColor: "rgb(43, 124, 255)"}}
                                    onClick={this.addAnteroom}               
                                    label={"Wyślij"}
                                />
                            </CuriosityButtonContainer>
                        </InputContainer>
                        <LogoutButtonContainer className="col-lg-2 offset-lg-5">
                            <StyledButton
                                onClick={this.logout}               
                                label={"Wyloguj się"}
                            />
                        </LogoutButtonContainer>            
                    </div>
                );
            }
        }else{
            return(
                <div>
                    <Text>
                        Witaj admin! Oto nowe ciekawostki:
                    </Text>
                    {this.state.anterooms.map((i, index)=> 
                        <Anteroom className="col-lg-6 offset-lg-3">
                            {i.content}
                            <AnteroomButtons className="col-lg-6 offset-lg-3">
                                <StyledButton
                                    style={{width: "50%", backgroundColor: "rgb(0, 155, 57)"}}
                                    onClick={() => this.addCuriosity(i.content, i.idanteroom)}            
                                    label={"Dodaj"}
                                />
                                <StyledButton
                                    style={{width: "50%"}}
                                    onClick={() => this.deleteAnteroom(i.idanteroom)}               
                                    label={"Usuń"}
                                />
                            </AnteroomButtons>
                        </Anteroom>
                    )}
                    <LogoutButtonContainer className="col-lg-2 offset-lg-5">
                        <StyledButton
                            onClick={this.logout}               
                            label={"Wyloguj się"}
                        />
                    </LogoutButtonContainer>  
                </div>
            );
        }
        
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

const LogoutButtonContainer = styled.div`
  margin-top: 5vh;
  position: fixed;
  bottom: 5px;
`

const CuriosityButtonContainer = styled.div`
`

const CircleContainer = styled.div`
  margin-top: 5vh;
`

const InputContainer = styled.div`
  margin-top: 5vh;
  margin-bottom: 10vh;
`

const Anteroom = styled.div`
    margin-top: 3vh;
    font-size: 2.5vh;
    color: white;
    background-image: url(${curiosityImage});
    background-repeat: no-repeat;
    background-size: cover;
`

const AnteroomButtons = styled.div`
  margin-top: 7vh;
  padding-bottom: 2vh;
`

