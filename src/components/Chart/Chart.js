import React from 'react';
import PropTypes from 'prop-types';
import LineChart from './LineChart/LineChart';
import { ws } from '../../index';

export default class Chart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      calcWidth: 200,
      data: []
    };
  }

  componentDidMount () {
    ws.onmessage = msg => {
      const message = JSON.parse(msg.data);

      if (message.type === 'chart') {
        this.setState({
          ...this.state,
          data: message.data
        });
      }
    };
    window.addEventListener('resize', this.setChildWidth);
    this.setChildWidth();
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.setChildWidth);
  }
  setChildWidth = () => {
    this.setState({
      calcWidth: this.getElementWidth()
    });
  }
  getElementWidth () {
    return this.div.offsetWidth;
  }
  render () {
    return (
      <div className={ this.props.styleName }
        ref={ (el)=>{
          this.div = el;
        } }>
          <LineChart
            width={this.state.calcWidth}
            data={this.state.data}/>
      </div>
    );
  }
}

Chart.propTypes = {
  parent: PropTypes.string,
  styleName: PropTypes.string
};
