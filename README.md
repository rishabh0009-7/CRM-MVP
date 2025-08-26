# SyncAi CRM - Mini CRM MVP

A modern, AI-powered Customer Relationship Management (CRM) system built with React, TypeScript, and Supabase. Features comprehensive client management, proposal tracking, analytics, and AI-powered business insights.

## 🚀 Features

### Core CRM Functionality
- **Client Management** - Add, edit, and organize client information with company details and notes
- **Proposal Tracking** - Create and manage proposals with status tracking and follow-up dates
- **Analytics Dashboard** - Comprehensive charts and metrics for business insights
- **Reports** - Generate detailed reports on business performance
- **Settings** - Customize your CRM experience

### AI-Powered Features
- **AI Chat Assistant** - Get business consultation and CRM guidance
- **AI Business Insights** - Automated analysis of your dashboard data
- **AI Proposal Generator** - Generate tailored client proposals
- **AI Client Analysis** - Individual client insights and recommendations

### Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark Sidebar** - Professional gray-900 sidebar with green accents
- **Modern Landing Page** - Growio-inspired design with interactive charts
- **Smooth Animations** - Framer Motion animations throughout
- **Professional Charts** - Chart.js integration with multiple chart types

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **AI Integration**: OpenRouter API (Claude 3 Haiku)
- **Charts**: Chart.js with React Chart.js 2
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenRouter account (for AI features)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/rishabh0009-7/CRM-MVP.git
cd CRM-MVP
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_publishable_key"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"

# OpenRouter AI Configuration
VITE_OPENROUTER_API_KEY="sk-or-v1-your_api_key_here"
```

### 4. Supabase Setup
1. Create a new Supabase project
2. Run the database migrations from `supabase/migrations/`
3. Update your `.env` with your Supabase credentials

### 5. OpenRouter Setup (Optional - for AI features)
1. Sign up at [openrouter.ai](https://openrouter.ai)
2. Create an API key
3. Add it to your `.env` file as `VITE_OPENROUTER_API_KEY`

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your CRM in action!

## 📊 Database Schema

The CRM uses the following main tables:
- `clients` - Client information and contact details
- `proposals` - Proposal tracking with status and amounts
- `users` - User authentication and profiles

## 🎨 Design System

### Colors
- **Primary**: Green (#22c55e)
- **Background**: Gray-50 (#f9fafb)
- **Sidebar**: Gray-900 (#111827)
- **Cards**: White with shadow-lg

### Components
- Built with shadcn/ui for consistency
- Custom styled with Tailwind CSS
- Responsive grid layouts
- Professional animations

## 🤖 AI Features

The CRM includes comprehensive AI functionality powered by OpenRouter:

### AI Chat Assistant
- Business consultation and guidance
- CRM feature explanations
- Strategic recommendations

### AI Business Insights
- Automated dashboard analysis
- Performance recommendations
- Risk assessment

### AI Proposal Generator
- Tailored client proposals
- Industry-specific suggestions
- Pricing recommendations

### AI Client Analysis
- Individual client insights
- Opportunity identification
- Relationship recommendations

## 📱 Pages Overview

### Landing Page
- Modern hero section with demo cards
- Interactive Chart.js components
- Statistics showcase
- Pricing plans
- Testimonials and resources

### Dashboard
- Key metrics and KPIs
- Multiple chart types (bar, doughnut, pie, radar, polar)
- AI business insights integration
- Real-time data updates

### Client Management
- Add/edit client information
- Search and filter functionality
- Company and contact details
- Notes and relationship tracking

### Proposal Tracking
- Create and manage proposals
- Status tracking (draft, sent, accepted, rejected)
- Amount and follow-up date tracking
- Client association

### Analytics
- 6 organized tabs: Revenue, Clients, Proposals, Performance, Marketing, Insights
- Multiple chart types: Area, Radar, Polar, Scatter plots
- Interactive tooltips and animations
- Responsive layouts

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── pages/              # Page components
├── services/           # API and service functions
└── lib/               # Utility functions
```

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel
- Netlify  
- AWS Amplify
- Railway

Make sure to set your environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [OpenRouter](https://openrouter.ai) for AI API access
- [shadcn/ui](https://ui.shadcn.com) for the component library
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Chart.js](https://www.chartjs.org) for data visualization

## 📞 Support

If you have any questions or need help setting up the CRM, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Built with ❤️ by [Rishabh](https://github.com/rishabh0009-7)**