import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';

// Import data from the external JSON file
import data from '../data.json'; // Renamed to avoid conflict with state variable

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Initialize the state with the imported data
  const [userData] = useState(data.user); // Directly using the imported data

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
        backgroundColor: '#3498db', // Blue color for all bars
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
        hoverBackgroundColor: '#2980b9',
        barThickness: 40, // Increased bar width for better visibility
        categoryPercentage: 0.8, // Adjust the spacing between bars
        barPercentage: 0.7, // Adjust the width of each bar
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

  // Request Analytics with Pie Chart
  const requestAnalyticsData = {
    labels: ['Used Requests', 'Remaining Requests'],
    datasets: [
      {
        data: [userData.subscription.used_requests, userData.subscription.remaining_requests],
        backgroundColor: ['#3498db', '#95a5a6'],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

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

        {/* Requests Usage and Feature Usage Side by Side */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Usage Visualization */}
          <div className="h-64">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Request Usage</h2>
            <Doughnut data={requestUsageData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          {/* Feature Usage Visualization */}
          <div className="h-80">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Feature Usage</h2>
            <Bar
              data={featureUsageData}
              options={{
                responsive: true,
                indexAxis: 'y', // Horizontal bars
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        return `${tooltipItem.raw} requests`; // Fixed tooltip syntax
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      beginAtZero: true,
                      padding: 10, // Adjust space between the bar and axis
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Most Used Feature */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700">Most Used Feature</h2>
          <p className="text-lg text-blue-600">
            {mostUsedFeature[0]} ({mostUsedFeature[1]} requests)
          </p>
        </div>

        {/* Request Analytics with Pie Chart */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Request Analytics</h2>
          <div className="h-64">
            <Pie
              data={requestAnalyticsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top', // Correctly placed legend option
                    labels: {
                      font: {
                        size: 14, // Standard text size for legend
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="text-base text-gray-600 mt-4">
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
