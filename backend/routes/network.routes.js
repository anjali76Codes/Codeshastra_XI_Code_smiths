import express from 'express';
import { getIP, lookupDNS, pingIP, traceRoute } from '../controllers/network.controllers.js'; // Corrected the function names

const router = express.Router();

// Route to get public and local IP addresses
router.get('/ip', getIP);

// Route to perform DNS lookup
router.get('/dns', lookupDNS);

// Route to ping an IP address
router.get('/ping', pingIP); // Corrected function name

// Route to perform a traceroute to a host
router.get('/traceroute', traceRoute);

export default router;
