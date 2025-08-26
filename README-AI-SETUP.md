# AI Integration Setup Guide

## 🚀 Quick Setup

### 1. Install OpenAI Package
```bash
npm install openai
```

### 2. Add Your OpenAI API Key
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Replace `your-openai-api-key-here` in `.env` file:
```env
VITE_OPENAI_API_KEY="sk-your-actual-api-key-here"
```

### 3. Restart Development Server
```bash
npm run dev
```

## 🤖 AI Features Added

### **AI Chat Assistant**
- **Location**: Floating chat button (bottom-right corner)
- **Features**: 
  - Real-time business consultation
  - Client relationship advice
  - Proposal suggestions
  - Data analysis insights

### **AI Business Insights**
- **Location**: Dashboard main page
- **Features**:
  - Automated business analysis
  - Growth recommendations
  - Risk assessment
  - Strategic insights

### **AI Client Insights** (Available for individual clients)
- **Features**:
  - Client profile analysis
  - Opportunity identification
  - Risk evaluation
  - Action recommendations

### **AI Proposal Generator**
- **Features**:
  - Automated proposal creation
  - Customized suggestions
  - Value estimation
  - Timeline planning

## 🔧 Components Created

1. **`src/services/openai.ts`** - Core AI service functions
2. **`src/components/AIChatAssistant.tsx`** - Chat interface
3. **`src/components/AIInsights.tsx`** - Business insights widget
4. **`src/components/AIProposalGenerator.tsx`** - Proposal generator

## 🎯 Usage Examples

### Chat Assistant Prompts
- "Analyze my top clients"
- "Suggest proposal ideas for TechCorp"
- "How can I improve my conversion rate?"
- "Generate a follow-up email template"

### Business Insights
- Automatically analyzes your revenue, customer count, and growth
- Provides actionable recommendations
- Updates based on real CRM data

## 🔒 Security Notes

- API key is stored in environment variables
- Never commit your actual API key to version control
- Consider using a backend API for production (current setup uses browser-side calls)

## 💡 Customization

You can modify AI behavior by editing the system prompts in `src/services/openai.ts`:
- Adjust tone and personality
- Add industry-specific knowledge
- Customize response formats

## 🚨 Troubleshooting

**"Failed to generate insights" error:**
1. Check your OpenAI API key is correct
2. Ensure you have sufficient API credits
3. Verify internet connection
4. Check browser console for detailed errors

**Chat not responding:**
1. Refresh the page
2. Check API key configuration
3. Try a simpler prompt first

## 📊 Cost Management

- Uses GPT-3.5-turbo (cost-effective)
- Typical cost: ~$0.002 per conversation
- Monitor usage in OpenAI dashboard
- Set usage limits if needed

## 🔄 Next Steps

1. **Get OpenAI API Key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Update .env file** with your key
3. **Install dependencies**: `npm install openai`
4. **Test the features** in your dashboard

Your CRM now has powerful AI capabilities! 🎉
