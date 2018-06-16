import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import _ from "lodash";
import "./style.css";

class Layout extends React.Component{

    moveToUserPanel = () => {
        if(!_.isEmpty(this.props.user)){
            this.props.history.push("/userpanel");         
        }else{
            this.props.history.push("/signin");
        }     
    }

    changeLang = lang => {
        this.props.dispatch({
            type: "CHANGE_LANG",
            data: {
                language: lang
            }
          });
          console.log(lang);
    }

    versionPL = () => {
        return(
            <div className="mynav">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        Quizujemy            
                    </a>
                    <img
                        src={require('../images/Poland.png')}
                        style={{ width: "5vh", marginLeft: "1vw"}}
                        alt = "Polish flag"
                        onClick = {() => this.changeLang("PL")}
                    />
                    <img
                        src={require('../images/UK.png')}
                        style={{ width: "5vh", marginRight: "14vw"}}
                        alt = "British flag"
                        onClick = {() => this.changeLang("EN")}
                    />           
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/quizes">Quizy <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item" style={{paddingRight: "3vw"}}>
                                <a className="nav-link" href="/curiosities">Ciekawostki</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/learning">Nauka</a>
                            </li>
                        </ul>
                        <a className="nav-session" onClick={this.moveToUserPanel}>
                            <img
                                src={require('../images/user.png')}
                                style={{ width: "5vh"}}
                                alt = "Sing In"
                            />
                        </a>
                    </div>
                </nav>
            </div>
        );
    }

    versionEN = () => {
        return(
            <div className="mynav">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        Quizujemy            
                    </a>
                    <img
                        src={require('../images/Poland.png')}
                        style={{ width: "5vh", marginLeft: "1vw"}}
                        alt = "Polish flag"
                        onClick = {() => this.changeLang("PL")}
                    />
                    <img
                        src={require('../images/UK.png')}
                        style={{ width: "5vh", marginRight: "14vw"}}
                        alt = "British flag"
                        onClick = {() => this.changeLang("EN")}
                    />           
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/quizes">Quizes <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item" style={{paddingRight: "3vw"}}>
                                <a className="nav-link" href="/curiosities">Curiosities</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/learning">Learning</a>
                            </li>
                        </ul>
                        <a className="nav-session" onClick={this.moveToUserPanel}>
                            <img
                                src={require('../images/user.png')}
                                style={{ width: "5vh"}}
                                alt = "Sing In"
                            />
                        </a>
                    </div>
                </nav>
            </div>
        );
    }

    render(){
        if(this.props.lang === "PL"){
            return (
                this.versionPL()
            );
        }else if(this.props.lang === "EN"){
            return(
                this.versionEN()
            );
        }else{
            return(
                this.versionPL()
            );
        }
    }
}

const mapStateToProps = state => {
    return {
      user: state.session.user,
      lang: state.lang.language.language
    };
  };

export default connect(mapStateToProps)(withRouter(Layout));