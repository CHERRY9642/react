// src/components/BarChart.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const RechartsBarChart = () => {
  const [chartData, setChartData] = useState([]);

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

        const data = Object.keys(counts).map(key => ({ name: key, count: counts[key] }));
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Hospital Facilities</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default RechartsBarChart;
