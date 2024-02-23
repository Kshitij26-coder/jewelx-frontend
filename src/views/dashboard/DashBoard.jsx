import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Card from './Card';
import '../dashboard/style.css';
import PageTitle from '../../component/PageTitle';

const Dashboard = () => {
     const pieChartRef = useRef(null);
     const lineChartRef = useRef(null);

     const [pieChartData, setPieChartData] = useState([30, 40, 30]);
     const [lineChartData, setLineChartData] = useState([1000, 1500, 1200, 1700, 1400, 1800]);

     useEffect(() => {
          const pieChartContext = pieChartRef.current.getContext('2d');
          if (pieChartRef.current.chart) {
               pieChartRef.current.chart.destroy();
          }

          const lineChartContext = lineChartRef.current.getContext('2d');
          if (lineChartRef.current.chart) {
               lineChartRef.current.chart.destroy();
          }

          const newPieChart = new Chart(pieChartContext, {
               type: 'pie',
               data: {
                    labels: ['Category 1', 'Category 2', 'Category 3'],
                    datasets: [
                         {
                              label: 'Pie Chart',
                              data: pieChartData,
                              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                         },
                    ],
               },
               options: {
                    plugins: {
                         legend: {
                              position: 'right',
                         },
                    },
                    responsive: false,
                    maintainAspectRatio: false,
               },
          });

          const newLineChart = new Chart(lineChartContext, {
               type: 'line',
               data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                         {
                              label: 'Monthly Revenue',
                              data: lineChartData,
                              borderColor: 'blue',
                              fill: false,
                         },
                    ],
               },
               options: {},
          });

          pieChartRef.current.chart = newPieChart;
          lineChartRef.current.chart = newLineChart;

          const interval = setInterval(() => {
               const newPieData = pieChartData.map(() => Math.floor(Math.random() * 100));
               setPieChartData(newPieData);

               const newLineData = lineChartData.map(() => Math.floor(Math.random() * 2000));
               setLineChartData(newLineData);

               newPieChart.data.datasets[0].data = newPieData;
               newPieChart.update();

               newLineChart.data.datasets[0].data = newLineData;
               newLineChart.update();
          }, 35000);

          return () => clearInterval(interval);
     }, [pieChartData, lineChartData]);

     return (
          <div>
               <header style={{ marginTop: '10rem' }}>
                    <PageTitle title="DashBoard" />
               </header>
               <div className="container">
                    <div className="col-md-3">
                         <Card title="Daily Income" footer="Income Footer" height={'200px'}>
                              <p>Daily Income </p>
                         </Card>
                    </div>

                    <div className="col-md-3">
                         <Card title="On Day Sale" footer="Sale Footer" height={'200px'}>
                              <ul>
                                   <li>Task 1</li>
                                   <li>Task 2</li>
                                   <li>Task 3</li>
                              </ul>
                         </Card>
                    </div>

                    <div className="col-md-3 ">
                         <Card title="Overall Revenue of the Month" footer="Revenue Footer" height="200px">
                              <p>Placeholder for revenue data of the month.</p>
                         </Card>
                    </div>
                    <div className="col-md-3 ">
                         <Card title="Amount Change" footer="Daily Amount" height="200px">
                              <p>Daily Amount Change</p>
                         </Card>
                    </div>
               </div>

               <div className="col-md-6">
                    <Card title="Pie Chart" footer="Pie Chart Footer">
                         <canvas ref={pieChartRef}></canvas>
                    </Card>
               </div>

               <div className="col-md-6">
                    <Card title="Monthly Revenue" footer="Revenue Graph Footer">
                         <canvas ref={lineChartRef}></canvas>
                    </Card>
               </div>
          </div>
     );
};

export default Dashboard;
