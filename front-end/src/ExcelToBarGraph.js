import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DepartmentBarGraph = () => {
  const [chartData, setChartData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      processExcelData(worksheet);
    };

    reader.readAsBinaryString(file);
  };

  const processExcelData = (data) => {
    const departmentCounts = {
      OPD: 0,
      ADT: 0,
      Billing: 0,
      Clinic: 0,
      Lab: 0,
      Radiology: 0,
    };

    data.forEach((row) => {
      if (row.OPD === 'Yes') departmentCounts.OPD += 1;
      if (row.ADT === 'Yes') departmentCounts.ADT += 1;
      if (row.Billing === 'Yes') departmentCounts.Billing += 1;
      if (row.Clinic === 'Yes') departmentCounts.Clinic += 1;
      if (row.Lab === 'Yes') departmentCounts.Lab += 1;
      if (row.Radiology === 'Yes') departmentCounts.Radiology += 1;
    });

    const chartData = Object.keys(departmentCounts).map((key) => ({
      name: key,
      value: departmentCounts[key],
    }));

    setChartData(chartData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DepartmentBarGraph;
