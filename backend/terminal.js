// server.js or server.mjs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { exec } from 'child_process';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Command execution endpoint
app.post('/api/exec', async (req, res) => {
  const { cmd } = req.body;
  const allowed = ['ls', 'mkdir', 'cd', 'pwd', 'touch', 'clear']; // Added clear command
  const [command] = cmd.split(' ');

  if (!allowed.includes(command)) {
    return res.send("❌ Command not allowed.");
  }

  if (command === 'clear') {
    return res.send(""); // Clear command will return an empty response to clear the terminal screen.
  }

  exec(cmd, (error, stdout, stderr) => {
    if (error) return res.send(stderr);
    res.send(stdout);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
