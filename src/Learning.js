import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";

export default class Learning extends Component {
  constructor() {
    super();

    this.state = {
        articles: [],
        page: 0,
        totalPages: 0
    };    

    this.getArticles(this.state.page);
}

getArticles = number => {
        axios
        .get(`http://localhost:8080/articles/paginated?page=${number}&size=4&sort=id,desc`)
        .then(response => {
        this.setState({
                articles: response.data.content,
                totalPages: response.data.totalPages
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

previousPage = () => {
    if(this.state.page > 0){
        this.setState({
            page: this.state.page - 1
        })

        this.getArticles(this.state.page - 1);
    }      
}

nextPage = () => {
    if(this.state.page !== this.state.totalPages - 1){
        this.setState({
            page: this.state.page + 1
        })

        this.getArticles(this.state.page + 1);
    }     
}

  render() {
    return (
        <div>
            <div>
                {this.state.articles.map( i => 
                <Article className="col-lg-6 offset-lg-3" onClick={() => {this.props.history.push(`article/${i.id}`)}}>
                  <img
                      src={`${i.image}`}
                      style={{ width: "100%", height: "100%"}}
                      alt = ""
                  />
                  <p>{i.title}</p> 
                </Article>
                )}
            </div>
            <Pagination className="col-lg-2 offset-lg-5">
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={this.previousPage}>
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                    </li>
                    <li className="page-item" onClick={this.nextPage}>
                    <a className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
                </nav>
            </Pagination>
        </div>
      );
    }       
}

const Article = styled.div`
    height: 41vh;
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
    width: 96.7%;
    height: 30%;
    background-color: black;
    left: 15px;
    bottom: -15px;
    font-size: 3vh;
    text-align:center;
    color:white;
    opacity: 0.95;
    @media screen and (max-width: 600px) {
        font-size: 2.5vh;
        width: 91.7%;
    } 
  }
`

const Pagination = styled.div`
nav{
    text-align: center;
    ul{
        display: block;
    }
    
}

`