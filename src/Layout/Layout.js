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

    render(){
        console.log(this.props.user);
        return(
            <div className="mynav">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        Quizujemy
                    </a>
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
}

const mapStateToProps = state => {
    return {
      user: state.session.user
    };
  };

export default connect(mapStateToProps)(withRouter(Layout));