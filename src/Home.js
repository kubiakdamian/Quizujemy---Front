import React from 'react';
import styled from "styled-components";
import curiosityImage from "./images/curiosity4.jpg";
import ReactTooltip from 'react-tooltip'
import axios from 'axios';

export default class Home extends React.Component{
    constructor() {
        super();
    
        this.state = {
          curiosity : "",
          articles: [],
          articlesNumber: 0
        };
    
        this.getCuriosity(); 
        this.getArticles();
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

      getArticles = () => {
        axios
        .get(`http://localhost:8080/articles`)
        .then(response => {
          this.setState({
            articles: response.data.content,
            articlesNumber: response.data.content.length
          })
        })
        .catch(error => {
          console.log(error);
        });
      }

      openArticle = articleId => {
        this.props.history.push(`article/${articleId}`)
      }

    render(){     
        if(this.state.articles.length < 4 || this.state.curiosity <= 0){
            return(<div>Loading data...</div>)
        }else{
            return(
                <div className="container-fluid">
                    <div className="row">
                        <Curiosity className="col-lg-6 offset-lg-3">
                            <img
                                src={require("./images/bulb.png")}
                                style={{ width: "15vh", float: "left"}}
                                alt = ""
                            />
                            <BulbText>
                                Czy wiesz że...
                            </BulbText>
                            <CuriosityText>
                                {this.state.curiosity}
                            </CuriosityText>
                        </Curiosity>
                        <Article className="col-lg-3 offset-lg-3" onClick={() => {this.props.history.push(`article/${this.state.articles[this.state.articlesNumber-1].id}`)}}>
                            <img
                                src={`${this.state.articles[this.state.articlesNumber-1].image}`}
                                style={{ width: "100%", height: "100%"}}
                                alt = ""
                            />
                            <p>{this.state.articles[this.state.articlesNumber-1].title}</p>
                        </Article>
                        <Article className="col-lg-3" onClick={() => {this.props.history.push(`article/${this.state.articles[this.state.articlesNumber-2].id}`)}}>
                             <img
                                src={`${this.state.articles[this.state.articlesNumber-2].image}`}
                                style={{ width: "100%", height: "100%"}}
                                alt = ""
                            />
                            <p>{this.state.articles[this.state.articlesNumber-2].title}</p>                       
                        </Article>
                        <Article className="col-lg-3 offset-lg-3" onClick={() => {this.props.history.push(`article/${this.state.articles[this.state.articlesNumber-3].id}`)}}> 
                            <img
                                src={`${this.state.articles[this.state.articlesNumber-3].image}`}
                                style={{ width: "100%", height: "100%"}}
                                alt = ""
                            />
                            <p>{this.state.articles[this.state.articlesNumber-3].title}</p> 
                        </Article>
                        <Article className="col-lg-3" onClick={() => {this.props.history.push(`article/${this.state.articles[this.state.articlesNumber-4].id}`)}}>
                            <img
                                src={`${this.state.articles[this.state.articlesNumber-4].image}`}
                                style={{ width: "100%", height: "100%"}}
                                alt = ""
                            />
                            <p>{this.state.articles[this.state.articlesNumber-4].title}</p> 
                        </Article>
                        <Quiz className="col-lg-6 offset-lg-3" data-tip="Rozwiąż losowy quiz!">
                            <img
                                src={require("./images/questionMark.png")}
                                style={{ width: "12vh"}}
                                alt = "Random quiz"
                            />
                        </Quiz>
                    </div>
                    <ReactTooltip place="top" type="dark" effect="float"/>
                </div>        
            );
        }
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
    height: 31vh;
    margin-top: 2vh;
    background-clip: padding-box;
    color: #fff;
    text-align: center;
    @media screen and (min-width: 800px) {
        border: 5px solid transparent;
        /* margin-bottom: 5vh; */
    } 
    @media screen and (max-width: 600px) {
        margin-bottom: 2vh;
    } 
    &:hover{
        cursor: pointer;
    }
    p{
    position: absolute;
    display: block;
    width: 93%;
    height: 30%;
    background-color: black;
    left: 15px;
    bottom: -15px;
    font-size: 2vh;
    text-align:center;
    color:white;
    opacity: 0.95;
    @media screen and (max-width: 600px) {
        font-size: 3vh;
        width: 91.7%;
    } 
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

const Title = styled.div`
    position: relative;
    background-color:rgba(0, 0, 0, 0.6);
    bottom: 14vh;
    left: 0;
    margin:auto;
    font-size: 3vh;
    vertical-align:middle;
    z-index: 4;
`