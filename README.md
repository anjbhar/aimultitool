# AI MultiTool

A modern, unified interface for interacting with multiple AI models through [OpenRouter](https://openrouter.ai). Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui components.

![AI MultiTool](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?style=flat&logo=tailwind-css)

## Features

- 🤖 **Multiple AI Models** - Access GPT-4, Claude, Gemini, Llama, and more through a single interface
- 🎨 **Beautiful UI** - Built with shadcn/ui components and Tailwind CSS
- 💬 **Real-time Streaming** - See AI responses as they're generated
- 🔐 **Secure** - API keys stored locally in your browser
- 🌙 **Dark Mode** - Automatic dark mode support
- 📱 **Responsive** - Works seamlessly on desktop and mobile
- ⚡ **Fast** - Built on Next.js 16 with Edge runtime for optimal performance

## Supported Models

The application supports multiple AI models including:

- **OpenAI**: GPT-4o, GPT-4o Mini
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Haiku
- **Google**: Gemini 2.0 Flash, Gemini Pro 1.5
- **Meta**: Llama 3.3 70B
- **Mistral**: Mistral Large
- **Qwen**: Qwen 2.5 72B
- **DeepSeek**: DeepSeek Chat

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm
- An OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd aimultitool
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

1. Click the **Settings** button (gear icon) in the top right
2. Enter your OpenRouter API key
3. Select your preferred AI model
4. Start chatting!

Your API key is stored securely in your browser's localStorage and never sent to any server except OpenRouter.

## Project Structure

```
aimultitool/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # API route for OpenRouter integration
│   ├── globals.css             # Global styles with Tailwind
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page
│   └── types.ts                # TypeScript types and model definitions
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   └── textarea.tsx
│   ├── api-key-input.tsx       # API key configuration component
│   ├── chat-interface.tsx      # Main chat interface
│   ├── chat-message.tsx        # Individual message component
│   └── model-selector.tsx      # Model selection component
├── lib/
│   └── utils.ts                # Utility functions
└── components.json             # shadcn/ui configuration
```

## Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[OpenRouter API](https://openrouter.ai/)** - Unified AI model access

## API Integration

This project uses the [OpenRouter API](https://openrouter.ai/docs/quickstart) to provide access to multiple AI models through a single, unified interface. OpenRouter handles:

- Model routing and load balancing
- API key management for different providers
- Automatic fallbacks
- Competitive pricing

## Development

### Adding New Models

To add new AI models, edit `app/types.ts` and add entries to the `AI_MODELS` array:

```typescript
{
  id: 'provider/model-name',
  name: 'Display Name',
  description: 'Model description',
  pricing: { prompt: '$X.XX', completion: '$X.XX' },
}
```

### Customizing Styles

The project uses Tailwind CSS with custom theme variables defined in `app/globals.css`. Modify the CSS variables to customize colors and styling.

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aimultitool)

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway
- Render

## Environment Variables

No server-side environment variables are required since API keys are managed client-side. For production deployments where you want to provide API keys server-side, you can add:

```env
OPENROUTER_API_KEY=sk-or-v1-...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- [OpenRouter](https://openrouter.ai/) for providing unified AI model access
- [shadcn](https://twitter.com/shadcn) for the amazing component library
- [Vercel](https://vercel.com) for Next.js and hosting

## Support

For issues and questions:
- OpenRouter API: [OpenRouter Docs](https://openrouter.ai/docs)
- Create an issue in this repository

---

Built with ❤️ using Next.js and OpenRouter
