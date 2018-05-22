import React, { Component } from 'react';
import Question from './Question';
import styled from "styled-components";
import Countdown from 'react-countdown-now';
import historyImg from '../images/history.jpg';
import "./style.css";

export default class QuizPage extends Component {

    onFinish = () => {
        console.log("FINISH");
        
    }

    render() {
        return (
            <div className="quiz">
                <Image className="col-md-6 offset-md-3">
                    <Question />
                </Image>
                <Countdown 
                    date = {Date.now() + 10000}
                    renderer = {renderer}
                    onComplete = {this.onFinish}
                />
           </div>
        );
    }
}

const renderer = ({ seconds}) => {
    return <span>{seconds}</span>;
};

const Image = styled.div`
    width: 100%;
    height: auto;
    background-image: url(${historyImg});
    margin-top: 10vh;
    padding-top: 5vh;
    padding-bottom: 5vh;
`

const Timer = styled.div`

`

