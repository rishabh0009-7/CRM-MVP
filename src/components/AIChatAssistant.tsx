import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  X,
  Loader2,
  Sparkles 
} from 'lucide-react';
import { chatWithAI } from '@/services/openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  clientData?: any;
  businessData?: any;
}

export function AIChatAssistant({ clientData, businessData }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI CRM assistant. I can help you with client insights, business strategy, proposal suggestions, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Only include context if it's specifically relevant to the question
      const context = inputMessage.toLowerCase().includes('client') || 
                     inputMessage.toLowerCase().includes('business') || 
                     inputMessage.toLowerCase().includes('revenue') ||
                     inputMessage.toLowerCase().includes('analyze') ? {
        clientData,
        businessData
      } : undefined;

      const aiResponse = await chatWithAI(inputMessage, context);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please check your OpenRouter API configuration and try again.',
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
      sendMessage();
    }
  };

  const quickActions = [
    'Analyze my top clients',
    'Suggest proposal ideas',
    'Generate follow-up email',
    'Business growth insights'
  ];

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`fixed bottom-6 right-6 z-50 ${
        isMinimized ? 'w-80' : 'w-96'
      } ${isMinimized ? 'h-16' : 'h-[500px]'}`}
    >
      <Card className="h-full bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs opacity-90">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col h-full"
            >
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <Bot className="h-3 w-3" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-3 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Bot className="h-3 w-3" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin text-purple-600" />
                          <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-1">
                    {quickActions.map((action, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 text-xs"
                        onClick={() => handleQuickAction(action)}
                      >
                        <Sparkles className="h-2 w-2 mr-1" />
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your CRM..."
                    className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    size="icon"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
