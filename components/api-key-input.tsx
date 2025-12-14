'use client';

import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export default function ApiKeyInput({
  apiKey,
  onApiKeyChange,
}: ApiKeyInputProps) {
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (apiKey.length === 0) {
      setIsValid(null);
    } else if (apiKey.startsWith('sk-or-v1-')) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [apiKey]);

  return (
    <div className="space-y-2">
      <Label htmlFor="api-key" className="flex items-center gap-2">
        <Key size={16} />
        OpenRouter API Key
      </Label>
      <div className="relative">
        <Input
          id="api-key"
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="sk-or-v1-..."
          className="pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isValid !== null && (
            <>
              {isValid ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-red-600" />
              )}
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Get your API key from{' '}
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          openrouter.ai/keys
        </a>
        . Stored locally in your browser.
      </p>
    </div>
  );
}

