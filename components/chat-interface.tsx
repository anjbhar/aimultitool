'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, AI_MODELS } from '@/app/types';
import ChatMessage from './chat-message';
import ModelSelector from './model-selector';
import ApiKeyInput from './api-key-input';
import { Send, Trash2, Settings, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openrouter_api_key');
    const savedModel = localStorage.getItem('selected_model');
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedModel) setSelectedModel(savedModel);
  }, []);

  // Save API key to localStorage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openrouter_api_key', apiKey);
    }
  }, [apiKey]);

  // Save selected model to localStorage
  useEffect(() => {
    localStorage.setItem('selected_model', selectedModel);
  }, [selectedModel]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !apiKey) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          model: selectedModel,
          apiKey,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantMessage += content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    if (
                      newMessages[newMessages.length - 1]?.role === 'assistant'
                    ) {
                      newMessages[newMessages.length - 1].content =
                        assistantMessage;
                    } else {
                      newMessages.push({
                        role: 'assistant',
                        content: assistantMessage,
                        timestamp: Date.now(),
                      });
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat?')) {
      setMessages([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={24} />
              <h1 className="text-xl font-bold">AI MultiTool</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleClearChat}
                disabled={messages.length === 0}
                variant="ghost"
                size="icon"
                title="Clear chat"
              >
                <Trash2 size={18} />
              </Button>
              <Button
                onClick={() => setShowSettings(!showSettings)}
                variant={showSettings ? 'default' : 'ghost'}
                size="icon"
                title="Settings"
              >
                <Settings size={18} />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <Card className="p-4 space-y-4">
              <ApiKeyInput apiKey={apiKey} onApiKeyChange={setApiKey} />
              <Separator />
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </Card>
          )}

          {!showSettings && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Model:</span>
              <span className="font-medium text-foreground">
                {AI_MODELS.find((m) => m.id === selectedModel)?.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 py-16 text-center">
              <Sparkles className="text-primary mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-2">
                Welcome to AI MultiTool
              </h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Chat with multiple AI models through a unified interface.
                Powered by OpenRouter.
              </p>
              {!apiKey && (
                <Button onClick={() => setShowSettings(true)}>
                  Configure API Key
                </Button>
              )}
            </div>
          ) : (
            <div>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-4 p-6 bg-muted/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                    <Bot size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-2">Assistant</p>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                apiKey
                  ? 'Type your message... (Shift+Enter for new line)'
                  : 'Please configure your API key first'
              }
              disabled={!apiKey || isLoading}
              rows={1}
              className="min-h-[60px] max-h-32 pr-14 resize-none"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading || !apiKey}
              size="icon"
              className="absolute right-2 bottom-2"
            >
              <Send size={18} />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  );
}

