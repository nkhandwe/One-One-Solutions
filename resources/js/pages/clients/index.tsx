import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Eye,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    Building2,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';
import { useState } from 'react';

export default function ClientsIndex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock data - in real app this would come from API
    const clients = [
        {
            id: 1,
            name: 'Premium Electronics',
            company: 'Premium Electronics Ltd',
            email: 'contact@premiumelectronics.com',
            phone: '+91 98765 43210',
            location: 'Mumbai, Maharashtra',
            status: 'active',
            amazonAccounts: 3,
            monthlyRevenue: '₹450K',
            growth: '+18%',
            lastContact: '2 days ago',
            accountHealth: 'excellent'
        },
        {
            id: 2,
            name: 'Fashion Trends',
            company: 'Fashion Trends India',
            email: 'info@fashiontrends.in',
            phone: '+91 87654 32109',
            location: 'Delhi, NCR',
            status: 'active',
            amazonAccounts: 2,
            monthlyRevenue: '₹320K',
            growth: '+12%',
            lastContact: '1 week ago',
            accountHealth: 'good'
        },
        {
            id: 3,
            name: 'Home & Garden',
            company: 'Home & Garden Solutions',
            email: 'hello@homegarden.com',
            phone: '+91 76543 21098',
            location: 'Bangalore, Karnataka',
            status: 'pending',
            amazonAccounts: 1,
            monthlyRevenue: '₹280K',
            growth: '+8%',
            lastContact: '3 days ago',
            accountHealth: 'warning'
        },
        {
            id: 4,
            name: 'Sports Equipment',
            company: 'Sports Equipment Co.',
            email: 'sales@sportsequipment.co.in',
            phone: '+91 65432 10987',
            location: 'Chennai, Tamil Nadu',
            status: 'active',
            amazonAccounts: 2,
            monthlyRevenue: '₹210K',
            growth: '+5%',
            lastContact: '5 days ago',
            accountHealth: 'good'
        },
        {
            id: 5,
            name: 'Tech Solutions',
            company: 'Tech Solutions Pvt Ltd',
            email: 'admin@techsolutions.com',
            phone: '+91 54321 09876',
            location: 'Hyderabad, Telangana',
            status: 'inactive',
            amazonAccounts: 1,
            monthlyRevenue: '₹180K',
            growth: '-2%',
            lastContact: '2 weeks ago',
            accountHealth: 'poor'
        }
    ];

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
            inactive: { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                <Icon className="w-3 h-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getHealthBadge = (health: string) => {
        const healthConfig = {
            excellent: { color: 'bg-green-100 text-green-800', text: 'Excellent' },
            good: { color: 'bg-blue-100 text-blue-800', text: 'Good' },
            warning: { color: 'bg-yellow-100 text-yellow-800', text: 'Warning' },
            poor: { color: 'bg-red-100 text-red-800', text: 'Poor' }
        };
        
        const config = healthConfig[health as keyof typeof healthConfig];
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <AppLayout>
            <Head title="Clients - One One Solution" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                        <p className="text-gray-600 mt-1">Manage your client relationships and Amazon accounts</p>
                    </div>
                    <Link
                        href="/clients/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Client
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {clients.filter(c => c.status === 'active').length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">₹1.44M</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Amazon Accounts</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {clients.reduce((sum, client) => sum + client.amazonAccounts, 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <Building2 className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search clients by name, company, or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                More Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Clients Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amazon Accounts
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Revenue
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Account Health
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold text-sm">
                                                        {client.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                    <div className="text-sm text-gray-500">{client.company}</div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Mail className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-500">{client.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Phone className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-500">{client.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <MapPin className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-500">{client.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(client.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{client.amazonAccounts}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{client.monthlyRevenue}</div>
                                            <div className="text-sm text-green-600">{client.growth}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getHealthBadge(client.accountHealth)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {client.lastContact}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/clients/${client.id}`}
                                                    className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/clients/${client.id}/edit`}
                                                    className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClients.length}</span> of{' '}
                            <span className="font-medium">{clients.length}</span> results
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                1
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
