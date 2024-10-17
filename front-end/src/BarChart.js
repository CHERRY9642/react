// src/components/BarChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BarChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://indian-hospitals-diagnostics-centers.p.rapidapi.com/hospitals/all', {
          headers: {
            'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
            'x-rapidapi-host': 'indian-hospitals-diagnostics-centers.p.rapidapi.com'
          }
        });
        
        // Process the data according to the API response
        const hospitals = response.data; // Adjust based on actual API response structure
        const counts = { OPD: 0, ADT: 0, Billing: 0, Clinic: 0, Lab: 0, Radiology: 0 };
        
        hospitals.forEach(hospital => {
          if (hospital.opd === 'Yes') counts.OPD++;
          if (hospital.adt === 'Yes') counts.ADT++;
          if (hospital.billing === 'Yes') counts.Billing++;
          if (hospital.clinic === 'Yes') counts.Clinic++;
          if (hospital.lab === 'Yes') counts.Lab++;
          if (hospital.radiology === 'Yes') counts.Radiology++;
        });

        setLabels(Object.keys(counts));
        setData(Object.values(counts));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Count',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Hospital Facilities</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
