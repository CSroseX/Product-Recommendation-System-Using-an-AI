import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export default function RecommendationPanel({ recommendation, productCount }) {
  if (!recommendation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-4xl mx-auto mb-8"
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {recommendation.explanation}
              </p>
            </div>
            
            {recommendation.top_picks && recommendation.top_picks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Top Picks for You:
                </h4>
                <div className="space-y-2">
                  {recommendation.top_picks.map((pick, idx) => (
                    <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-700">
                      {pick}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {productCount === 0 && (
              <Alert className="bg-white/70 border-amber-200">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  No products match your exact criteria, but here are some similar options you might like.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
