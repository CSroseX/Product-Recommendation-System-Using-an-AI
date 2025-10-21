import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, ShoppingCart, Package } from 'lucide-react';
import { Button } from '../ui/button';

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
          <img
            src={product.image_url || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.stock < 5 && (
              <Badge className="bg-red-500 text-white">Low Stock</Badge>
            )}
            {product.rating && (
              <Badge className="bg-white/90 text-gray-900 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {product.rating}
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          
          {product.specifications && (
            <div className="space-y-1 text-xs text-gray-500">
              {product.specifications.processor && (
                <p>• {product.specifications.processor}</p>
              )}
              {product.specifications.ram && (
                <p>• {product.specifications.ram} RAM</p>
              )}
              {product.specifications.storage && (
                <p>• {product.specifications.storage} Storage</p>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </p>
              {product.stock > 0 && (
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Package className="w-3 h-3" />
                  {product.stock} in stock
                </p>
              )}
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
