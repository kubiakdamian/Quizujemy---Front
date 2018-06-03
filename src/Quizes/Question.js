import React, { Component } from 'react';
import styled from "styled-components";

export default class Question extends Component {
    render() {
        return (      
            <div className="col-md-10 offset-md-1">
                <QuestionText>{this.props.title}</QuestionText>
                <Answer onClick={() => this.props.answerChosen(this.props.first)}>{this.props.first}</Answer>
                <Answer onClick={() => this.props.answerChosen(this.props.second)}>{this.props.second}</Answer>
                <Answer onClick={() => this.props.answerChosen(this.props.third)}>{this.props.third}</Answer>
                <Answer onClick={() => this.props.answerChosen(this.props.fourth)}>{this.props.fourth}</Answer>
            </div>
        );
    }     
}

const QuestionText = styled.div`
    font-size: 5vh;
    color: white;
    border-radius: 5vh;
    font-weight: bold;
    text-align: center;
    background-color: rgba(39, 44, 51, 0.8);
`

const Answer = styled.div`
    border-radius: 5vh;
    color: white;
    text-align: center;
    font-size: 3vh;
    margin-top: 4vh;
    background-color: rgba(39, 44, 51, 0.8);

    &:hover{
        background-color: rgba(71, 132, 216, 0.8);
        cursor: pointer;
    }
`