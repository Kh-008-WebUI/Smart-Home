import React from 'react';
import './ListDevices.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadDevices } from '../../actions/devices.action.js';
import DeviceContent from './DeviceContent.js';
import { filterItems } from '../../selectors/';

class ListDevices extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.loadDevices();
  }
  render () {
    const listDevices = this.props.devices.slice(0, 3);

    if (listDevices.length === 0) {
      return (
      <section className='list-device-spinner'>
        <i className='fa fa-3x fa-spinner fa-spin spinner-dash'></i>
      </section>);
    }
    return (
      <section className='list-device'>
        {listDevices.map((item, key) => {
          return (
            <li className="device-single" key={key}>
              <DeviceContent device={item}/>
            </li>
          );
        })
        }
      </section>
    );
  }
}

const mapStateToProps = state =>({
  devices: filterItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadDevices: bindActionCreators(loadDevices, dispatch)
});

ListDevices.propTypes = {
  devices: PropTypes.array,
  loadDevices: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDevices);
