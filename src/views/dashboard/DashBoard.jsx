import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Card from './Card';
import '../dashboard/style.css';
import PageTitle from '../../component/PageTitle';
import { getRequest } from '../../utils/apis/apiRequestHelper';
import { getTransactionDaily, getTransactionFive } from '../../utils/apis/dashBoardApiRequest';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getAllMetalsByBrand } from '../../utils/apis/metalApiRequest';

const Dashboard = () => {
     const pieChartRef = useRef(null);
     const lineChartRef = useRef(null);

     const [pieChartData, setPieChartData] = useState([30, 40, 30]);
     const [lineChartData, setLineChartData] = useState([1000, 1500, 1200, 1700, 1400, 1800]);
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [dailyTransaction, setDailyTransaction] = useState(); //single value coming
     const [fiveTransaction, setFiveTransaction] = useState([]); //list of data coming
     const [metals, setMetals] = useState([]);

     const getDailyTransaction = async () => {
          try {
               const data = await getRequest(getTransactionDaily(), navigate, enqueueSnackbar); // change in dashBordEndPoints.js brandId and SubsidiaryId to  cookie.brandId & for subsidiaryId
               setDailyTransaction(data);
              // console.log(data);
          } catch (e) {
               console.error('Error fetching transactions:', e);
          }
     };

     const getFiveTransaction = async () => {
          try {
               const data = await getRequest(getTransactionFive(), navigate, enqueueSnackbar); // change in dashBordEndPoints.js brandId and SubsidiaryId to  cookie.brandId & for subsidiaryId
               setFiveTransaction(data);
               setLineChartData(data);
              // console.log(data);
          } catch (e) {
               console.error('Error fetching transactions:', e);
          }
     };

     const getMetalsOptions = async () => {
          try {
               const data = await getRequest(getAllMetalsByBrand(), navigate, enqueueSnackbar);
               setMetals(data);
          } catch (e) {
               console.error(e);
          }
     };

     useEffect(() => {
          const pieChartContext = pieChartRef.current.getContext('2d');
          getDailyTransaction();
          getFiveTransaction();
          getMetalsOptions();
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
                    labels: ['Gold', 'Silver', 'Platinum'],
                    datasets: [
                         {
                              label: 'Pie Chart',
                              data: pieChartData,
                              backgroundColor: ['#ffce56', '#36a2eb', '#ff6384'],
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
                    labels: ['L5', 'L4', 'L3', 'L2', 'L1'],
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

               // const newLineData = lineChartData.map(() => Math.floor(Math.random() * 2000));
               // setLineChartData(newLineData);

               newPieChart.data.datasets[0].data = newPieData;
               newPieChart.update();

               newLineChart.data.datasets[0].data = newLineData;
               newLineChart.update();
          }, 35000);

          return () => clearInterval(interval);
     }, [pieChartData]);

     return (
          <div>
               <header style={{ marginTop: '10rem' }}>
                    <PageTitle title="DashBoard" />
               </header>
               <div className="container">
                    <div className="col-md-3">
                         <Card title="Daily Transaction" footer="Income Footer" height={'200px'}>
                              <p>Daily Total Transaction :₹{dailyTransaction}</p>
                         </Card>
                    </div>

                    <div className="col-md-3">
                         <Card title="Last Five Transaction" footer="Sale Footer" height={'200px'}>
                              <ul>
                                   {/* Add mapper to handle empty list / array out of bound exception */}
                                   {fiveTransaction.map((each, index) => (
                                        <p key={index}>
                                             <li>
                                                  {`Transaction ${index} :`} ₹{each}
                                             </li>
                                        </p>
                                   ))}
                                   {/* <li>Transaction 1 : {fiveTransaction[0]}</li>
                                   <li>Transaction 2 : {fiveTransaction[1]}</li>
                                   <li>Transaction 3 : {fiveTransaction[2]}</li>
                                   <li>Transaction 4 : {fiveTransaction[3]}</li>
                                   <li>Transaction 5 : {fiveTransaction[4]}</li> */}
                              </ul>
                         </Card>
                    </div>

                    <div className="col-md-3 ">
                         <Card title="Metals Info" footer="Revenue Footer" height="200px">
                              {/* <p>Metal.</p> */}
                              {metals.map((each, index) => (
                                   <p key={index}>
                                        {'Metal Name: ' + each.metalName} {'Metal Rate: ' + each.metalRate}
                                   </p>
                              ))}
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
