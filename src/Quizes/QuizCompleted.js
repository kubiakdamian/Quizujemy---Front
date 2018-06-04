import React, { Component } from 'react';
import styled from "styled-components";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class QuizCompleted extends Component {
    constructor() {
        super();

        this.state = {
            questions: [],
            answers: [],
        };     
    }

    componentDidMount(){
        this.getQuestions();
        this.getStatisticsId();
      }

    getQuestions = () => {
        axios
        .get(`http://localhost:8080/quizes/${this.props.match.params.id}/questions`)
        .then(response => {
          this.setState({
            questions: response.data,
          })
            response.data.map(i => {
                this.getAnswers(i.id)
            })
        })
        .catch(error => {
          console.log(error);
        });
    }

    calculateAnswered = (answers) => {
        var result = 0;
        result = answers + parseInt(this.props.match.params.maxPoints, 10);
        return result;
    }

    calculateCorrect = (correct) => {
        var result = 0;
        result = correct + parseInt(this.props.match.params.points, 10);
        return result;
    }

    updateStatistics = (id, answers, correct) => {
        axios.put(`http://localhost:8080/statistics/${id}`, {
            "answeredQuestions": this.calculateAnswered(answers),
            "correctAnswers": this.calculateCorrect(correct)
        })
        .then(response => {
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getStatisticsId = () => {
        axios
        .get(`http://localhost:8080/user/${this.props.user.id}/statistics`)
        .then(response => {
            this.updateStatistics(response.data[0].id, response.data[0].answeredQuestions, response.data[0].correctAnswers)
        })
        .catch(error => {
          console.log(error);
        });
    }

    getAnswers = number => {
        axios
        .get(`http://localhost:8080/questions/${number}/answers`)
        .then(response => {
            this.setState(prevState => ({
                answers: [...prevState.answers, response.data[0].correct]
              }))
        })
        .catch(error => {
            console.log(error);
        });  
    }

    render() {
        if(this.state.question <= 0 || this.state.answers <= 0){
            return(<div>Loading...</div>)
        }else{
            return (
                <div>
                    <Points>
                        Uzyskałeś {this.props.match.params.points} / {this.props.match.params.maxPoints} punktów!
                    </Points>
                    <QuestionsAndAnswers className = "col-lg-6 offset-lg-3">
                        {this.state.questions.map((i,index) => 
                            <SingleSet>
                                <Question>{i.question}</Question>
                                <Answer>{this.state.answers[index]}</Answer>
                            </SingleSet>
                        )}
                    </QuestionsAndAnswers>                
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

export default connect(mapStateToProps)(withRouter(QuizCompleted));

const Points = styled.div`
    text-align: center;
    font-family: 'Indie Flower', cursive;
    font-size: 5vh;
`

const QuestionsAndAnswers = styled.div`
    margin-top: 5vh;
    text-align: center;
`
const SingleSet = styled.div`
    margin-top: 3vh;
`

const Question = styled.div`
    font-family: 'Indie Flower', cursive;
    font-size: 3vh;
`

const Answer = styled.div`
    font-family: 'Indie Flower', cursive;
    font-weight: bold;
    color: rgb(0, 163, 19);
    font-size: 2vh;
`