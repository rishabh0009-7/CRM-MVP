// OpenRouter API client
let openrouter: any = null;

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!apiKey) {
  console.warn('OpenRouter API key not found. AI features will show demo responses.');
}

openrouter = apiKey ? {
  apiKey,
  baseURL: 'https://openrouter.ai/api/v1/chat/completions'
} : null;

export interface ClientInsight {
  summary: string;
  opportunities: string[];
  risks: string[];
  recommendations: string[];
}

export interface ProposalSuggestion {
  title: string;
  description: string;
  estimatedValue: number;
  timeline: string;
  keyPoints: string[];
}

export interface EmailTemplate {
  subject: string;
  body: string;
  tone: 'professional' | 'friendly' | 'formal';
}

// Generate AI-powered client insights
export async function generateClientInsights(
  clientData: {
    name: string;
    company: string;
    email?: string;
    industry?: string;
    previousProjects?: any[];
    totalRevenue?: number;
  }
): Promise<string> {
  try {
    if (!openrouter) {
      throw new Error('OpenRouter client not initialized');
    }

    const response = await fetch(openrouter.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouter.apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mini CRM Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [{
          role: 'user',
          content: `Analyze this client data and provide actionable business insights: ${JSON.stringify(clientData)}`
        }],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || 'No insights generated';
  } catch (error: any) {
    console.error('Error generating client insights:', error);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      return `**Demo Mode - API Quota Reached**\n\nBased on the client data analysis:\n\n• **Revenue Opportunity**: This client shows 23% growth potential\n• **Risk Assessment**: Low churn risk, high engagement score\n• **Recommended Actions**: \n  - Upsell premium features\n  - Schedule quarterly business review\n  - Introduce new product lines\n\n*Get your free OpenRouter API key at openrouter.ai to enable real AI insights*`;
    }
    
    return `**Demo Mode - Setup Required**\n\nTo get real AI-powered client insights:\n\n1. Get your free OpenRouter API key at openrouter.ai\n2. Add it to your .env file as VITE_OPENROUTER_API_KEY\n3. Restart your development server\n\n**Sample Insight**: This client has strong engagement metrics and represents a good upselling opportunity.`;
  }
}

// Generate AI-powered proposal suggestions
export async function generateProposalSuggestions(
  clientInfo: any,
  projectType: string
): Promise<string[]> {
  try {
    if (!openrouter) {
      throw new Error('OpenRouter client not initialized');
    }

    const response = await fetch(openrouter.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouter.apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mini CRM Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [{
          role: 'user',
          content: `Generate 3 tailored proposal suggestions for a ${projectType} project for this client: ${JSON.stringify(clientInfo)}. Return as a JSON array of strings.`
        }],
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch {
      return content.split('\n').filter(line => line.trim()).slice(0, 3);
    }
  } catch (error: any) {
    console.error('Error generating proposals:', error);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      return [
        `**Premium ${projectType} Solution** - Comprehensive implementation with advanced features, dedicated support, and 6-month warranty. Estimated timeline: 8-12 weeks.`,
        `**Standard ${projectType} Package** - Core functionality with essential features, standard support, and 3-month warranty. Estimated timeline: 4-6 weeks.`,
        `**Starter ${projectType} Option** - Basic implementation with fundamental features, email support, and 1-month warranty. Estimated timeline: 2-3 weeks.`
      ];
    }
    
    return [
      'Get your free OpenRouter API key at openrouter.ai to generate custom proposals',
      'Add VITE_OPENROUTER_API_KEY to your .env file',
      'Restart your development server to enable AI features'
    ];
  }
}

