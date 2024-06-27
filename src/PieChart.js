import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.raw !== null) {
                  label += context.raw;
                }
                return label;
              }
            }
          }
        }
      }
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} style={{maxHeight: '100%', maxWidth: '100%', margin: '0 auto'}} />;
};

export default PieChart;
