import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, TrendingUp, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';
import { generateClientInsights, generateBusinessInsights, type ClientInsight } from '@/services/openai';

interface AIInsightsProps {
  clientData?: {
    name: string;
    company: string;
    email?: string;
    industry?: string;
    previousProjects?: any[];
    totalRevenue?: number;
  };
  businessData?: {
    totalRevenue: number;
    totalCustomers: number;
    recentGrowth: number;
    topClients: string[];
  };
  type: 'client' | 'business';
}

export function AIInsights({ clientData, businessData, type }: AIInsightsProps) {
  const [insights, setInsights] = useState<ClientInsight | null>(null);
  const [businessInsights, setBusinessInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      if (type === 'client' && clientData) {
        const result = await generateClientInsights(clientData);
        setInsights(result);
      } else if (type === 'business' && businessData) {
        const result = await generateBusinessInsights(businessData);
        setBusinessInsights(result);
      }
    } catch (err) {
      setError('Failed to generate AI insights. Please check your OpenAI API key.');
      console.error('AI Insights Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((type === 'client' && clientData) || (type === 'business' && businessData)) {
      generateInsights();
    }
  }, [clientData, businessData, type]);

  if (type === 'client') {
    return (
      <Card className="bg-white border-0 shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-xl font-bold text-gray-900">AI Client Insights</CardTitle>
            </div>
            <Button
              onClick={generateInsights}
              disabled={loading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {loading ? 'Analyzing...' : 'Refresh Insights'}
            </Button>
          </div>
          <CardDescription className="text-gray-600">
            AI-powered analysis of client potential and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Generating insights...</span>
            </div>
          )}

          {insights && !loading && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Client Summary
                </h4>
                <p className="text-sm text-blue-700">{insights.summary}</p>
              </div>

              {/* Opportunities */}
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Opportunities
                </h4>
                <div className="space-y-2">
                  {insights.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-green-700">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Potential Risks
                </h4>
                <div className="space-y-2">
                  {insights.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-orange-700">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Recommendations
                </h4>
                <div className="space-y-2">
                  {insights.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-purple-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Business insights view
  return (
    <Card className="bg-white border-0 shadow-lg rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-xl font-bold text-gray-900">AI Business Insights</CardTitle>
          </div>
          <Button
            onClick={generateInsights}
            disabled={loading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? 'Analyzing...' : 'Refresh Insights'}
          </Button>
        </div>
        <CardDescription className="text-gray-600">
          AI-powered business analysis and strategic recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Generating insights...</span>
          </div>
        )}

        {businessInsights.length > 0 && !loading && (
          <div className="space-y-3">
            {businessInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
              >
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-gray-700 flex-1">{insight}</p>
                  <Lightbulb className="h-4 w-4 text-purple-600 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
