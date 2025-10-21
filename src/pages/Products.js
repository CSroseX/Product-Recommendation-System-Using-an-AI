import React, { useState } from 'react';
import { listProducts, invokeLLM } from '../api/localClient';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Package, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

import SearchBar from '../components/products/SearchBar';
import ProductCard from '../components/products/ProductCard';
import RecommendationPanel from '../components/products/RecommendationPanel';

export default function Products() {
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => listProducts('-rating'),
  });

  const handleSearch = async (query) => {
    setIsSearching(true);
    setRecommendation(null);
    
    try {
      const productsForAI = allProducts.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        category: p.category,
        description: p.description,
        specifications: p.specifications,
        rating: p.rating
      }));

  const result = await invokeLLM({
        prompt: `You are an expert product recommendation assistant. A customer is looking for products with the following request:\n\n"${query}"\n\nHere is the complete product catalog:\n${JSON.stringify(productsForAI, null, 2)}\n\nAnalyze the customer's needs and recommend the most suitable products. Return a JSON response with:\n1. "recommended_product_ids": array of product IDs that best match (order by relevance)\n2. "explanation": friendly explanation of why these products are recommended (2-3 sentences)\n3. "top_picks": array of 2-3 brief reasons why each top product is great for their needs\n\nBe helpful and specific. If no products perfectly match, recommend the closest alternatives.`,
        response_json_schema: {
          type: 'object',
          properties: {
            recommended_product_ids: { type: 'array', items: { type: 'string' } },
            explanation: { type: 'string' },
            top_picks: { type: 'array', items: { type: 'string' } },
          },
        },
      });

      setRecommendation(result);

      if (result.recommended_product_ids && result.recommended_product_ids.length > 0) {
        const recommended = allProducts.filter(p => 
          result.recommended_product_ids.includes(p.id)
        );
        const sortedByRelevance = result.recommended_product_ids
          .map(id => recommended.find(p => p.id === id))
          .filter(Boolean);
        
        setFilteredProducts(sortedByRelevance);
      } else {
        setFilteredProducts([]);
      }
      
      setActiveCategory('all');
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
    
    setIsSearching(false);
  };

  const displayProducts = filteredProducts.length > 0 
    ? filteredProducts 
    : allProducts;

  const categorizedProducts = activeCategory === 'all'
    ? displayProducts
    : displayProducts.filter(p => p.category === activeCategory);

  const categories = ['all', ...new Set(allProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Find Your Perfect Product
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-12 font-light">
              Powered by AI • Just describe what you need, and we'll find it for you
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />
      </div>

      {/* Recommendation Panel */}
      {recommendation && (
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <RecommendationPanel 
            recommendation={recommendation} 
            productCount={filteredProducts.length}
          />
        </div>
      )}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProducts.length > 0 ? 'Recommended Products' : 'All Products'}
            </h2>
            <span className="text-gray-500">
              ({categorizedProducts.length})
            </span>
          </div>
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-white shadow-md">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16"
          >
            <AnimatePresence>
              {categorizedProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {categorizedProducts.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
