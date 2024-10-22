import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';
import Leads from '../components/Leads'; 
import AnalysticChart from '../components/AnalyticsChart';
import { jsPDF } from 'jspdf';

const Reports = () => {
  const chartRef = useRef(null);
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', status: 'New' },
    { id: 2, name: 'Jane Smith', status: 'Contacted' },
    { id: 3, name: 'Bob Johnson', status: 'Closed' },
  ]);
  const [newLead, setNewLead] = useState({ name: '', status: '' });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Lead Analysis Chart", 20, 20);
    
    const imgData = chartRef.current.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 15, 30, 180, 160); 
    doc.save("chart_report.pdf");
  };


  const handleDownloadCSV = () => {
    
    const header = ["Name", "Status"];
    const rows = leads.map(lead => [lead.name, lead.status]);
  
    
    const csvContent = [
      header.join(","), 
      ...rows.map(row => row.join(",")) 
    ].join("\n"); 
  
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleAddLead = (e) => {
    e.preventDefault();
    if (newLead.name && newLead.status) {
      setLeads([...leads, { id: leads.length + 1, ...newLead }]);
      setNewLead({ name: '', status: '' }); 
    }
  };

  return (
    <Layout>

      <div className="bg-white p-6 shadow rounded-md">
      
        <div className="mt-4">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Download Chart as PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-green-500 text-white p-2 rounded"
          >
            Download Leads as CSV
          </button>
        </div>
        <br />
        <h2 className="text-2xl font-bold mb-4">Reports</h2>
        
        
        
        <div className="chart-container">
          <AnalysticChart ref={chartRef} />
        </div>
        
        <br /><br />
        
        <form onSubmit={handleAddLead} className="mt-4">
          <input
            type="text"
            placeholder="Lead Name"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Lead Status"
            value={newLead.status}
            onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-purple-500 text-white p-2 rounded">
            Add Lead for csv 
          </button>
        </form>

        
        <div className="mt-4">
          <Leads leads={leads} /> 
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
