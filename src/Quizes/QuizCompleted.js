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
                    <div>
                        {this.state.questions.map((i,index) => 
                            <div>
                                <div>{i.question}</div>
                                <div>{this.state.answers[index]}</div>
                            </div>
                        )}
                    </div>
                    <Points>
                        Uzyskałeś {this.props.match.params.points} / {this.props.match.params.maxPoints} punktów!
                    </Points>
                </div>
            );
        }
    }
}

export default QuizCompleted;

const Points = styled.div`
    text-align: center;
    font-family: 'Indie Flower', cursive;
    font-size: 3vh;
`