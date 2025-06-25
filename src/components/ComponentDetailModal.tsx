
import React from 'react';
import { Copy, Code, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Component } from '@/types/component';
import { CategoryIcon } from './CategoryIcon';

interface ComponentDetailModalProps {
  component: Component | null;
  isOpen: boolean;
  onClose: () => void;
  selectedSubPage: string;
  setSelectedSubPage: (page: string) => void;
  onCopyCode: (code: string) => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  isOpen,
  onClose,
  selectedSubPage,
  setSelectedSubPage,
  onCopyCode
}) => {
  if (!component) return null;

  const getCurrentCode = () => {
    if (component.subPages && selectedSubPage) {
      const subPage = component.subPages.find(page => page.name === selectedSubPage);
      return subPage?.code || component.code;
    }
    return component.code;
  };

  const getCurrentPreview = () => {
    if (component.subPages && selectedSubPage) {
      const subPage = component.subPages.find(page => page.name === selectedSubPage);
      return subPage?.previewComponent || component.previewComponent;
    }
    return component.previewComponent;
  };

  const getCurrentFilePath = () => {
    if (component.subPages && selectedSubPage) {
      const subPage = component.subPages.find(page => page.name === selectedSubPage);
      return subPage?.filePath || component.filePath;
    }
    return component.filePath;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-gray-900 border-gray-800 text-white overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CategoryIcon category={component.category} />
              <span className="text-xl">{component.name}</span>
              <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                v{component.version}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {component.subPages && (
                <Select value={selectedSubPage} onValueChange={setSelectedSubPage}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                    <SelectValue />
                    <ChevronDown className="w-4 h-4" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {component.subPages.map(page => (
                      <SelectItem key={page.name} value={page.name} className="text-white hover:bg-gray-700">
                        {page.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              <Button
                onClick={() => onCopyCode(getCurrentCode())}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 overflow-hidden">
          {/* Preview Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Preview</h3>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              {getCurrentPreview() ? (
                React.createElement(getCurrentPreview()!)
              ) : (
                <div className="text-gray-500 text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No visual preview available</p>
                  <p className="text-sm">This is a logic component</p>
                </div>
              )}
            </div>
            
            {/* Metadata */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">File Path</h4>
                <p className="text-sm text-blue-300 font-mono bg-gray-800 px-2 py-1 rounded">
                  {getCurrentFilePath()}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Description</h4>
                <p className="text-sm text-gray-300">{component.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {component.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-block bg-gray-800 border border-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Code Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Source Code</h3>
            <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden">
              <pre className="p-4 text-sm text-gray-300 overflow-auto max-h-[500px] whitespace-pre-wrap">
                <code>{getCurrentCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
