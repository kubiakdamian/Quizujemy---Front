import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home';
import Quizes from './Quizes/Quizes';
import Curiosities from './Curiosities';
import Learning from './Learning';
import QuizPage from './Quizes/QuizPage';
import SignUp from './Session/SignUp';
import Article from './Article'

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
            <Route path="/signup" component={SignUp} />
            <Route path="/article/:id" component={Article} />
        </div>
      </Router>
    );
  }
}