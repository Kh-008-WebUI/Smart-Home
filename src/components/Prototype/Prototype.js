import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';
import { deleteItem } from '../../actions/builder.actions';
import { SettingsList } from '../SettingsList/SettingsList';

class Prototype extends Component {
  render () {
    return (
        <div className='Prototype'>
          <h3>{this.props.settings.name}</h3>
          <SettingsList
            width={this.width}
            settings={this.props.settings}
            deleteItem={this.props.deleteItem}
          />
        </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    settings: store.settings
  };
}
function mapDispatchToProps (dispatch) {
  return {
    deleteItem: bindActionCreators(deleteItem, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Prototype);

Prototype.propTypes = {
  settings: PropTypes.object,
  deleteItem: PropTypes.func
};
