import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you're looking for... (e.g., 'I need a powerful laptop under $1000 for video editing')"
            className="min-h-[120px] text-lg bg-white/80 backdrop-blur-sm border-2 border-indigo-100 focus:border-indigo-400 rounded-2xl pr-32 resize-none shadow-lg transition-all duration-300"
            disabled={isLoading}
          />
          <div className="absolute bottom-4 right-4">
            <Button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-8 py-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find Products
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
