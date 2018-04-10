
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Label } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

const CHART_COLORS = ['#0088FE', '#555'];

class FicoScore extends React.Component {
  render() {
    // bail if nothing to draw
    if (!this.props.ficoScores || !this.props.ficoScores.length) return null;

    const latestScore = this.props.ficoScores.slice(-1)[0];
    // draw as a pie chart, normalizing into the 850 credit score range
    const piChartData = [
      { value: latestScore.value },
      { value: 850 - latestScore.value },
    ];

    return (
      <div className='fico-score'>
        <div className='current'>
          <h2>Score</h2>
          <PieChart width={400} height={300}>
            <Pie
              dataKey='value'
              data={piChartData}
              startAngle={210}
              endAngle={-30}
              innerRadius={60}
              outerRadius={100}
              fill='#8884d8'
              paddingAngle={4}
            >
              {
                piChartData.map((entry, index) =>
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]}/>)
              }
              <Label width={30} position='center'
                content={
                  <text x='50%' y='50%' textAnchor='middle'>
                    <tspan x='50%' style={ { fontSize: '11px' } }>Your FICO Score is</tspan>
                    <tspan x='50%' dy='1em' style={ { fontSize: '30px', fontWeight: 'bold' } }>{latestScore.value}</tspan>
                  </text>
                }
                value='any'
              />
            </Pie>
          </PieChart>
        </div>
        {/* display historical */}
        <div className='historical'>
          <h2>History</h2>
          <ScatterChart width={400} height={350} margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}>
            <CartesianGrid />
            <XAxis
              dataKey='time'
              domain={['auto', new Date().getTime() / 1000]}
              name='Time'
              tickFormatter = {unixTime => new Date(unixTime * 1000).toLocaleDateString()}
              type = 'number'
            />
            <YAxis
              dataKey='value'
              domain={[250, 850]}
              type='number'
              name='score'
            />
            <Scatter name='Historical Score' data={this.props.ficoScores} fill={CHART_COLORS[0]}/>
            <Tooltip cursor={{
              strokeDasharray: '3 3',
            }}/>
          </ScatterChart>
        </div>
      </div>
    );
  }
}
FicoScore.propTypes = {
  ficoScores: PropTypes.array.isRequired,
};

module.exports = FicoScore;
