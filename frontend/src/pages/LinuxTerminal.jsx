import React, { useState } from 'react';
import EmbeddedWebsite from '../components/EmbeddedWebsite';

const guideItems = [
  { command: 'cat file.txt', description: 'Display file content' },
  { command: 'cd', description: 'Change directory' },
  { command: 'chmod 400 file.pem', description: 'Change file permissions' },
  { command: 'chown user file.txt', description: 'Change file owner' },
  { command: 'clear', description: 'Clear the terminal screen' },
  { command: 'cp file1 file2', description: 'Copy file1 to file2' },
  { command: 'curl url', description: 'Fetch content from a URL' },
  { command: 'df -h', description: 'Disk usage summary' },
  { command: 'du -sh *', description: 'Size of each item in current directory' },
  { command: 'echo "text" > file.txt', description: 'Write text to a file' },
  { command: 'exit', description: 'Exit the current shell' },
  { command: 'find . -name file.txt', description: 'Find file recursively' },
  { command: 'grep "text" file.txt', description: 'Search for text in a file' },
  { command: 'head file.txt', description: 'Show first 10 lines of a file' },
  { command: 'history', description: 'Show command history' },
  { command: 'htop', description: 'Interactive process viewer' },
  { command: 'ifconfig', description: 'Display network configuration' },
  { command: 'kill PID', description: 'Terminate process with given PID' },
  { command: 'less file.txt', description: 'View file content page by page' },
  { command: 'ln -s target linkname', description: 'Create symbolic link' },
  { command: 'ls', description: 'List files and directories' },
  { command: 'man ls', description: 'Show manual for ls command' },
  { command: 'mkdir newdir', description: 'Create a new directory' },
  { command: 'mv file1 file2', description: 'Rename or move a file' },
  { command: 'nano file.txt', description: 'Open text editor' },
  { command: 'netstat -tuln', description: 'Show open ports and connections' },
  { command: 'ping google.com', description: 'Test internet connectivity' },
  { command: 'ps aux', description: 'Detailed process list' },
  { command: 'pwd', description: 'Print current working directory' },
  { command: 'rm file.txt', description: 'Delete a file' },
  { command: 'rmdir folder', description: 'Remove an empty directory' },
  { command: 'scp file.pem user@host:path', description: 'Copy file to remote server' },
  { command: 'ssh -i file.pem user@host', description: 'SSH into a server with key' },
  { command: 'sudo command', description: 'Run command with elevated permissions' },
  { command: 'tail file.txt', description: 'Show last 10 lines of a file' },
  { command: 'tar -czf archive.tar.gz folder/', description: 'Create compressed archive' },
  { command: 'top', description: 'Show running processes' },
  { command: 'touch file.txt', description: 'Create a new file' },
  { command: 'uname -a', description: 'Show system information' },
  { command: 'uptime', description: 'Show how long the system has been running' },
  { command: 'wget url', description: 'Download file from the web' },
  { command: 'whoami', description: 'Show current user' },
  { command: 'zip archive.zip file.txt', description: 'Compress file to zip' },
];

// Sort alphabetically by command
const sortedGuideItems = guideItems.sort((a, b) =>
  a.command.localeCompare(b.command)
);

const Linuxterminal = () => {
  const [search, setSearch] = useState('');

  const filteredItems = sortedGuideItems.filter(({ command, description }) =>
    `${command} ${description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-400 to-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Linux Terminal Playground
      </h1>

      <div className="flex flex-row w-full gap-4">
        <EmbeddedWebsite />

        {/* Guide Panel */}
        <div className="h-full w-[22rem] p-4 bg-black bg-opacity-70 text-white overflow-y-auto rounded-3xl">
          <h2 className="text-lg font-semibold mb-4 border-b border-white pb-2">
            Terminal Guide
          </h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded-3xl text-purple-200 text-sm placeholder-gray-600 focus:outline-none border-2 border-purple-400 focus:ring-2 focus:ring-purple-400"
          />

          <ul className="space-y-3 text-sm max-h-[70vh] overflow-y-auto pr-2">
            {filteredItems.length > 0 ? (
              filteredItems.map(({ command, description }, idx) => (
                <li key={idx}>
                  <span className="font-bold">{command}</span> – {description}
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No matching commands</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Linuxterminal;
