import React, { useState } from 'react';
import AIPalette from './AIPalette'; // Import AIPalette

const ChatWithAI = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [aiPrompt, setAiPrompt] = useState(''); // To store the AI-generated prompt

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;  // Don't send empty messages

        const userMessage = { sender: 'user', text: message };
        setConversation([...conversation, userMessage]);
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAR-CYUMVkUoWiV3ld6yx6iOVE8nKMLXQo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: message }] }], // Send user message to AI model
                }),
            });

            const data = await response.json();
            const aiMessage = {
                sender: 'AI',
                text: data.candidates[0].content.parts[0].text,
            };

            setAiPrompt(aiMessage.text); // Save AI-generated text as prompt
            setConversation([...conversation, userMessage, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            setConversation([...conversation, { sender: 'AI', text: 'Sorry, something went wrong. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg flex flex-col gap-4">
            <div className="flex flex-col space-y-4 overflow-y-auto max-h-[400px] p-4 bg-gray-50 rounded-lg">
                {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} space-x-2`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
                {loading && <p className="text-center italic text-gray-600">AI is thinking...</p>}
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Ask something..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    Send
                </button>
            </div>

            {/* Pass the AI-generated prompt to AIPalette */}
            {aiPrompt && <AIPalette onApply={(colors) => console.log('Generated Colors:', colors)} prompt={aiPrompt} />}
        </div>
    );
};

export default ChatWithAI;
