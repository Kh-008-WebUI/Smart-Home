import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../../components/Popup/Popup';
import { Button } from '../../components/Button/Button';

export default class SelectLocation extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      input: false,
      locationValue: '',
      inputValue: '',
      popupShown: false,
      idLocation: ''
    };
  }
  setPopupShown = (id) => {
    const currentState = this.state.popupShown;

    if (typeof id !== 'undefined') {
      this.props.deviceExistInLocation(id);
    }

    this.setState({
      popupShown: !currentState,
      idLocation: id
    });
  };

  showInputLocation = () => {
    this.setState({
      input: !this.state.input
    });
  };

  setInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  };

  deleteSelectedLocation = (id) => {
    this.props.deleteLocation(id);
  };

  setLocationValue = (location) => {
    this.setState({
      locationValue: location.label
    });

    this.props.selectLocation(location.value);
    this.showInputLocation();
  };


  addLocationValue = () => {
    if (this.state.inputValue.trim() !== '') {
      this.props.addLocation(this.state.inputValue);
    }

    this.setState({
      inputValue: ''
    });
  }

  render () {
    return (
      <div>
      <div className="Select-control">
        <div className="Select-value select-menu-container">
          <div className="select-menu-label"
            onClick={ this.showInputLocation }>
            <span className="Select-value-label">
              { !this.state.locationValue ?
                this.props.defaultLocation :
                this.state.locationValue }
            </span>
            <i className={`select-toggle fa ${this.state.input ?
              'fa-caret-up' : 'fa-caret-down'}`}></i>
          </div>
        </div>
        {this.state.input ?
        <div className="Select-menu__outer">
          <div className="Select-input-location">
            <input type="text"
              placeholder="Add new location"
              className="Select-input_add-location"
              onChange={this.setInputValue}
              value={this.state.inputValue}/>
            <i className="fa fa-plus Select-input_add-location_icon"
              onClick={this.addLocationValue}></i>
          </div>
              <ul className="Select-menu">
                {this.props.locations.map((location, i) => {
                  return (
                    <li key={i} className="Select-option">
                      <span className="Select-option__item"
                        onClick={ (e) =>
                        (this.setLocationValue(location))}>
                           {location.label}
                      </span>
                      <i className="fa fa-trash Select-option__icon"
                        onClick={ (e) =>
                          (this.setPopupShown(location._id))}>
                      </i>
                    </li>
                  );
                })}
            </ul>
        </div> : null }
      </div>
        <Popup
          setPopupShown={this.setPopupShown}
          popupShown={this.state.popupShown}
          header="Confirm the action"
          text={this.props.deviceInLocation ?
            'You can\'t delete this location, because you have devices in it' :
            'Are you sure you want to delete this location?'
          }>
          <Button
            disabled={this.props.deviceInLocation}
            setPopupShown={this.setPopupShown}
            okHandler={() => {
              this.deleteSelectedLocation(this.state.idLocation);
              this.setPopupShown();
            }}
            className={this.props.deviceInLocation ?
              'btn btn--default' :
              'btn popup__btn'}
            innerText={'Ok'}
          />
          <Button
            okHandler={() => {
              this.setPopupShown();
            }}
            className={'btn btn--default popup__btn'}
            innerText={'Cancel'}
          />
        </Popup>
      </div>
    );
  }
}

SelectLocation.propTypes = {
  locations: PropTypes.array,
  addLocation: PropTypes.func,
  deleteLocation: PropTypes.func,
  selectLocation: PropTypes.func,
  defaultLocation: PropTypes.string,
  deviceExistInLocation: PropTypes.func,
  deviceInLocation: PropTypes.bool
};
