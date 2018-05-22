import React, { Component } from 'react';
import styled from "styled-components";

export default class Question extends Component {
    render() {
        return (
            <div className="col-md-10 offset-md-1">
                <QuestionText>W którym roku rozpoczęła się I Wojna Światowa?</QuestionText>
                <Answer>1908</Answer>
                <Answer>1914</Answer>
                <Answer>1918</Answer>
                <Answer>1939</Answer>
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