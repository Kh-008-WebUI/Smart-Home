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
    const listDevices = this.props.devices.slice(1, 4);

    return (
      <section className="list-device">
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
  loadDevices: () => dispatch(loadDevices())
});

ListDevices.propTypes = {
  devices: PropTypes.array,
  loadDevices: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDevices);


// for (let i = 0; i < quantityDevices; i++) {
//       if (listDevices[i].status) {
//         power = 'power-on';
//       } else {
//         power = 'power-off';
//       }
//       arrDevices.push(
//        <DeviceContent />
//       );
//     }
