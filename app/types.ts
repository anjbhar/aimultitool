export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

export const AI_MODELS: AIModel[] = [
  // OpenAI Models
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    description: 'Most advanced OpenAI model with vision and multimodal',
    pricing: { prompt: '$2.50', completion: '$10.00' },
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Affordable and intelligent small model',
    pricing: { prompt: '$0.15', completion: '$0.60' },
  },
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Latest GPT-4 with 128k context',
    pricing: { prompt: '$10.00', completion: '$30.00' },
  },
  {
    id: 'openai/o1-preview',
    name: 'OpenAI o1 Preview',
    description: 'Advanced reasoning model for complex tasks',
    pricing: { prompt: '$15.00', completion: '$60.00' },
  },
  {
    id: 'openai/o1-mini',
    name: 'OpenAI o1 Mini',
    description: 'Faster reasoning model, cost-effective',
    pricing: { prompt: '$3.00', completion: '$12.00' },
  },

  // Anthropic Claude Models
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: 'Best combination of intelligence and speed',
    pricing: { prompt: '$3.00', completion: '$15.00' },
  },
  {
    id: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Most powerful Claude model for complex tasks',
    pricing: { prompt: '$15.00', completion: '$75.00' },
  },
  {
    id: 'anthropic/claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance and speed',
    pricing: { prompt: '$3.00', completion: '$15.00' },
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    description: 'Fastest and most compact Claude model',
    pricing: { prompt: '$0.25', completion: '$1.25' },
  },

  // Google Gemini Models
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash (Free)',
    description: 'Latest Gemini with multimodal - Free tier',
    pricing: { prompt: 'Free', completion: 'Free' },
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    description: 'Google\'s advanced model with 1M context',
    pricing: { prompt: '$1.25', completion: '$5.00' },
  },
  {
    id: 'google/gemini-flash-1.5',
    name: 'Gemini Flash 1.5',
    description: 'Fast and efficient multimodal model',
    pricing: { prompt: '$0.075', completion: '$0.30' },
  },

  // Meta Llama Models
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    description: 'Latest open-source model with strong reasoning',
    pricing: { prompt: '$0.59', completion: '$0.79' },
  },
  {
    id: 'meta-llama/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B',
    description: 'Largest open-source model available',
    pricing: { prompt: '$2.70', completion: '$2.70' },
  },
  {
    id: 'meta-llama/llama-3.1-70b-instruct',
    name: 'Llama 3.1 70B',
    description: 'Powerful open-source 70B parameter model',
    pricing: { prompt: '$0.52', completion: '$0.75' },
  },

  // Mistral Models
  {
    id: 'mistralai/mistral-large',
    name: 'Mistral Large',
    description: 'Top-tier reasoning and coding capabilities',
    pricing: { prompt: '$2.00', completion: '$6.00' },
  },
  {
    id: 'mistralai/mistral-medium',
    name: 'Mistral Medium',
    description: 'Balanced performance and cost',
    pricing: { prompt: '$2.70', completion: '$8.10' },
  },
  {
    id: 'mistralai/mistral-small',
    name: 'Mistral Small',
    description: 'Cost-effective for most tasks',
    pricing: { prompt: '$0.20', completion: '$0.60' },
  },

  // DeepSeek Models
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek Chat',
    description: 'Strong coding abilities, very cost-effective',
    pricing: { prompt: '$0.14', completion: '$0.28' },
  },
  {
    id: 'deepseek/deepseek-coder',
    name: 'DeepSeek Coder',
    description: 'Specialized for coding tasks',
    pricing: { prompt: '$0.14', completion: '$0.28' },
  },

  // Qwen Models
  {
    id: 'qwen/qwen-2.5-72b-instruct',
    name: 'Qwen 2.5 72B',
    description: 'Strong performance across diverse tasks',
    pricing: { prompt: '$0.35', completion: '$0.40' },
  },
  {
    id: 'qwen/qwen-2.5-coder-32b-instruct',
    name: 'Qwen 2.5 Coder 32B',
    description: 'Specialized coding model',
    pricing: { prompt: '$0.14', completion: '$0.14' },
  },

  // X.AI Grok
  {
    id: 'x-ai/grok-beta',
    name: 'Grok Beta',
    description: 'X.AI\'s conversational AI with real-time data',
    pricing: { prompt: '$5.00', completion: '$15.00' },
  },

  // Perplexity Models
  {
    id: 'perplexity/llama-3.1-sonar-large-128k-online',
    name: 'Perplexity Sonar Large',
    description: 'Search-augmented model with online access',
    pricing: { prompt: '$1.00', completion: '$1.00' },
  },

  // Cohere Models
  {
    id: 'cohere/command-r-plus',
    name: 'Command R+',
    description: 'Enterprise-grade with RAG capabilities',
    pricing: { prompt: '$2.50', completion: '$10.00' },
  },
];

