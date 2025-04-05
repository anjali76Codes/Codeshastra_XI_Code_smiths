import express from 'express';
import expressWsPkg from 'express-ws';
import pty from 'node-pty';
import cors from 'cors';

const app = express();
const { app: expressWsApp } = expressWsPkg(app);
expressWsApp.use(cors());
expressWsApp.use(express.json());

expressWsApp.ws('/terminal', function (ws, req) {
    const shell = process.env.SHELL || (process.platform === 'win32' ? 'powershell.exe' : 'bash');

    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME || process.cwd(),
        env: process.env
    });

    ptyProcess.on('data', function (data) {
        ws.send(data);
    });

    ws.on('message', function (msg) {
        ptyProcess.write(msg);
    });

    ws.on('close', function () {
        ptyProcess.kill();
    });
});

const PORT = 5000;
expressWsApp.listen(PORT, () => {
    console.log(`Terminal server running on http://localhost:${PORT}`);
});
