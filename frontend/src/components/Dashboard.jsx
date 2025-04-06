// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Sample data in JSON format
const data = {
  user: {
    name: 'John Doe',
    subscription: {
      plan: 'Premium',
      total_requests: 1000,
      remaining_requests: 720,
      used_requests: 280,
    },
    feature_usage: {
      'Text Formatter': 120,
      'CSV & Excel Tools': 80,
      'API Tools': 60,
      'Image & Graphic Converters': 50,
      'Code Formatter': 30,
      'Password Generator': 15,
      'Random Number Generator': 20,
      'Network Utilities': 15,
    },
  },
};

const Dashboard = () => {
  const [userData, setUserData] = useState(data.user);

  useEffect(() => {
    setUserData(data.user);
  }, []);

  // Find the most used feature
  const mostUsedFeature = Object.entries(userData.feature_usage).reduce(
    (maxFeature, currentFeature) => {
      return currentFeature[1] > maxFeature[1] ? currentFeature : maxFeature;
    },
    ['', 0]
  );

  // Chart Data: Feature Usage
  const featureUsageData = {
    labels: Object.keys(userData.feature_usage),
    datasets: [
      {
        label: 'Requests Used',
        data: Object.values(userData.feature_usage),
        backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#8e44ad', '#1abc9c', '#16a085', '#d35400'],
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
        hoverBackgroundColor: '#2980b9',
      },
    ],
  };

  // Chart Data: Requests Usage
  const requestUsageData = {
    labels: ['Used Requests', 'Remaining Requests'],
    datasets: [
      {
        data: [userData.subscription.used_requests, userData.subscription.remaining_requests],
        backgroundColor: ['#3498db', '#95a5a6'],
        borderRadius: 6,
      },
    ],
  };

  // Request Usage Percentage
  const usedPercentage = Math.round((userData.subscription.used_requests / userData.subscription.total_requests) * 100);
  const remainingPercentage = 100 - usedPercentage;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">Dashboard</h1>

        {/* User Subscription Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Subscription Plan</h2>
            <p className="text-lg font-medium text-blue-600">{userData.subscription.plan}</p>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Used Requests</h2>
            <p className="text-lg font-medium text-blue-600">
              {userData.subscription.used_requests} / {userData.subscription.total_requests}
            </p>
            <div className="text-sm text-gray-500">
              <span>{usedPercentage}% used of your total requests</span>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Remaining Requests</h2>
            <p className="text-lg font-medium text-blue-600">{userData.subscription.remaining_requests}</p>
            <div className="text-sm text-gray-500">
              <span>{remainingPercentage}% remaining of your total requests</span>
            </div>
          </div>
        </div>

        {/* Requests Usage Visualization */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Request Usage</h2>
          <div className="h-64">
            <Doughnut data={requestUsageData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        {/* Feature Usage Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Feature Usage</h2>
          <div className="h-64">
            <Bar data={featureUsageData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        {/* Most Used Feature */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700">Most Used Feature</h2>
          <p className="text-lg text-blue-600">
            {mostUsedFeature[0]} ({mostUsedFeature[1]} requests)
          </p>
        </div>

        {/* Request Analytics */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700">Request Analytics</h2>
          <div className="text-sm text-gray-600">
            <p>Total Requests: {userData.subscription.total_requests}</p>
            <p>Used Requests: {userData.subscription.used_requests}</p>
            <p>Remaining Requests: {userData.subscription.remaining_requests}</p>
            <p>
              Usage Efficiency: {((userData.subscription.used_requests / userData.subscription.total_requests) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
