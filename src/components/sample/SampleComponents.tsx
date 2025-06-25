
import React from 'react';

export const SampleButton = () => (
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
    Sample Button
  </button>
);

export const SampleCard = () => (
  <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
    <h3 className="text-white font-medium mb-2">Sample Card</h3>
    <p className="text-gray-400 text-sm">This is a sample card component with dark styling.</p>
  </div>
);

export const SampleInput = () => (
  <input 
    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400"
    placeholder="Sample input field..."
  />
);
