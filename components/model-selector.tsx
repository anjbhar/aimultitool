'use client';

import { AI_MODELS } from '@/app/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function ModelSelector({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  const currentModel = AI_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="space-y-2">
      <Label htmlFor="model-select">AI Model</Label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger id="model-select" className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {AI_MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {model.pricing?.prompt}/M tokens
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentModel && (
        <p className="text-xs text-muted-foreground">
          {currentModel.description}
        </p>
      )}
    </div>
  );
}

