import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { DollarSign, Users, FileText, TrendingUp, Search, Star, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalRevenue: number;
  totalProfit: number;
  totalExpenses: number;
  totalCustomers: number;
  activeCustomers: number;
}

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalProfit: 0,
    totalExpenses: 0,
    totalCustomers: 0,
    activeCustomers: 0,
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: '1',
      time: '09:30 AM',
      title: 'Business Analytics Press',
      description: 'Focus on core and key metrics',
      completed: true
    },
    {
      id: '2',
      time: '10:35 AM',
      title: 'Business Sprint',
      description: 'James Gartwood and 8+ more',
      completed: false
    },
    {
      id: '3',
      time: '1:15 PM',
      title: 'Customer Review Meeting',
      description: 'Nathaniel Ramirez and 6+ more',
      completed: false
    },
    {
      id: '4',
      time: '2:45 AM',
      title: 'Daily Office Meeting',
      description: 'Milan Ramirez and 2+ more',
      completed: false
    },
    {
      id: '5',
      time: '09:30 AM',
      title: 'Sales Strategy Meeting',
      description: 'Frederick Ramirez and 3+ more',
      completed: false
    }
  ]);

  // Chart data with green theme
  const salesOverviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [3000, 4500, 3200, 5800, 6200, 7100, 6800, 8200, 7500, 9100, 8800, 10200],
        backgroundColor: '#22c55e',
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: 'Expenses',
        data: [2000, 2800, 2100, 3200, 3800, 4200, 4100, 4800, 4300, 5200, 5100, 5800],
        backgroundColor: '#94a3b8',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          callback: function(value: any) {
            return value + 'K';
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (clientsError) throw clientsError;

      // Fetch proposals for stats
      const { data: proposalsData, error: proposalsError } = await supabase
        .from('proposals')
        .select('amount, status')
        .eq('user_id', user?.id);

      if (proposalsError) throw proposalsError;

      setClients(clientsData || []);

      // Calculate stats
      const totalRevenue = proposalsData
        ?.filter(p => p.status === 'accepted')
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0;

      setStats({
        totalRevenue,
        totalProfit: totalRevenue * 0.7, // Assume 70% profit margin
        totalExpenses: totalRevenue * 0.3, // Assume 30% expenses
        totalCustomers: clientsData?.length || 0,
        activeCustomers: Math.floor((clientsData?.length || 0) * 0.8), // Assume 80% active
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      pending: "outline"
    };
    return variants[status] || "default";
  };

  const getRandomStatus = () => {
    const statuses = ['active', 'inactive', 'pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomProgress = () => Math.floor(Math.random() * 100);
  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

  const toggleScheduleItem = (id: string) => {
    setScheduleItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello, {user?.email?.split('@')[0] || 'User'}!</h1>
              <p className="text-lg text-gray-600">
                Here's your overview of your business
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600 rounded-xl">
                <CalendarIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600 rounded-xl">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl p-6 h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col justify-between">
                <div className="text-3xl font-bold text-gray-900 mb-2">${stats.totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl p-6 h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
                <CardTitle className="text-sm font-medium text-gray-600">Profit Total</CardTitle>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col justify-between">
                <div className="text-3xl font-bold text-gray-900 mb-2">${stats.totalProfit.toLocaleString()}</div>
                <p className="text-sm text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl p-6 h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
                <CardTitle className="text-sm font-medium text-gray-600">Expense Total</CardTitle>
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col justify-between">
                <div className="text-3xl font-bold text-gray-900 mb-2">${stats.totalExpenses.toLocaleString()}</div>
                <p className="text-sm text-orange-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl p-6 h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
                <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col justify-between">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalCustomers}</div>
                <p className="text-sm text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12 new this month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl p-6 h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
                <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col justify-between">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.activeCustomers}</div>
                <p className="text-sm text-indigo-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.1% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Revenue Trend</CardTitle>
                <CardDescription className="text-gray-600">
                  Your revenue performance over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar data={salesOverviewData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Customer Table */}
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">Recent Customers</CardTitle>
              <CardDescription className="text-gray-600">
                Manage your client relationships
              </CardDescription>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <Button variant="outline" className="border-gray-300 rounded-xl hover:bg-green-50 hover:border-green-500">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => {
                    const status = getRandomStatus();
                    const progress = getRandomProgress();
                    const rating = getRandomRating();
                    
                    return (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">{client.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(status)}>
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(client.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground">{progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
        </div>

        {/* AI Insights Widget */}
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="bg-white border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">AI Insights</CardTitle>
                <CardDescription className="text-gray-600">
                  Smart recommendations for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="font-medium text-primary mb-2">Revenue Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      You have 3 clients who haven't received a proposal in the last 30 days. 
                      Consider reaching out with new project ideas.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <h4 className="font-medium text-info mb-2">Follow-up Reminder</h4>
                    <p className="text-sm text-muted-foreground">
                      2 proposals are pending response. Schedule follow-up calls to increase conversion rates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}