import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar, PolarArea, Scatter } from 'react-chartjs-2';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  FileText, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  revenue: number[];
  clients: number[];
  proposals: number[];
  conversionRate: number;
  avgDealSize: number;
  monthlyGrowth: number;
  clientSatisfaction: number[];
  marketingChannels: number[];
  timeToClose: { x: number; y: number }[];
  quarterlyPerformance: number[];
}

export default function Analytics() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    revenue: [],
    clients: [],
    proposals: [],
    conversionRate: 0,
    avgDealSize: 0,
    monthlyGrowth: 0,
    clientSatisfaction: [],
    marketingChannels: [],
    timeToClose: [],
    quarterlyPerformance: [],
  });
  const [timeRange, setTimeRange] = useState('12months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user, timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch proposals data
      const { data: proposalsData, error: proposalsError } = await supabase
        .from('proposals')
        .select('amount, status, created_at')
        .eq('user_id', user?.id);

      if (proposalsError) throw proposalsError;

      // Fetch clients data
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('created_at')
        .eq('user_id', user?.id);

      if (clientsError) throw clientsError;

      // Process data for analytics
      const acceptedProposals = proposalsData?.filter(p => p.status === 'accepted') || [];
      const totalRevenue = acceptedProposals.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      const conversionRate = proposalsData?.length ? (acceptedProposals.length / proposalsData.length) * 100 : 0;
      const avgDealSize = acceptedProposals.length ? totalRevenue / acceptedProposals.length : 0;

      // Generate sample monthly data (in real app, this would be calculated from actual data)
      const monthlyRevenue = [15000, 18000, 22000, 19000, 25000, 28000, 32000, 29000, 35000, 38000, 42000, 45000];
      const monthlyClients = [5, 7, 9, 8, 12, 15, 18, 16, 22, 25, 28, 30];
      const monthlyProposals = [8, 10, 14, 12, 18, 22, 26, 24, 32, 35, 38, 42];
      
      // Additional data for new charts
      const clientSatisfactionData = [4.2, 4.5, 4.1, 4.7, 4.3, 4.6, 4.8, 4.4, 4.9, 4.5, 4.7, 4.8];
      const marketingChannelsData = [35, 25, 20, 15, 5]; // Social, Email, Referral, Direct, Other
      const timeToCloseData = [
        { x: 5, y: 15000 }, { x: 12, y: 22000 }, { x: 8, y: 18000 }, { x: 15, y: 35000 },
        { x: 20, y: 45000 }, { x: 7, y: 12000 }, { x: 25, y: 55000 }, { x: 10, y: 28000 },
        { x: 18, y: 38000 }, { x: 6, y: 16000 }, { x: 22, y: 42000 }, { x: 14, y: 32000 }
      ];
      const quarterlyData = [85, 92, 78, 96]; // Q1, Q2, Q3, Q4 performance scores

      setAnalyticsData({
        revenue: monthlyRevenue,
        clients: monthlyClients,
        proposals: monthlyProposals,
        conversionRate,
        avgDealSize,
        monthlyGrowth: 15.3,
        clientSatisfaction: clientSatisfactionData,
        marketingChannels: marketingChannelsData,
        timeToClose: timeToCloseData,
        quarterlyPerformance: quarterlyData,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const revenueChartData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: analyticsData.revenue,
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        tension: 0.4,
      },
    ],
  };

  const clientsChartData = {
    labels: months,
    datasets: [
      {
        label: 'New Clients',
        data: analyticsData.clients,
        backgroundColor: 'hsl(var(--primary))',
        borderRadius: 4,
      },
    ],
  };

  const proposalStatusData = {
    labels: ['Accepted', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'hsl(var(--primary))',
          'hsl(var(--warning))',
          'hsl(var(--destructive))',
        ],
        borderWidth: 0,
      },
    ],
  };

  // New chart data configurations
  const areaChartData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: analyticsData.revenue,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: analyticsData.revenue.map(r => r * 0.3),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const radarChartData = {
    labels: ['Communication', 'Quality', 'Timeliness', 'Value', 'Support', 'Innovation'],
    datasets: [
      {
        label: 'Client Satisfaction',
        data: [4.5, 4.8, 4.2, 4.6, 4.3, 4.1],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#22c55e',
      },
      {
        label: 'Industry Average',
        data: [4.0, 4.2, 3.8, 4.1, 3.9, 3.7],
        borderColor: '#64748b',
        backgroundColor: 'rgba(100, 116, 139, 0.1)',
        pointBackgroundColor: '#64748b',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#64748b',
      },
    ],
  };

  const polarAreaData = {
    labels: ['Social Media', 'Email Marketing', 'Referrals', 'Direct', 'Other'],
    datasets: [
      {
        data: analyticsData.marketingChannels,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const scatterChartData = {
    datasets: [
      {
        label: 'Deal Size vs Time to Close',
        data: analyticsData.timeToClose,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: '#22c55e',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const satisfactionTrendData = {
    labels: months,
    datasets: [
      {
        label: 'Client Satisfaction Score',
        data: analyticsData.clientSatisfaction,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const quarterlyPerformanceData = {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [
      {
        label: 'Performance Score',
        data: analyticsData.quarterlyPerformance,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Deal Size: $${context.parsed.y.toLocaleString()}, Days to Close: ${context.parsed.x}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days to Close',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Deal Size ($)',
        },
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  const polarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>
            <p className="text-gray-500">
              Detailed insights into your business performance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
                <SelectItem value="2years">Last 2 years</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate.toFixed(1)}%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analyticsData.avgDealSize.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +8.3% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.monthlyGrowth}%</div>
                <p className="text-xs text-muted-foreground">
                  +3.2% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Pipeline</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$125,000</div>
                <p className="text-xs text-muted-foreground">
                  12 proposals pending
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>
                      Monthly revenue performance over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Line data={revenueChartData} options={chartOptions} />
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue vs Expenses</CardTitle>
                    <CardDescription>
                      Area chart showing revenue and expense trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Line data={areaChartData} options={chartOptions} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Client Acquisition</CardTitle>
                    <CardDescription>
                      New clients acquired each month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar data={clientsChartData} options={chartOptions} />
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Client Satisfaction Trend</CardTitle>
                    <CardDescription>
                      Monthly client satisfaction scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Line data={satisfactionTrendData} options={chartOptions} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Proposal Status Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of proposal outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Doughnut data={proposalStatusData} options={doughnutOptions} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Quarterly Performance</CardTitle>
                    <CardDescription>
                      Performance scores by quarter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar data={quarterlyPerformanceData} options={chartOptions} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Client Satisfaction Radar</CardTitle>
                    <CardDescription>
                      Multi-dimensional satisfaction analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Radar data={radarChartData} options={radarOptions} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                    <CardDescription>
                      Key metrics and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <h4 className="font-medium text-primary mb-2">Strong Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Your conversion rate is 15% above industry average. Keep up the excellent work!
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                      <h4 className="font-medium text-warning mb-2">Opportunity</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider following up on pending proposals. Quick responses can improve conversion by 23%.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                      <h4 className="font-medium text-info mb-2">Growth Trend</h4>
                      <p className="text-sm text-muted-foreground">
                        Your monthly growth rate is accelerating. Consider scaling your operations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Channel Performance</CardTitle>
                  <CardDescription>
                    Lead generation by marketing channel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PolarArea data={polarAreaData} options={polarOptions} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Deal Size vs Time to Close</CardTitle>
                  <CardDescription>
                    Correlation between deal value and closing time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Scatter data={scatterChartData} options={scatterOptions} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
