import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Filter,
  Search,
  Eye,
  RefreshCw,
  CreditCard,
  Smartphone
} from 'lucide-react';

interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
  project_id?: string;
  transaction_id?: string;
  is_anonymous: boolean;
}

const DonationTracker = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, statusFilter, methodFilter, dateRange]);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load donations.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDonations = () => {
    let filtered = donations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.donor_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(donation => donation.status === statusFilter);
    }

    // Payment method filter
    if (methodFilter !== 'all') {
      filtered = filtered.filter(donation => donation.payment_method === methodFilter);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      if (dateRange !== 'all') {
        filtered = filtered.filter(donation => 
          new Date(donation.created_at) >= filterDate
        );
      }
    }

    setFilteredDonations(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'refunded': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mpesa': return <Smartphone className="h-4 w-4" />;
      case 'card': return <CreditCard className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const calculateTotalDonations = () => {
    return filteredDonations
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
  };

  const calculateAverageDonation = () => {
    const completedDonations = filteredDonations.filter(d => d.status === 'completed');
    if (completedDonations.length === 0) return 0;
    return calculateTotalDonations() / completedDonations.length;
  };

  const exportDonations = () => {
    // This would export donations to CSV or PDF
    toast({
      title: 'Info',
      description: 'Export functionality will be implemented.',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading donations...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Donation Tracker
        </CardTitle>
        <CardDescription>Monitor and analyze donation data and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-KE', {
                      style: 'currency',
                      currency: 'KES'
                    }).format(calculateTotalDonations())}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {filteredDonations.filter(d => d.status === 'completed').length} donations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-KE', {
                      style: 'currency',
                      currency: 'KES'
                    }).format(calculateAverageDonation())}
                  </div>
                  <p className="text-xs text-muted-foreground">per donation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Set(filteredDonations.map(d => d.donor_email)).size}
                  </div>
                  <p className="text-xs text-muted-foreground">unique donors</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {filteredDonations.filter(d => {
                      const donationDate = new Date(d.created_at);
                      const now = new Date();
                      return donationDate.getMonth() === now.getMonth() && 
                             donationDate.getFullYear() === now.getFullYear() &&
                             d.status === 'completed';
                    }).reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">KES</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest donation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDonations.slice(0, 5).map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getMethodIcon(donation.payment_method)}
                        <div>
                          <p className="font-medium">
                            {donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat('en-KE', {
                            style: 'currency',
                            currency: donation.currency
                          }).format(donation.amount)}
                        </p>
                        <Badge variant="outline" className={`text-white ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={methodFilter} onValueChange={setMethodFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                        <SelectItem value="card">Credit Card</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button variant="outline" onClick={fetchDonations}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" onClick={exportDonations}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  All Transactions ({filteredDonations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {getMethodIcon(donation.payment_method)}
                        </div>
                        <div>
                          <p className="font-medium">
                            {donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {!donation.is_anonymous && donation.donor_email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {donation.transaction_id && `Transaction: ${donation.transaction_id}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">
                          {new Intl.NumberFormat('en-KE', {
                            style: 'currency',
                            currency: donation.currency
                          }).format(donation.amount)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-white ${getStatusColor(donation.status)}`}>
                            {donation.status}
                          </Badge>
                          <Badge variant="outline">
                            {donation.payment_method}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(donation.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Donation Analytics</CardTitle>
                <CardDescription>Visual insights and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Advanced analytics and charts coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Donation Reports</CardTitle>
                <CardDescription>Generate detailed reports and summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Report generation coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DonationTracker;