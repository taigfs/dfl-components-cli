
import React from 'react';
import { Search, Filter, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ComponentHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  selectedComponents: Set<string>;
  onBulkCopy: () => void;
}

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedComponents,
  onBulkCopy
}) => {
  return (
    <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DevFellowship Component Hub
            </h1>
            <p className="text-gray-400 text-sm mt-1">Browse, preview, and copy internal components</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {selectedComponents.size > 0 && (
              <div className="flex items-center space-x-2 bg-blue-900/30 border border-blue-700 rounded-lg px-3 py-2">
                <span className="text-blue-300 text-sm font-medium">
                  {selectedComponents.size} selected
                </span>
                <Button
                  onClick={onBulkCopy}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 h-7"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            )}
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                    {category === 'all' ? 'All' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
