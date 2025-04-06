import React from "react";
import {
  Sparkles,
  KeyRound,
  TrendingUp,
  BarChart3,
  Code,
  ImageIcon,
  Network,
  Shuffle,
  Clock,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const user = {
  subscription: {
    plan: "Pro",
    used_requests: 1500,
    remaining_requests: 500,
    total_requests: 2000,
    subscribed_features: [
      "API Requests",
      "Image Conversion",
      "Code Validation",
      "Feature 4",
      "Feature 5",
      "Feature 6",
      "Feature 7",
      "Feature 8",
      "Feature 9",
      "Feature 10",
    ],
  },
  feature_usage: {
    "API Requests": 1200,
    "Image Conversion": 250,
    "Code Validation": 50,
  },
  api_requests: 1200,
  images_converted: 250,
  code_validated: 50,
};

const quickTools = [
  { name: "JSON Validator", icon: Code },
  { name: "Format Converter", icon: Shuffle },
  { name: "Ping Test", icon: Network },
  { name: "Image Resizer", icon: ImageIcon },
];

const usageData = Object.entries(user.feature_usage).map(([name, usage]) => ({
  name,
  usage,
}));

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
    <Icon className={`w-6 h-6 ${color}`} />
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen font-sans">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={BarChart3}
          title="Used Requests"
          value={`${user.subscription.used_requests} / ${user.subscription.total_requests}`}
          color="text-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Most Used"
          value="API Requests"
          color="text-green-500"
        />
        <StatCard
          icon={KeyRound}
          title="Plan"
          value={user.subscription.plan}
          color="text-yellow-500"
        />
        <StatCard
          icon={Sparkles}
          title="Unlocked Features"
          value={`${user.subscription.subscribed_features.length} Tools`}
          color="text-purple-500"
        />
      </div>

      {/* Usage + Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Tool Usage Stats</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={usageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Insights & Suggestions</h2>
          <ul className="space-y-3 text-gray-600 list-disc list-inside">
            <li>Try <strong>YAML Validator</strong> for config files</li>
            <li>Use <strong>Traceroute</strong> for deeper network analysis</li>
            <li>Explore <strong>Markdown Formatter</strong> for writing docs</li>
          </ul>
        </div>
      </div>

      {/* Quick Access Tools */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Most Frequent Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition flex flex-col items-center gap-2"
            >
              <tool.icon className="w-6 h-6 text-indigo-500" />
              <span className="text-sm font-medium text-center text-gray-700">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity + This Month */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            Recent Activity
          </h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>✔️ Validated 5 JSON files</li>
            <li>📤 Converted 3 images</li>
            <li>🔄 Used Ping tool twice</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            This Month / Averages
          </h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>API Requests: <strong>{user.api_requests}</strong></li>
            <li>Images Converted: <strong>{user.images_converted}</strong></li>
            <li>Code Validated: <strong>{user.code_validated}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
