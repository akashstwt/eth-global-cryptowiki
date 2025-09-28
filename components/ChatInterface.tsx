"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Maximize, Minimize } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your CryptoWiki AI assistant. Ask me anything about cryptocurrencies, blockchain projects, or Web3 protocols!',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const sendMessageToGemini = async (message: string, useStructuredPrompt: boolean = true): Promise<string> => {
    try {
      const apiKey = "AIzaSyAlxEUr-CvEbRA5S9jC6RQrczL5_MLFBMU";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const promptText = useStructuredPrompt 
        ? `You are CryptoWiki AI, a comprehensive cryptocurrency and blockchain research assistant. When users ask about cryptocurrencies, blockchain projects, exchanges, or Web3 protocols, provide detailed, structured responses in the following format:

# [Project/Token Name] Overview
Brief description of what the project/exchange/protocol is and its main purpose.

## Key Services & Ecosystem
• **Service 1**: Description
• **Service 2**: Description
• **Service 3**: Description
• **Service 4**: Description

## [Token Symbol] Token Metrics (if applicable)
| Metric | Value |
|--------|--------|
| Price | $X.XX |
| Market Cap | $X.XXB |
| 24h Volume | $X.XXB |
| 24h Change | +X.XX% |
| 7d Change | -X.XX% |
| Circulating Supply | XXX.XXM [TOKEN] |

## Recent Developments
**Current Trending**: [Latest news, updates, partnerships, or developments]

## Leadership Team (if known)
• **Name**: Position
• **Name**: Position
• **Name**: Position

## Funding & Scale (if applicable)
• **Total Funding**: Amount and details
• **Social Reach**: Follower counts
• **Global Operations**: Geographic presence and subsidiaries

## Related Questions
• How does [project] compare to [competitor]?
• What are the benefits of [specific feature]?
• How does [tokenomics feature] work?

Provide accurate, up-to-date information with real data when possible. If asking about general blockchain concepts, provide educational explanations in a structured format.

User question: ${message}`
        : `You are CryptoWiki AI, a helpful cryptocurrency and blockchain assistant. Provide clear, accurate answers about crypto topics. User question: ${message}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: promptText
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'Sorry, I\'m having trouble connecting to the AI service right now. Please try again later.';
    }
  };

  const handleSendMessage = async (message?: string, useStructuredPrompt: boolean = true) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: 'user',
      timestamp: new Date()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    if (!message) setInputValue(''); // Only clear input if it was typed by user
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await sendMessageToGemini(messageToSend, useStructuredPrompt);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, something went wrong. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to HTML-like JSX structure
    const lines = content.split('\n');
    const formattedContent = [];
    let inTable = false;
    const relatedQuestions: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Headers
      if (line.startsWith('# ')) {
        formattedContent.push(<h2 key={i} className="text-xl font-bold text-white mb-4 mt-6">{line.substring(2)}</h2>);
      } else if (line.startsWith('## ')) {
        formattedContent.push(<h3 key={i} className="text-lg font-semibold text-white mb-3 mt-4">{line.substring(3)}</h3>);
      } 
      // Table detection
      else if (line.includes('|') && line.includes('Metric')) {
        inTable = true;
        // Skip header and separator rows, start processing data rows
        continue;
      } else if (inTable && line.includes('|') && line.trim() !== '') {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
        if (cells.length >= 2) {
          formattedContent.push(
            <div key={i} className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-300">{cells[0]}</span>
              <span className="text-white font-medium">{cells[1]}</span>
            </div>
          );
        }
      } else if (inTable && line.trim() === '') {
        inTable = false;
      }
      // Bullet points - check if it's under Related Questions section
      else if (line.startsWith('• ')) {
        const bulletContent = line.substring(2);
        
        // Check if this is a related question by looking at previous lines
        const isRelatedQuestion = i > 0 && lines.slice(Math.max(0, i - 5), i).some(prevLine => 
          prevLine.includes('Related Questions')
        );
        
        if (isRelatedQuestion && bulletContent.includes('?')) {
          relatedQuestions.push(bulletContent);
          formattedContent.push(
            <button
              key={i}
              onClick={() => handleSendMessage(bulletContent, false)}
              className="flex items-start mb-3 p-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 w-full text-left group"
            >
              <span className="text-blue-400 mr-3 group-hover:text-blue-300 font-semibold">•</span>
              <span className="text-blue-100 group-hover:text-white font-medium">{bulletContent}</span>
            </button>
          );
        } else {
          formattedContent.push(
            <div key={i} className="flex items-start mb-2">
              <span className="text-blue-400 mr-3">•</span>
              <span className="text-gray-300">{bulletContent}</span>
            </div>
          );
        }
      }
      // Bold text patterns
      else if (line.includes('**') && line.trim() !== '') {
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
        formattedContent.push(<p key={i} className="text-gray-300 mb-3" dangerouslySetInnerHTML={{ __html: formatted }} />);
      }
      // Regular paragraphs
      else if (line.trim() !== '' && !inTable) {
        formattedContent.push(<p key={i} className="text-gray-300 mb-3">{line}</p>);
      }
    }
    
    return <div className="space-y-3">{formattedContent}</div>;
  };

  return (
    <section 
      id="chat-interface" 
      className={`py-5 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-black' 
          : 'min-h-screen bg-black'
      }`}
    >
      <div className={`mx-auto ${isFullscreen ? 'max-w-7xl h-full flex flex-col' : 'max-w-5xl'}`}>
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h2 className="text-3xl font-bold text-white mb-4">
            Chat with CryptoWiki AI
          </h2>
          <p className="text-gray-400">
            Get instant insights about cryptocurrencies, blockchain projects, and Web3 protocols
          </p>
          
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors bg-gray-800/50 rounded-lg hover:bg-gray-700/50"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Chat Container */}
        <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden ${
          isFullscreen ? 'flex-1 flex flex-col' : ''
        }`}>
          {/* Messages Area */}
          <div className={`overflow-y-auto p-6 space-y-10 ${
            isFullscreen ? 'flex-1' : 'h-96'
          }`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-blue-600'
                      : 'bg-gradient-to-br from-purple-500 to-blue-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-3xl ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      formatMessage(message.content)
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-gray-400 text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about crypto, blockchain, or Web3..."
                  className="w-full resize-none bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 max-h-32"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
