// frontend/src/Terminal.jsx

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
    const terminalRef = useRef(null);
    const socketRef = useRef(null);
    const termRef = useRef(null);

    useEffect(() => {
        const term = new Terminal();
        term.open(terminalRef.current);
        termRef.current = term;

        const socket = new WebSocket('ws://localhost:5000/terminal');
        socketRef.current = socket;

        term.onData(data => socket.send(data));
        socket.onmessage = e => term.write(e.data);

        return () => {
            socket.close();
            term.dispose();
        };
    }, []);

    return <div ref={terminalRef} style={{ height: '500px', width: '100%', backgroundColor: 'black' }}></div>;
};

export default TerminalComponent;
