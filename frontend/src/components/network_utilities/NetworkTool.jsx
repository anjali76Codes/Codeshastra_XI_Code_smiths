import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const tabs = ['IP Lookup', 'DNS Lookup', 'Ping', 'Traceroute'];

const NetworkTool = () => {
  const [activeTab, setActiveTab] = useState('IP Lookup');
  const [ipResult, setIpResult] = useState(null);
  const [domain, setDomain] = useState('');
  const [dnsResult, setDnsResult] = useState(null);
  const [host, setHost] = useState('');
  const [pingResult, setPingResult] = useState('');
  const [traceResult, setTraceResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:5000/api/network';

  const resetStates = () => {
    setIpResult(null);
    setDnsResult(null);
    setPingResult('');
    setTraceResult('');
    setDomain('');
    setHost('');
  };

  const fetchIP = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/ip`);
      setIpResult(res.data);  // Store both public and local IPs
    } catch {
      setError('Failed to fetch IP. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const lookupDNS = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/dns`, { params: { domain } });
      setDnsResult(res.data);
    } catch {
      setError('Failed to fetch DNS. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const pingHost = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/ping`, { params: { host } });
      setPingResult(res.data);
    } catch {
      setError('Failed to ping host. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const traceRoute = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/traceroute`, { params: { host } });
      setTraceResult(res.data);
    } catch {
      setError('Failed to perform traceroute. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="bg-[#1e1e2e] text-white rounded-lg shadow-2xl overflow-hidden font-mono">
        {/* Terminal Top Bar */}
        <div className="bg-[#2b2b40] px-4 py-2 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <h2 className="ml-4 font-bold text-sm text-gray-300 tracking-wide">network-tool@user:~$</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 px-6 pt-4 pb-2 border-b border-[#333]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setError('');
                resetStates();
              }}
              className={`px-4 py-1 text-sm rounded ${activeTab === tab ? 'bg-indigo-500 text-white' : 'bg-[#2b2b40] text-gray-400 hover:bg-[#35354f]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 py-3 text-rose-400 text-sm bg-[#2b1a1a] border-t border-rose-400">
            ⚠️ {error}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-8">
          {activeTab === 'IP Lookup' && (
            <>
              <button
                onClick={fetchIP}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded text-sm font-medium"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Get My IP'}
              </button>
              {ipResult && (
                <div className="mt-4 text-green-400 text-lg">
                  <p>Your Public IP Address: <span className="text-white">{ipResult.publicIp}</span></p>
                  <p>Your Local IP Address: <span className="text-white">{ipResult.localIp}</span></p>
                </div>
              )}
            </>
          )}

          {activeTab === 'DNS Lookup' && (
            <>
              <input
                type="text"
                placeholder="Enter domain (e.g., google.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="mt-2 w-full md:w-1/2 px-4 py-2 rounded bg-[#2b2b40] text-white border border-[#444] focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={lookupDNS}
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded text-sm font-medium"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Lookup DNS'}
              </button>
              {dnsResult && (
                <div className="mt-6">
                  <p className="text-gray-300">Domain: <span className="text-indigo-300">{dnsResult.domain}</span></p>
                  <p className="mt-2 text-gray-400">Resolved IP Addresses:</p>
                  <ul className="list-disc ml-6 mt-2 text-green-400">
                    {dnsResult.addresses.map((addr, i) => (
                      <li key={i}>{addr}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeTab === 'Ping' && (
            <>
              <input
                type="text"
                placeholder="Enter host to ping (e.g., google.com)"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="mt-2 w-full md:w-1/2 px-4 py-2 rounded bg-[#2b2b40] text-white border border-[#444] focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={pingHost}
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded text-sm font-medium"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Ping'}
              </button>
              {pingResult && (
                <div className="mt-4 text-green-400 text-lg">
                  <p>{pingResult}</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'Traceroute' && (
            <>
              <input
                type="text"
                placeholder="Enter host for traceroute (e.g., google.com)"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="mt-2 w-full md:w-1/2 px-4 py-2 rounded bg-[#2b2b40] text-white border border-[#444] focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={traceRoute}
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded text-sm font-medium"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Traceroute'}
              </button>
              {traceResult && (
                <div className="mt-4 text-green-400 text-lg">
                  <p>{traceResult}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkTool;
