import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home';
import Quizes from './Quizes/Quizes';
import Curiosities from './Curiosities';
import Learning from './Learning';
import QuizPage from './Quizes/QuizPage';
import styled from "styled-components";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Layout />
            <Route exact path="/" component={Home} />
            <Route path="/quizes" component={Quizes} />
            <Route path="/curiosities" component={Curiosities} />
            <Route path="/learning" component={Learning} />
            <Route path="/quiz" component={QuizPage} />
        </div>
      </Router>
    );
  }
}