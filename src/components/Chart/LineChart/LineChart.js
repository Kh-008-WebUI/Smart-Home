import './index.scss';
import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { Dots } from '../Dots/Dots';
import Grid from '../Grid/Grid';
import Axis from '../Axis/Axis';

export default class LineChart extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const margin = { top: 20, right: 20, bottom: 20, left: 50 },
      w = this.props.width - (margin.left + margin.right),
      h = this.props.height - (margin.top + margin.bottom);
    const parseDate = d3.timeParse('%H-%M');

    this.data = this.props.data.map((d) => {
      return Object.assign({}, d, { date: parseDate(d[this.props.xData]) });
    });
    const x = d3.scaleTime()
      .domain(d3.extent(this.data, (d) => d.date))
      .rangeRound([0, w]);
    const y = d3.scaleLinear()
      .domain([0, 500])
      .range([h, 0]);
    const line = d3.line()
      .x((d)=> x(d.date))
      .y((d)=> y(d[this.props.yData]))
      .curve(d3.curveCardinal);
    const transform = `translate(${margin.left},${margin.top})`;

    return (
      <div
        className={this.props.styleName}
        style={ { width:this.props.width, height:this.props.height } }>
        <svg
          width={ '100%' }
          height={ '100%' }>
          <g transform={transform}>
            <Grid
              h={h}
              len={h}
              scale={x}
              gridType="x"
              orient={'Bottom'}
              ticks={this.data.length * 2}/>
            <Grid
              h={h}
              len={w}
              scale={y}
              gridType="y"
              orient={'Left'}
              ticks={6}/>
            <Axis h={h}
              orient={'Left'}
              scale={y}
              axisType="y"
              ticks={6} />
            <Axis h={h}
              orient={'Bottom'}
              scale={x}
              axisType="x"
              ticks={8}
              format={'%H:%M'}/>
            <Dots
              x={x}
              y={y}
              data={this.data}
              yData={this.props.yData} />
            <path
              className="line shadow"
              d={line(this.data)}
              strokeLinecap="round"/>
          </g>
        </svg>
      </div>
    );
  }
}

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  xData: PropTypes.string,
  yData: PropTypes.string,
  data: PropTypes.array,
  styleName: PropTypes.string
};

LineChart.defaultProps = {
  width:800,
  height:300,
  xData:'day',
  yData:'count',
  data:[
    { day:'4-01', count:310 },
    { day:'4-02', count:430 },
    { day:'4-03', count:180 },
    { day:'4-04', count:150 },
    { day:'4-05', count:180 },
    { day:'4-06', count:250 },
    { day:'4-07', count:110 },
    { day:'4-08', count:230 },
    { day:'4-09', count:480 },
    { day:'4-10', count:250 },
    { day:'4-11', count:380 },
    { day:'4-12', count:50 }
  ]
};
