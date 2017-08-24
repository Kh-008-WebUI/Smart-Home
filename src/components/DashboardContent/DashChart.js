import React from 'react';
import './DashChart.scss';
import Chart from '../../components/Chart/Chart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ws } from '../../layouts/MainLayout/MainLayout';

class DashChart extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    ws.send(JSON.stringify({ type: 'initChart' }));
  }
  render () {
    return (
      <div className='chart'>
        <h2 className="list-title">Power consumption</h2>
        <Chart
          data={ this.props.data }
          styleName='dashChart' />
      </div>
    );
  }
}
function mapStateToProps (store) {
  return {
    data: store.ws.chart
  };
}

DashChart.propTypes = {
  data: PropTypes.array
};

export default connect(mapStateToProps)(DashChart);
