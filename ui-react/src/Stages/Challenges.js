import React, { Component } from 'react';
import Logo from '../Logo';
import TabBar from '../TabBar';
import '../Phone/Phone.css';

const moment = require('moment');

const timeFormat = 'YYYY-MM-DD';

class Challenges extends Component {

  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    fetch('/challenges', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        response.json().then(json =>
          this.setState(
            { challenges: json.challenges }));
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
    });
  }
  render() {
    return (
      <div id="challengesstage" className="stage">
        <div className="challengelist" id="challengelist">
          {this.state.challenges.map((challenge, index) => (
            <div className="challengeitem" key={`challenge-${index}`}>
              <div className="challengevisual">
                <img className="challengeicon" src={`images/${challenge.image}`} role="presentation" />
              </div>
              <div className="challengeblock">
                <div className="challengetitle">
                  {challenge.title}
                </div>
                <div className="time">
                  <div className="begin">
                    <div className="beginlabel">
                    STARTS
                  </div>
                    <div className="begins">
                      {moment(challenge.start).format(timeFormat)}
                    </div>
                  </div>
                  <div className="conclude">
                    <div className="endlabel">
                    ENDS
                  </div>
                    <div className="ends">
                      {moment(challenge.end).format(timeFormat)}
                    </div>
                  </div>
                </div>
                <div className="progress">
                  <div className="begin">
                    <div className="beginlabel">
                    GOAL
                  </div>
                    <div className="begins">
                      {challenge.goal}
                    </div>
                  </div>
                  <div className="conclude">
                    <div className="endlabel">
                    LOGGED
                  </div>
                    <div className="ends">
                      {challenge.logged}
                    </div>
                  </div>
                </div>
                <div className="progressbar" />
                <button className="challengebutton"> START WORKOUT </button>
              </div>
            </div>
        ))}
        </div>
      </div>
    );
  }
}

export default Challenges;
