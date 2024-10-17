import React, { useEffect, useState, useRef } from 'react';
import Certificate from './Certificate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

const App = () => {
  const [certificateData, setCertificateData] = useState([]);
  const certificateRef = useRef();

  useEffect(() => {
    fetch('/python-certificate.json')
      .then((response) => response.json())
      .then((data) => setCertificateData(data))
      .catch((error) => console.error('Error fetching the certificate data:', error));
  }, []);

  const handleDownload = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    }
  };

  return (
    <div className="App">
      {certificateData.length > 0 && certificateData.map((cert) => (
        <div key={cert._id.$oid}>
          <div ref={certificateRef}>
            <Certificate data={cert} />
          </div>
          <button onClick={handleDownload} className="download-btn">Download Certificate</button>
        </div>
      ))}
    </div>
  );
};

export default App;