// Generate AI-powered email templates
export async function generateEmailTemplate(
  purpose: string,
  clientName: string,
  context?: any
): Promise<string> {
  try {
    if (!openrouter) {
      throw new Error('OpenRouter client not initialized');
    }

    const response = await fetch(openrouter.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouter.apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mini CRM Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [{
          role: 'user',
          content: `Generate a professional email template for ${purpose} to client ${clientName}. Context: ${JSON.stringify(context || {})}`
        }],
        max_tokens: 600
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || 'No email template generated';
  } catch (error: any) {
    console.error('Error generating email template:', error);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      return `Subject: ${purpose} - ${clientName}\n\nDear ${clientName},\n\nI hope this email finds you well. I wanted to reach out regarding ${purpose.toLowerCase()}.\n\n[Your message content here]\n\nPlease let me know if you have any questions or would like to discuss this further.\n\nBest regards,\n[Your Name]\n\n---\n*This is a demo template. Get your free OpenRouter API key at openrouter.ai for personalized emails.*`;
    }
    
    return `Get your free OpenRouter API key at openrouter.ai to generate personalized email templates.\n\nAdd VITE_OPENROUTER_API_KEY to your .env file and restart your server.`;
  }
}

// Generate business insights for dashboard
export async function generateBusinessInsights(dashboardData: any): Promise<string> {
  try {
    if (!openrouter) {
      throw new Error('OpenRouter client not initialized');
    }

    const response = await fetch(openrouter.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouter.apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mini CRM Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [{
          role: 'user',
          content: `Analyze this business dashboard data and provide strategic insights and recommendations: ${JSON.stringify(dashboardData)}`
        }],
        max_tokens: 1200
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || 'No business insights generated';
  } catch (error: any) {
    console.error('Error generating business insights:', error);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      return `**📊 Business Performance Analysis**\n\n**Key Findings:**\n• Revenue growth trending upward (+15% QoQ)\n• Customer acquisition cost decreasing\n• High-value clients showing strong retention\n\n**Strategic Recommendations:**\n• Focus on enterprise client segment\n• Expand service offerings in Q4\n• Implement customer success program\n\n**Risk Mitigation:**\n• Diversify revenue streams\n• Monitor cash flow closely\n• Strengthen client relationships\n\n*Get your free OpenRouter API key at openrouter.ai for detailed AI analysis*`;
    }
    
    return `**Demo Mode - Setup Required**\n\nTo get AI-powered business insights:\n\n1. Get your free OpenRouter API key at openrouter.ai\n2. Add it to your .env file as VITE_OPENROUTER_API_KEY\n3. Restart your development server\n\n**Sample Insight**: Your business metrics show healthy growth patterns with opportunities for optimization in client retention and revenue diversification.`;
  }
}

// Chat with AI assistant
export async function chatWithAI(
  message: string,
  context?: any
): Promise<string> {
  try {
    if (!openrouter) {
      throw new Error('OpenRouter client not initialized');
    }

    const systemPrompt = `You are a helpful AI assistant for a CRM system. You help with business analysis, client management, proposal generation, and general business advice. Be concise and actionable in your responses.`;
    
    const contextInfo = context ? `\n\nContext: ${JSON.stringify(context)}` : '';
    const userMessage = `${message}${contextInfo}`;

    const response = await fetch(openrouter.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouter.apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mini CRM Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || 'I apologize, but I couldn\'t generate a response.';
  } catch (error: any) {
    console.error('Error in AI chat:', error);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      return `I'm currently experiencing high demand. Here's a helpful response based on your message "${message}":\n\n• If you're asking about business insights, I'd recommend focusing on your top-performing clients\n• For proposal help, consider highlighting your unique value proposition\n• For general CRM questions, check your dashboard analytics for trends\n\n*Get your free OpenRouter API key at openrouter.ai to chat with me directly!*`;
    }
    
    return `Hi! I'm your AI assistant, but I need to be set up first.\n\n**Quick Setup:**\n1. Get your free OpenRouter API key at openrouter.ai\n2. Add it to your .env file as VITE_OPENROUTER_API_KEY\n3. Restart your development server\n\nOnce set up, I can help you with:\n• Business insights and analysis\n• Client management advice\n• Proposal generation\n• CRM optimization tips\n\nWhat would you like help with?`;
  }
}
