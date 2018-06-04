import React, { Component } from 'react';
import styled from "styled-components";
import { withRouter } from "react-router-dom";

class QuizPanel extends Component {
    render() {
        return (
            <Quiz className={this.props.styleName} style={{backgroundColor: this.props.color}} onClick={this.props.openQuiz}>
                <img
                    src={require('../images/' + this.props.path)}
                    style={{ width: "15vh", float: "left"}}
                    alt = ""
                />
                <Title>{this.props.title}</Title>
            </Quiz>
        );
    }
}

export default withRouter(QuizPanel);

const Quiz = styled.div`
    height: 40vh;
    cursor: pointer;
    margin-top: 2vh;

    @media screen and (min-width: 800px) {
        border: 5px solid #e0e0e0;
    } 

    &:hover{
        opacity: 0.8;
    }

    img{
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`

const Title = styled.div`
    width: 100%;
    position: absolute; 
    bottom: 4vh;
    left: 0px;
    font-size: 5vh;
    font-weight: bold;
    text-align: center;
`