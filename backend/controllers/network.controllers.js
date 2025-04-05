import axios from 'axios'; // Add axios for fetching public IP
import os from 'os'; // Add os for fetching local IP
import dns from 'dns'; // Add dns for domain lookup
import { exec } from 'child_process'; // Add exec for running ping and traceroute commands

// Function to get both public and local IP addresses
export const getIP = async (req, res) => {
  try {
    console.log('Fetching public and local IPs...');
    
    // Fetch public IP from external service
    const response = await axios.get('https://api.ipify.org?format=json');
    const publicIp = response.data.ip;

    console.log('Public IP:', publicIp); // Log the public IP

    // Get local IP (internal network IP) using os.networkInterfaces()
    const networkInterfaces = os.networkInterfaces();
    let localIp = '';

    for (const interfaceName of Object.keys(networkInterfaces)) {
      for (const iface of networkInterfaces[interfaceName]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          localIp = iface.address;
          console.log('Local IP:', localIp); // Log the local IP
          break;
        }
      }
      if (localIp) break; // Exit once we find a valid local IP
    }

    if (!localIp) {
      console.log('Local IP not found');
    }

    // Sending both IP addresses in the response
    res.status(200).json({
      publicIp,
      localIp: localIp || 'Local IP not found',
    });
  } catch (error) {
    console.error('Error fetching IPs:', error.message);
    res.status(500).json({ error: 'Failed to fetch IP addresses' });
  }
};

// Function to lookup DNS for a domain
export const lookupDNS = (req, res) => {
  const domain = req.query.domain;
  if (!domain) return res.status(400).json({ error: 'Domain is required' });

  dns.resolve4(domain, (err, addresses) => {
    if (err) return res.status(400).json({ error: 'Invalid domain' });
    res.json({ domain, addresses });
  });
};

// Function to ping an IP address and measure response time
export const pingIP = (req, res) => {
  const ip = req.query.ip;
  if (!ip) return res.status(400).json({ error: 'IP address is required' });

  exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
    if (error) return res.status(400).json({ error: stderr });
    res.json({ output: stdout });
  });
};

// Function to run a traceroute to an IP
export const traceRoute = (req, res) => {
  const host = req.query.host;
  if (!host) return res.status(400).json({ error: 'Host is required' });

  exec(`traceroute ${host}`, (error, stdout, stderr) => {
    if (error) return res.status(400).json({ error: stderr });
    res.json({ output: stdout });
  });
};
