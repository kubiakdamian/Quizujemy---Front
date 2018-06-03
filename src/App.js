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
import SignIn from './Session/SignIn';
import UserPanel from "./UserPanel"
import Article from './Article';
import QuizCompleted from './Quizes/QuizCompleted';

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
            <Route path="/quiz/:id" component={QuizPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/userpanel" component={UserPanel} />
            <Route path="/article/:id" component={Article} />
            <Route path="/quizCompleted/:points/:maxPoints/:id" component={QuizCompleted} />
        </div>
      </Router>
    );
  }
}