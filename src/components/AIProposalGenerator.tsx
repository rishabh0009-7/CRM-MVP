import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { generateProposalSuggestions, type ProposalSuggestion } from '@/services/openai';

interface AIProposalGeneratorProps {
  clientData?: {
    name: string;
    company: string;
    industry?: string;
    budget?: number;
    requirements?: string;
  };
  onProposalSelect?: (proposal: ProposalSuggestion) => void;
}

export function AIProposalGenerator({ clientData, onProposalSelect }: AIProposalGeneratorProps) {
  const [proposals, setProposals] = useState<ProposalSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customRequirements, setCustomRequirements] = useState('');
  const [customBudget, setCustomBudget] = useState('');

  const generateProposals = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = {
        name: clientData?.name || 'Potential Client',
        company: clientData?.company || 'Company',
        industry: clientData?.industry,
        budget: customBudget ? parseInt(customBudget) : clientData?.budget,
        requirements: customRequirements || clientData?.requirements
      };

      const result = await generateProposalSuggestions(data);
      setProposals(result);
    } catch (err) {
      setError('Failed to generate proposals. Please check your OpenAI API key.');
      console.error('Proposal Generation Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white border-0 shadow-lg rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl font-bold text-gray-900">AI Proposal Generator</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          Generate tailored proposal suggestions using AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Input Section */}
        <div className="space-y-4 mb-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Budget Range (Optional)
              </label>
              <Input
                placeholder="e.g., 10000"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                type="number"
                className="border-gray-300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Client Info
              </label>
              <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                {clientData ? `${clientData.name} - ${clientData.company}` : 'No client selected'}
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Requirements & Context
            </label>
            <Textarea
              placeholder="Describe the client's needs, project requirements, or any specific context..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              className="border-gray-300 min-h-[80px]"
            />
          </div>

          <Button
            onClick={generateProposals}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Proposals...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate AI Proposals
              </>
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Proposals Display */}
        {proposals.length > 0 && !loading && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Proposals</h3>
            {proposals.map((proposal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border border-gray-200 hover:border-blue-300 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-900 mb-2">
                          {proposal.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {proposal.description}
                        </CardDescription>
                      </div>
                      {onProposalSelect && (
                        <Button
                          onClick={() => onProposalSelect(proposal)}
                          variant="outline"
                          size="sm"
                          className="ml-4"
                        >
                          Use This
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Proposal Details */}
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Estimated Value:
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          ${proposal.estimatedValue.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Timeline:
                        </span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {proposal.timeline}
                        </Badge>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Key Deliverables
                      </h4>
                      <div className="space-y-1">
                        {proposal.keyPoints.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">AI is crafting personalized proposals...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
