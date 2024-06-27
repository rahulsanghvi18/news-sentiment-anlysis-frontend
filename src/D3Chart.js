import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const D3Chart = ({ data, predictions, newsTime }) => {
  const ref = useRef();

  useEffect(() => {
    // Clear the previous chart
    d3.select(ref.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background', '#ffffff')
      .style('margin-top', '10px')
      .style('overflow', 'visible')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const allDates = [...data.map(d => new Date(d.date)), ...predictions.map(d => new Date(d.date)), new Date(newsTime)];
    const allPrices = [...data.map(d => d.price), ...predictions.map(d => d.price)];

    const x = d3.scaleTime()
      .domain(d3.extent(allDates))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(allPrices) * 0.95, d3.max(allPrices) * 1.05])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('color', '#333');

    svg.append('g')
      .call(d3.axisLeft(y))
      .attr('color', '#333');

    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.price));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add prediction points
    svg.selectAll('.prediction-point')
      .data(predictions)
      .enter()
      .append('circle')
      .attr('class', 'prediction-point')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.price))
      .attr('r', 5)
      .attr('fill', '#ff0000');

    // Add news time arrow
    const newsDate = new Date(newsTime);
    const newsDataPoint = data.find(d => new Date(d.date) >= newsDate) || data[data.length - 1];
    const arrowX = x(new Date(newsDataPoint.date));
    const arrowY = y(newsDataPoint.price);

    svg.append('circle')
      .attr('cx', arrowX)
      .attr('cy', arrowY)
      .attr('r', 5)
      .attr('fill', '#ffcc00');

    svg.append('path')
      .attr('d', `M${arrowX},${arrowY-15} L${arrowX-5},${arrowY-5} L${arrowX+5},${arrowY-5} Z`)
      .attr('fill', '#ffcc00');

    svg.append('text')
      .attr('x', arrowX)
      .attr('y', arrowY - 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffcc00')
      .attr('font-size', '12px')
      .text('News');

    // Add legend
    const legend = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(['Historical', 'Predictions', 'News Time'])
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', (d, i) => i === 0 ? '#007bff' : i === 1 ? '#ff0000' : '#ffcc00');

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d)
      .attr('fill', '#333');

  }, [data, predictions, newsTime]);

  return (
    <ChartContainer>
      <svg ref={ref}></svg>
    </ChartContainer>
  );
};

export default D3Chart;
