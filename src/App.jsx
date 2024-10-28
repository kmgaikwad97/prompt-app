import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [chatId, setChatId] = useState('');

  const baseUrl= import.meta.env.VITE_API_URL
  const getPrompt = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/giveprompt`, {
        email,userMessage,
      });
      
      setAiResponse(response.data.aiResponse);
      setChatId(response.data.chatId);

      console.log('Prompt generated: ' + response.data.aiResponse);
    } catch (error) {
      console.error('Error fetching prompt:', error);
      alert('Failed to generate prompt');
    }
  };

  const sendEmail = async () => {
    try {
      if (!email || !chatId) {
        alert('Please enter a valid email and generate a prompt first');
        return;
      }

      const response = await axios.post(`${baseUrl}/api/v1/send-email`, {
        email,
        chatId,
      });

      alert('Email sent successfully to ' + response.data.email);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  // Determine style based on AI response length
  const isLongResponse = aiResponse.length > 100; // Adjust threshold as needed

  return (
    <div className="container">
      <h1>PROMPT APP</h1>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your message"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <button onClick={getPrompt}>Get Prompt</button>
      <button onClick={sendEmail}>Send Email</button>

      {aiResponse && (
        <div className={`generated-prompt ${isLongResponse ? 'long' : 'short'}`}>
          <h2>Generated Prompt:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;