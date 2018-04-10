
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import React from 'react';

import { userData } from './API';

class CharacterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: userData[Object.keys(userData)[0]].value,
    };
  }

  componentDidMount() {
    this.props.onSelect(this.state.selected);
  }

  handleChange(event, data) {
    this.setState({
      selected: data.value,
    });
    this.props.onSelect(data.value);
  }

  render() {
    const selectedCharacter = userData[this.state.selected];
    const trigger = (
      <span role='option' className='active selected item'>
        <img src={selectedCharacter.image.src} className={'ui avatar image'}/>
        <span className='text'>{selectedCharacter.text}</span>
      </span>
    );

    return (
      <Dropdown
        fluid={true}
        className='character_select'
        trigger={trigger}
        options={Object.values(userData)}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

CharacterSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

module.exports = CharacterSelect;
