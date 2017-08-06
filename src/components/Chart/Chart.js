import React from 'react';
import PropTypes from 'prop-types';
import LineChart from './LineChart/LineChart';

export default class Chart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      calcWidth: 200
    };
  }

  componentDidMount () {
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
            width={this.state.calcWidth}/>
      </div>
    );
  }
}

Chart.propTypes = {
  parent: PropTypes.string,
  styleName: PropTypes.string
};
