import React, { useState } from 'react';

const Leads = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', status: 'New' },
    { id: 2, name: 'Jane Smith', status: 'Contacted' },
    { id: 3, name: 'Bob Johnson', status: 'Closed' },
  ]);
  
  const [editingLead, setEditingLead] = useState(null);
  const [newLeadData, setNewLeadData] = useState({ name: '', status: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setNewLeadData({ name: lead.name, status: lead.status });
  };

  const handleDelete = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleSave = () => {
    setLeads(leads.map((lead) => 
      lead.id === editingLead.id ? { ...lead, ...newLeadData } : lead
    ));
    setEditingLead(null);
    setNewLeadData({ name: '', status: '' });
  };

  const handleAddLead = () => {
    const newLead = {
      id: leads.length + 1,
      name: newLeadData.name,
      status: newLeadData.status,
    };
    setLeads([...leads, newLead]);
    setNewLeadData({ name: '', status: '' });
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Lead Management</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a lead..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Lead Name"
          value={newLeadData.name}
          onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
          className="border p-2 rounded w-full mr-2"
        />
        <input
          type="text"
          placeholder="Lead Status"
          value={newLeadData.status}
          onChange={(e) => setNewLeadData({ ...newLeadData, status: e.target.value })}
          className="border p-2 rounded w-full mr-2"
        />
        <button
          onClick={handleAddLead}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Add Lead
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingLead?.id === lead.id ? (
                  <input
                    type="text"
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  lead.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {editingLead?.id === lead.id ? (
                  <input
                    type="text"
                    value={newLeadData.status}
                    onChange={(e) => setNewLeadData({ ...newLeadData, status: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  lead.status
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {editingLead?.id === lead.id ? (
                  <>
                    <button onClick={handleSave} className="text-green-600 hover:text-green-900 mr-2">
                      Save
                    </button>
                    <button onClick={() => setEditingLead(null)} className="text-gray-600 hover:text-gray-900">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(lead)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leads;
