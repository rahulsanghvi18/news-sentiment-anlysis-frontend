import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const useChart = (chartConfig) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    let chartInstance = null;

    if (canvas) {
      chartInstance = new Chart(canvas, chartConfig);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartConfig]);

  return chartRef;
};

export default useChart;
