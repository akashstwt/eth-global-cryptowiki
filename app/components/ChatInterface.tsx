import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Zap, TrendingUp, Shield } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Web3 research assistant. Ask me anything about blockchain projects, protocols, DAOs, or DeFi. I can analyze tokenomics, governance proposals, and provide insights backed by onchain data.',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const exampleQueries = [
    "Analyze Uniswap's tokenomics and governance",
    "What are the latest DAO proposals in the ecosystem?",
    "Compare DeFi protocols by TVL and security",
    "Explain Ethereum's upcoming upgrades"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Based on my analysis of decentralized data sources and onchain metrics, here's what I found about "${inputValue}":\n\n• Data retrieved from The Graph indexers\n• Cross-referenced with Filecoin datasets\n• Verified through ASI agent network\n\nThis is a simulated response. Connect to unlock full Web3 research capabilities with real-time data analysis.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleExampleClick = (query: string) => {
    setInputValue(query);
  };

  return (
    <section id="chat" className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Research Assistant
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ask questions about cryptocurrencies, protocols, and blockchain projects
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="simple-card p-4">
            {/* Messages */}
            <div className="h-80 overflow-y-auto mb-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary' 
                        : 'bg-gradient-to-r from-ai-accent to-secondary'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ai-accent to-secondary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-card border border-glass-border/30 rounded-lg p-4">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Web3 projects, tokenomics, DAOs..."
                className="flex-1 bg-input border-glass-border/30 focus:border-primary/50"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Example Queries */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {exampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(query)}
                    className="text-left text-sm p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-glass-border/20 hover:border-primary/30"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default ChatInterface;