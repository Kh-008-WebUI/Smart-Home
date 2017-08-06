import React from 'react';
import './DashChart.scss';
import Chart from '../../components/Chart/Chart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ws } from '../../index';

class DashChart extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    ws.onmessage = msg => {
      const message = JSON.parse(msg.data);

      if (message.type === 'chart') {
        const d = 1;
      }
    };
  }
  render () {
    return (
      <div className='chart'>
        <h2 className="list-title">ChartMUTHAFUCKA</h2>
        <Chart />
      </div>
    );
  }
}
function mapStateToProps (store) {
  return {
  };
}
function mapDispatchToProps (dispatch) {
  return {
  };
}

DashChart.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DashChart);
