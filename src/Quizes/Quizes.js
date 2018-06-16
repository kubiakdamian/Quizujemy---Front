import React, { Component } from 'react';
import QuizPanel from "./QuizPanel.js";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Quizes extends Component {
    versionPL = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <QuizPanel title="Historia" styleName="col-lg-3 offset-lg-3" color="#bf3737" path="history.png" openQuiz={() => {this.props.history.push(`quiz/1`)}}/>
                    <QuizPanel title="Informatyka" styleName="col-lg-3" color="#3091b2" path="computers.png" />
                    <QuizPanel title="Chemia" styleName="col-lg-3 offset-lg-3" color="#8c397b" path="chemistry.png" />
                    <QuizPanel title="Geografia" styleName="col-lg-3" color="#ed8a21" path="geography.png" openQuiz={() => {this.props.history.push(`quiz/4`)}}/>    
                    <QuizPanel title="Sport" styleName="col-lg-3 offset-lg-3" color="#e5cd44" path="sport.png" />
                    <QuizPanel title="Zwierzęta" styleName="col-lg-3" color="#45a04b" path="animals.png" />      
                </div>
            </div>
        );
    }

    versionEN = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <QuizPanel title="History" styleName="col-lg-3 offset-lg-3" color="#bf3737" path="history.png" openQuiz={() => {this.props.history.push(`quiz/1`)}}/>
                    <QuizPanel title="I.T" styleName="col-lg-3" color="#3091b2" path="computers.png" />
                    <QuizPanel title="Chemistry" styleName="col-lg-3 offset-lg-3" color="#8c397b" path="chemistry.png" />
                    <QuizPanel title="Geography" styleName="col-lg-3" color="#ed8a21" path="geography.png" openQuiz={() => {this.props.history.push(`quiz/4`)}}/>    
                    <QuizPanel title="Sport" styleName="col-lg-3 offset-lg-3" color="#e5cd44" path="sport.png" />
                    <QuizPanel title="Animals" styleName="col-lg-3" color="#45a04b" path="animals.png" />      
                </div>
            </div>
        );
    }

    render() {
        if(this.props.lang === "PL"){
            return (this.versionPL());
        }else if(this.props.lang === "EN"){
            return(this.versionEN());
        }
    }
}

const mapStateToProps = state => {
    return {
      lang: state.lang.language.language
    };
  };

export default connect(mapStateToProps)(Quizes);