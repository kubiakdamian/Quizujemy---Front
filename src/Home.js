import React from 'react';
import styled from "styled-components";
import curiosityImage from "./images/curiosity4.jpg";
import ReactTooltip from 'react-tooltip'
import axios from 'axios';

export default class Home extends React.Component{
    constructor() {
        super();
    
        this.state = {
          curiosity : ""
        };
    
        this.getCuriosity(); 
      }

      getCuriosity = () => {
        axios
        .get(`http://localhost:8080/api/all`)
        .then(response => {
          let rand  = Math.floor((Math.random() * response.data.length));
          this.setState({
            curiosity: response.data[rand].content
          })
        })
        .catch(error => {
          console.log(error);
        });
      }

    // componentWillMount(){
    //     this.getArticles(); 
    // }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <Curiosity className="col-lg-6 offset-lg-3">
                        <img
                            src={require("./images/bulb.png")}
                            style={{ width: "15vh", float: "left"}}
                        />
                        <BulbText>
                            Czy wiesz że...
                        </BulbText>
                        <CuriosityText>
                            {this.state.curiosity}
                        </CuriosityText>
                    </Curiosity>
                    <Article className="col-lg-3 offset-lg-3" style={{backgroundColor: "#283655", color: "#e6ebf4"}}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Article>
                    <Article className="col-lg-3">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Article>
                    <Article className="col-lg-3 offset-lg-3">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Article>
                    <Article className="col-lg-3" style={{backgroundColor: "#283655", color: "#e6ebf4"}}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Article>
                    <Quiz className="col-lg-6 offset-lg-3" data-tip="Rozwiąż losowy quiz!">
                        <img
                            src={require("./images/questionMark.png")}
                            style={{ width: "12vh"}}
                        />
                    </Quiz>
                </div>
                <ReactTooltip place="top" type="dark" effect="float"/>
            </div>        
        );
    }
}

const BulbText = styled.div`
    color: white;
    font-size: 4vh;
    margin-top: 4.5vh;
    @media screen and (orientation:landscape) and (max-width: 800px) {
        font-size: 4.5vw;
    }
`

const Curiosity = styled.div`
    background-image: url(${curiosityImage});
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: 5vh; 
    @media screen and (min-width: 800px) {
        border: 5px solid transparent;
    } 
`

const CuriosityText = styled.div`
    color: white;
    font-size: 2vh;
    @media screen and (orientation:landscape) and (max-width: 800px) {
        font-size: 2vw;
    }
`

const Article = styled.div`
    margin-top: 2vh;
    background-color: #505456;
    background-clip: padding-box;
    color: #fff;
    @media screen and (min-width: 800px) {
        border: 5px solid transparent;
    } 
    &:hover{
        cursor: pointer;
    }
`

const Quiz = styled.div`
    padding-top: 2vh;
    padding-bottom: 2vh;
    margin-top: 2vh;
    background-color: #2d2d2d;
    @media screen and (min-width: 800px) {
        border: 5px solid #e0e0e0;
    } 
    &:hover{
        cursor: pointer;
        background-color: #182041;
    }
    img{
        margin-left: auto;
	    margin-right: auto;
	    display: block;
    }
`