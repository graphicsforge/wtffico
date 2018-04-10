
import React from 'react';
import ReactDOM from 'react-dom';
import CharacterSelect from './CharacterSelect.jsx';
import API from './API';
import FicoScore from './FicoScore.jsx';
import FicoSuggestions from './FicoSuggestions.jsx';

class WebClient extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        data: {
          ficoScores: [],
          ficoInfluencers: {},
        },
      },
    };
  }

  handleChangeUser(user) {
    API.getFICOInfo(user, (err, data) => {
      this.setState({
        user: data,
      });
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <img className="logo" src="/logo.svg" />
          <CharacterSelect
            onSelect={this.handleChangeUser.bind(this)}
          />
        </div>
        <div className='fico-container'>
          <FicoScore
            ficoScores={this.state.user.data.ficoScores}
          />
          <FicoSuggestions
            data={this.state.user.data}
          />
        </div>
      </div>
    );
  }
}

WebClient.React = React;
WebClient.ReactDOM = ReactDOM;
module.exports = WebClient;
