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
  }
  render () {
    return (
      <div className='chart'>
        <h2 className="list-title">ChartMUTHAFUCKA</h2>
        <Chart data={ this.props.data }/>
      </div>
    );
  }
}
function mapStateToProps (store) {
  return {
    data: store.chart.data
  };
}

DashChart.propTypes = {
  data: PropTypes.array
};

export default connect(mapStateToProps)(DashChart);
