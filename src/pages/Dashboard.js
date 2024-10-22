import React from 'react';
import Layout from '../components/Layout';
import Widgets from '../components/Widgets';
import Leads from '../components/Leads';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <Widgets />
        <Leads />
      </div>
    </Layout>
  );
};

export default Dashboard;
