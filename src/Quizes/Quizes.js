import React, { Component } from 'react';
import QuizPanel from "./QuizPanel.js";

export default class Quizes extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <QuizPanel title="History" styleName="col-lg-3 offset-lg-3" color="#bf3737" path="history.png" openQuiz={() => {this.props.history.push(`quiz/1`)}}/>
                    <QuizPanel title="Computers" styleName="col-lg-3" color="#3091b2" path="computers.png" />
                    <QuizPanel title="Chemistry" styleName="col-lg-3 offset-lg-3" color="#8c397b" path="chemistry.png" />
                    <QuizPanel title="Geography" styleName="col-lg-3" color="#ed8a21" path="geography.png" />          
                    <QuizPanel title="Sport" styleName="col-lg-3 offset-lg-3" color="#e5cd44" path="sport.png" />
                    <QuizPanel title="Animals" styleName="col-lg-3" color="#45a04b" path="animals.png" />      
                </div>
            </div>
        );
    }
}