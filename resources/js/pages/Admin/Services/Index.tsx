import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ArrowUpDown, CheckCircle, Clock, Edit, Eye, Plus, Search, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Service {
    id: number;
    name: string;
    description: string;
    icon: string;
    image: string;
    is_active: boolean;
    position: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    services: Service[] | { data: Service[]; [key: string]: any };
    categories?: any[];
}

export default function ServicesIndex({ services, categories }: Props) {
    const { colors } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('all');
    const [sortBy, setSortBy] = useState('position');

    // Handle both array and paginated object
    const servicesArray = Array.isArray(services) ? services : services?.data || [];
    const totalServicesCount = servicesArray.length;
    const activeServicesCount = servicesArray.filter((s) => s.is_active).length;
    const inactiveServicesCount = servicesArray.filter((s) => !s.is_active).length;

    // Filter and sort services
    const filteredServices = servicesArray
        .filter((service) => {
            const matchesSearch =
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = status === 'all' || (status === 'active' && service.is_active) || (status === 'inactive' && !service.is_active);
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'created_at') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            return a.position - b.position;
        });

    const handleToggleActive = (serviceId: number) => {
        router.patch(`/services/${serviceId}/toggle-active`);
    };

    const handleDelete = (serviceId: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(`/services/${serviceId}`);
        }
    };

    const handlePositionChange = (serviceId: number, direction: 'up' | 'down') => {
        router.patch('/services/update-positions', {
            service_id: serviceId,
            direction: direction,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatus('all');
        setSortBy('position');
    };

    return (
        <AdminLayout>
            <Head title="Services Management" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="group flex items-center justify-center rounded-full border p-3 transition-all duration-300 hover:scale-105"
                            style={{
                                background: `${colors.background.card}60`,
                                borderColor: colors.background.border,
                            }}
                        >
                            <ArrowLeft className="h-5 w-5 transition-colors" style={{ color: colors.text.secondary }} />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                Services Management
                            </h1>
                            <p style={{ color: colors.text.tertiary }}>Manage your service offerings and their display order</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/services/create"
                                className="shadow-lg transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                    boxShadow: `0 10px 25px -5px ${colors.primary.main}25`,
                                }}
                            >
                                <Button className="bg-transparent text-white hover:bg-white/10">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Service
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Total Services */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Total Services
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {totalServicesCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                        }}
                                    >
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Active Services */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.success.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.accent.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Active Services
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {activeServicesCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.success.main} 0%, ${colors.accent.main} 100%)`,
                                        }}
                                    >
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Inactive Services */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.warning.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.warning.main} 0%, ${colors.accent.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Inactive Services
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {inactiveServicesCount}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.warning.main} 0%, ${colors.accent.main} 100%)`,
                                        }}
                                    >
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Average Position */}
                        <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${colors.background.card}90 0%, ${colors.background.card}70 100%)`,
                                borderColor: colors.background.border,
                                boxShadow: `0 25px 50px -12px ${colors.secondary.main}25`,
                            }}
                        >
                            <div
                                className="absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)` }}
                            />
                            <CardContent className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: colors.text.tertiary }}>
                                            Avg Position
                                        </p>
                                        <p className="text-3xl font-bold" style={{ color: colors.text.primary }}>
                                            {totalServicesCount > 0
                                                ? Math.round(servicesArray.reduce((sum, s) => sum + s.position, 0) / totalServicesCount)
                                                : 0}
                                        </p>
                                    </div>
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.accent.main} 100%)`,
                                        }}
                                    >
                                        <ArrowUpDown className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters and Search */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex flex-1 items-center gap-4">
                                    <div className="relative max-w-md flex-1">
                                        <Search
                                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                                            style={{ color: colors.text.tertiary }}
                                        />
                                        <Input
                                            placeholder="Search services..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                            style={{
                                                borderColor: colors.background.border,
                                                background: colors.background.input,
                                                color: colors.text.primary,
                                                '--tw-ring-color': colors.primary.main,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                            Status:
                                        </span>
                                        <Select value={status} onValueChange={setStatus}>
                                            <SelectTrigger
                                                className="w-32 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                            Sort by:
                                        </span>
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger
                                                className="w-32 transition-all duration-200 focus:ring-2 focus:ring-offset-0"
                                                style={{
                                                    borderColor: colors.background.border,
                                                    background: colors.background.input,
                                                    color: colors.text.primary,
                                                    '--tw-ring-color': colors.primary.main,
                                                }}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="position">Position</SelectItem>
                                                <SelectItem value="name">Name</SelectItem>
                                                <SelectItem value="created_at">Date Created</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {(searchTerm || status !== 'all' || sortBy !== 'position') && (
                                        <Button
                                            onClick={clearFilters}
                                            variant="outline"
                                            size="sm"
                                            className="transition-all duration-200 hover:scale-105"
                                            style={{
                                                borderColor: colors.background.border,
                                                color: colors.text.secondary,
                                            }}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm" style={{ color: colors.text.tertiary }}>
                                    Showing {filteredServices.length} of {totalServicesCount} services
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Services Table */}
                    <Card
                        style={{
                            background: `${colors.background.card}90`,
                            borderColor: colors.background.border,
                            boxShadow: `0 25px 50px -12px ${colors.primary.main}25`,
                        }}
                    >
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottomColor: colors.background.divider }}>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Position
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Service
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Created
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: colors.text.secondary }}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredServices.map((service, index) => (
                                            <tr
                                                key={service.id}
                                                className="group hover:bg-opacity-50 transition-all duration-200"
                                                style={{
                                                    borderBottomColor: colors.background.divider,
                                                    background: index % 2 === 0 ? `${colors.background.card}30` : 'transparent',
                                                }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-sm font-bold" style={{ color: colors.text.primary }}>
                                                            {service.position}
                                                        </span>
                                                        <div className="flex flex-col gap-1">
                                                            <button
                                                                onClick={() => handlePositionChange(service.id, 'up')}
                                                                disabled={service.position === 1}
                                                                className="flex h-6 w-6 items-center justify-center rounded transition-colors disabled:opacity-30"
                                                                style={{
                                                                    background: colors.background.tertiary,
                                                                    color: colors.text.secondary,
                                                                }}
                                                            >
                                                                <ArrowUpDown className="h-3 w-3 rotate-180" />
                                                            </button>
                                                            <button
                                                                onClick={() => handlePositionChange(service.id, 'down')}
                                                                disabled={service.position === totalServicesCount}
                                                                className="flex h-6 w-6 items-center justify-center rounded transition-colors disabled:opacity-30"
                                                                style={{
                                                                    background: colors.background.tertiary,
                                                                    color: colors.text.secondary,
                                                                }}
                                                            >
                                                                <ArrowUpDown className="h-3 w-3 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {service.image ? (
                                                            <img
                                                                src={service.image}
                                                                alt={service.name}
                                                                className="h-12 w-12 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold text-white"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                                }}
                                                            >
                                                                {service.icon || service.name.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                                                                {service.name}
                                                            </h3>
                                                            <p className="line-clamp-2 text-sm" style={{ color: colors.text.tertiary }}>
                                                                {service.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant="outline"
                                                        className="transition-all duration-300"
                                                        style={{
                                                            borderColor: service.is_active ? colors.success.main : colors.warning.main,
                                                            background: service.is_active ? `${colors.success.main}15` : `${colors.warning.main}15`,
                                                            color: service.is_active ? colors.success.main : colors.warning.main,
                                                        }}
                                                    >
                                                        {service.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm" style={{ color: colors.text.tertiary }}>
                                                        {new Date(service.created_at).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/services/${service.id}`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                background: colors.background.tertiary,
                                                                color: colors.text.secondary,
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/services/${service.id}/edit`}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                background: colors.background.tertiary,
                                                                color: colors.text.secondary,
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <Button
                                                            onClick={() => handleToggleActive(service.id)}
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0 transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                borderColor: service.is_active ? colors.warning.main : colors.success.main,
                                                                color: service.is_active ? colors.warning.main : colors.success.main,
                                                            }}
                                                        >
                                                            {service.is_active ? <Clock className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDelete(service.id)}
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0 transition-all duration-200 hover:scale-110"
                                                            style={{
                                                                borderColor: colors.error.main,
                                                                color: colors.error.main,
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredServices.length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full" style={{ background: `${colors.background.tertiary}` }}>
                                        <Search className="mx-auto h-8 w-8 py-4" style={{ color: colors.text.tertiary }} />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold" style={{ color: colors.text.primary }}>
                                        {totalServicesCount === 0 ? 'No services yet' : 'No services found'}
                                    </h3>
                                    <p style={{ color: colors.text.tertiary }}>
                                        {totalServicesCount === 0
                                            ? 'Get started by creating your first service.'
                                            : searchTerm || status !== 'all'
                                              ? 'Try adjusting your search or filters.'
                                              : 'Get started by creating your first service.'}
                                    </p>
                                    {totalServicesCount === 0 && (
                                        <div className="mt-4">
                                            <Link
                                                href="/services/create"
                                                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:scale-105"
                                                style={{
                                                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                                    color: 'white',
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                                Create Your First Service
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
