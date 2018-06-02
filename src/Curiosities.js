import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import curiosityImage from "./images/curiosity4.jpg";

export default class Curiosities extends Component {  
    constructor() {
        super();
    
        this.state = {
            curiosities: [],
            page: 0,
            totalPages: 0
        };    

        this.getCuriosities(this.state.page);
    }

    getCuriosities = number => {
            axios
            .get(`http://localhost:8080/curiosities/paginated?page=${number}&size=7&sort=idcuriosities,desc`)
            .then(response => {
            this.setState({
                    curiosities: response.data.content,
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
    
            this.getCuriosities(this.state.page - 1);
        }      
    }

    nextPage = () => {
        if(this.state.page != this.state.totalPages - 1){
            this.setState({
                page: this.state.page + 1
            })
    
            this.getCuriosities(this.state.page + 1);
        }     
    }

      render() {
        return (
            <div>
                <div>
                    {this.state.curiosities.map((i, index)=> 
                    <Curiosity className="col-lg-6 offset-lg-3" key={index}>
                        <CuriosityText>
                            {i.content}
                        </CuriosityText>
                    </Curiosity>
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

const Curiosity = styled.div`
    background-image: url(${curiosityImage});
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: 10vh; 
    margin-bottom: 5vh;
    @media screen and (min-width: 800px) {
        border: 5px solid transparent;
    } 
`

const CuriosityText = styled.div`
    color: white;
    font-size: 2vh;
    margin-top: 7vh;
    @media screen and (orientation:landscape) and (max-width: 800px) {
        font-size: 2vw;
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
