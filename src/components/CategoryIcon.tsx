
import React from 'react';
import { Layout, Zap, Users, Code } from 'lucide-react';
import { Component } from '@/types/component';

interface CategoryIconProps {
  category: Component['category'];
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const icons = {
    UI: Layout,
    Hooks: Zap,
    Providers: Users,
    Pages: Code
  };
  const Icon = icons[category];
  return <Icon className="w-4 h-4" />;
};
