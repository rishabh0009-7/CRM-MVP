import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  Eye,
  Share
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ReportData {
  id: string;
  name: string;
  type: string;
  dateRange: string;
  status: string;
  createdAt: string;
  size: string;
}

interface ClientReport {
  id: string;
  name: string;
  email: string;
  company: string;
  totalValue: number;
  proposalsCount: number;
  status: string;
  lastActivity: string;
}

interface ProposalReport {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: string;
  createdAt: string;
  responseTime: number;
}

export default function Reports() {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportData[]>([]);
  const [clientReports, setClientReports] = useState<ClientReport[]>([]);
  const [proposalReports, setProposalReports] = useState<ProposalReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReportsData();
    }
  }, [user, reportType, dateRange]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);

      // Fetch clients data
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user?.id);

      if (clientsError) throw clientsError;

      // Fetch proposals data
      const { data: proposalsData, error: proposalsError } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', user?.id);

      if (proposalsError) throw proposalsError;

      // Process client reports
      const processedClientReports: ClientReport[] = (clientsData || []).map(client => {
        const clientProposals = proposalsData?.filter(p => p.client_id === client.id) || [];
        const totalValue = clientProposals
          .filter(p => p.status === 'accepted')
          .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

        return {
          id: client.id,
          name: client.name,
          email: client.email,
          company: client.company || 'N/A',
          totalValue,
          proposalsCount: clientProposals.length,
          status: totalValue > 0 ? 'active' : 'inactive',
          lastActivity: client.updated_at || client.created_at,
        };
      });

      // Process proposal reports
      const processedProposalReports: ProposalReport[] = (proposalsData || []).map(proposal => {
        const client = clientsData?.find(c => c.id === proposal.client_id);
        const responseTime = Math.floor(Math.random() * 7) + 1; // Mock response time

        return {
          id: proposal.id,
          title: proposal.title,
          client: client?.name || 'Unknown',
          amount: Number(proposal.amount) || 0,
          status: proposal.status,
          createdAt: proposal.created_at,
          responseTime,
        };
      });

      // Generate sample report history
      const sampleReports: ReportData[] = [
        {
          id: '1',
          name: 'Monthly Revenue Report',
          type: 'Financial',
          dateRange: 'Nov 2024',
          status: 'completed',
          createdAt: '2024-12-01',
          size: '2.3 MB'
        },
        {
          id: '2',
          name: 'Client Performance Analysis',
          type: 'Client',
          dateRange: 'Q4 2024',
          status: 'completed',
          createdAt: '2024-11-28',
          size: '1.8 MB'
        },
        {
          id: '3',
          name: 'Proposal Success Rate',
          type: 'Proposal',
          dateRange: 'Last 6 months',
          status: 'generating',
          createdAt: '2024-12-15',
          size: 'Pending'
        },
        {
          id: '4',
          name: 'Annual Business Summary',
          type: 'Comprehensive',
          dateRange: '2024',
          status: 'scheduled',
          createdAt: '2024-12-31',
          size: 'Scheduled'
        }
      ];

      setReports(sampleReports);
      setClientReports(processedClientReports);
      setProposalReports(processedProposalReports);
    } catch (error) {
      console.error('Error fetching reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === 'all' || report.type.toLowerCase() === reportType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      generating: "secondary",
      scheduled: "outline",
      failed: "destructive"
    };
    return variants[status] || "default";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "text-green-600",
      inactive: "text-gray-500",
      pending: "text-yellow-600",
      accepted: "text-green-600",
      rejected: "text-red-600"
    };
    return colors[status] || "text-gray-500";
  };

  const generateReport = (type: string) => {
    // In a real app, this would trigger report generation
    console.log(`Generating ${type} report...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
            <p className="text-gray-500">
              Generate and manage comprehensive business reports
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 this month
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
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientReports.filter(c => c.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((clientReports.filter(c => c.status === 'active').length / clientReports.length) * 100)}% of total
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
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${clientReports.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  From all clients
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
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {proposalReports.length > 0 ? 
                    Math.round((proposalReports.filter(p => p.status === 'accepted').length / proposalReports.length) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Proposal acceptance rate
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">Report History</TabsTrigger>
            <TabsTrigger value="clients">Client Reports</TabsTrigger>
            <TabsTrigger value="proposals">Proposal Reports</TabsTrigger>
            <TabsTrigger value="generate">Generate New</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>
                  View and download previously generated reports
                </CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.dateRange}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Performance Report</CardTitle>
                <CardDescription>
                  Detailed analysis of client relationships and revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Proposals</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientReports.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">{client.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell>${client.totalValue.toLocaleString()}</TableCell>
                        <TableCell>{client.proposalsCount}</TableCell>
                        <TableCell>
                          <span className={getStatusColor(client.status)}>
                            {client.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(client.lastActivity).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Performance Report</CardTitle>
                <CardDescription>
                  Analysis of proposal success rates and response times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proposal</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposalReports.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.title}</TableCell>
                        <TableCell>{proposal.client}</TableCell>
                        <TableCell>${proposal.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={getStatusColor(proposal.status)}>
                            {proposal.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(proposal.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{proposal.responseTime} days</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => generateReport('financial')}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Financial Report</span>
                    </CardTitle>
                    <CardDescription>
                      Comprehensive revenue, profit, and expense analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Financial Report</Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => generateReport('client')}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Client Analysis</span>
                    </CardTitle>
                    <CardDescription>
                      Client performance, retention, and growth metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Client Report</Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => generateReport('proposal')}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Proposal Performance</span>
                    </CardTitle>
                    <CardDescription>
                      Success rates, response times, and conversion analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Proposal Report</Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => generateReport('comprehensive')}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Business Overview</span>
                    </CardTitle>
                    <CardDescription>
                      Complete business performance and growth analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Overview Report</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
