// src/D3Chart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

const D3Chart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 600)
      .attr('height', 400)
      .style('background', '#1f1f1f')
      .style('margin-top', '10px')
      .style('overflow', 'visible');

    const xScale = d3.scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([0, 600]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)])
      .range([400, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .call(xAxis)
      .attr('transform', 'translate(0, 400)')
      .attr('color', 'white');

    svg.append('g')
      .call(yAxis)
      .attr('color', 'white');

    const line = d3.line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.price))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#00FF00')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [data]);

  return (
    <ChartContainer>
      <svg ref={ref}></svg>
    </ChartContainer>
  );
};

export default D3Chart;
