import React, { Component } from 'react';
import Question from './Question';
import styled from "styled-components";
import historyImg from '../images/history.jpg';
import axios from "axios";
import {ProgressBar} from 'react-bootstrap';
import "./style.css";

export default class QuizPage extends Component {
    constructor() {
        super();

        this.state = {
            questions: [],
            answers: {},
            points: 0,
            questionsIterator: 0,
            progress: 0
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
        if(this.state.progress >= 100 - 100 / this.state.questions.length){
            this.props.history.push(`/quizCompleted/${this.state.points}/${this.state.questions.length}/${this.props.match.params.id}`);
        }else{
            axios
            .get(`http://localhost:8080/questions/${number}/answers`)
            .then(response => {
              this.setState({
                answers: response.data[0]
              })
            })
            .catch(error => {
              console.log(error);
            });
        }
    }

    answerChosen = (chosen) => {
        if(chosen === this.state.answers.correct){
            this.setState({
                points: this.state.points + 1
            })
        }

        this.setState({
            questionsIterator: this.state.questionsIterator + 1,
            progress: this.state.progress + 100 / this.state.questions.length
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
                    <Progress className="col-md-6 offset-md-3">
                        <ProgressBar bsStyle="warning" now={this.state.progress} />
                    </Progress>
                    <Points className="col-md-2 offset-md-5">
                        {this.state.points} / {this.state.questions.length} pkt
                    </Points>
                    
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

const Progress = styled.div`
    margin-top: 5vh;
`

const Points = styled.div`
    text-align: center;
    font-family: 'Indie Flower', cursive;
    font-size: 3vh;
`

