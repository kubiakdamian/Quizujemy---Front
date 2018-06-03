import React, { Component } from 'react';
import Question from './Question';
import styled from "styled-components";
import historyImg from '../images/history.jpg';
import axios from "axios";
import "./style.css";

export default class QuizPage extends Component {
    constructor() {
        super();

        this.state = {
            questions: [],
            answers: {},
            points: 0,
            questionsIterator: 0
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

          this.getAnswers(response.data[0].id);
        })
        .catch(error => {
          console.log(error);
        });
    }

    getAnswers = number => {
        axios
        .get(`http://localhost:8080/questions/${number}/answers`)
        .then(response => {
            console.log("ANDSSD", response)
          this.setState({
            answers: response.data[0]
          })
        })
        .catch(error => {
          console.log(error);
        });
    }

    answerChosen = (chosen, correct) => {
        if(chosen === correct){
            this.setState({
                points: this.state.points + 1
            })
        }

        this.setState({
            questionsIterator: this.state.questionsIterator + 1
        })

        this.getAnswers(this.state.questions[this.state.questionsIterator].id + 1);
    }

    render() {
        if(this.state.questions <= 0 || this.state.answers === undefined){
            return(<div>Loading...</div>)
        }else{
            return (
                <div className="quiz">
                    <Image className="col-md-6 offset-md-3">
                        <Question 
                            id={this.state.questions[this.state.questionsIterator].id}
                            title={this.state.questions[this.state.questionsIterator].question}
                            first={this.state.answers.first}
                            second={this.state.answers.second}
                            third={this.state.answers.third}
                            fourth={this.state.answers.fourth}
                            answerChosen={this.answerChosen}
                        />
                    </Image>
               </div>
            );
        }       
    }
}

const Image = styled.div`
    width: 100%;
    height: auto;
    background-image: url(${historyImg});
    margin-top: 10vh;
    padding-top: 5vh;
    padding-bottom: 5vh;
`

