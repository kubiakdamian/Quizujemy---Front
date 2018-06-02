import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";

class Article extends Component {
    constructor() {
        super();
    
        this.state = {
          paragraphs: [],
          article: {}
        };    
      }

      componentDidMount(){
        this.getParagraphs();
        this.getArticle();
      }

      getParagraphs = () => {
        axios
        .get(`http://localhost:8080/articles/${this.props.match.params.id}/paragraphs`)
        .then(response => {
          this.setState({
            paragraphs: response.data.content
          })
        })
        .catch(error => {
          console.log(error);
        });
      }

      getArticle = () => {
        axios
        .get(`http://localhost:8080/articles/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            article: response.data
          })
        })
        .catch(error => {
          console.log(error);
        });
      }

    render() {
        if(this.state.paragraphs <= 0){
            return(<div>Loading...</div>)
        }else{
            return (
                <div>
                    <Image className="col-md-6 offset-md-3">
                        <img
                            src={`${this.state.article.image}`}
                            style={{ width: "100%", height: "100%"}}
                            alt = ""
                        />
                    </Image>
                    <Title className="col-md-6 offset-md-3">{this.state.article.title}</Title>
                    <Paragraphs className="col-md-6 offset-md-3">
                        {this.state.paragraphs.map(i => 
                            <p>{i.content}</p>
                        )}
                    </Paragraphs>
                    <Author className="col-md-6 offset-md-3">{this.state.article.autor}</Author>
                </div>
            );
        }      
    }
}

export default Article;

const Paragraphs = styled.div`
    margin-bottom: 5vh;
`

const Image = styled.div`
    height: 30vh;
`

const Title = styled.div`
    font-size: 3vh;
    text-align: center;
    margin-bottom: 5vh;
`

const Author = styled.div`
    font-size: 2vh;
    text-align: right;
`