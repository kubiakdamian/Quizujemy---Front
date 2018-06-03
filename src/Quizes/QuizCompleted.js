import React, { Component } from 'react';
import styled from "styled-components";
import axios from "axios";

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
        console.log(this.state.questions)
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

export default QuizCompleted;

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