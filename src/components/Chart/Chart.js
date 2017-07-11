import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../LineChart/LineChart';

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
    const ELEMENT_WIDTH = 0.85;

    return document.querySelector(`.${this.props.parent}`)
      .offsetWidth * ELEMENT_WIDTH;
  }
  render () {
    return (
      <div className={ this.props.styleName }>
         <LineChart width={this.state.calcWidth}/>
      </div>
    );
  }
}

Chart.propTypes = {
  parent: PropTypes.string,
  styleName: PropTypes.string
};
