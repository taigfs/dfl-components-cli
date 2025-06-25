
import React from 'react';
import { Eye, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Component } from '@/types/component';
import { CategoryIcon } from './CategoryIcon';

interface ComponentCardProps {
  component: Component;
  isSelected: boolean;
  onSelect: (componentId: string) => void;
  onOpen: (component: Component) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isSelected,
  onSelect,
  onOpen
}) => {
  return (
    <Card 
      className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-200 group hover:shadow-lg hover:shadow-blue-500/10 relative"
    >
      <div className="absolute top-3 right-3 z-10">
        <div
          className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${
            isSelected
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-600 hover:border-blue-500'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(component.id);
          }}
        >
          {isSelected && (
            <Check className="w-3 h-3 text-white" />
          )}
        </div>
      </div>
      
      <div className="p-5 cursor-pointer" onClick={() => onOpen(component)}>
        <div className="flex items-start justify-between mb-3 pr-8">
          <div className="flex items-center space-x-2">
            <CategoryIcon category={component.category} />
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {component.name}
            </h3>
          </div>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            v{component.version}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {component.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {component.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {component.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{component.tags.length - 3}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-1 rounded">
            {component.category}
          </span>
          <Eye className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
        </div>
      </div>
    </Card>
  );
};
