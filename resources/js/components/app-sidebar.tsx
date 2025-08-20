import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    Image,
    LayoutGrid,
    LayoutList,
    Rss,
    Settings,
    ShieldHalf,
    ShoppingBasket,
    Siren,
    SwatchBook,
    TableOfContents,
    Telescope,
    Users,
    BarChart3,
    FileText,
    MessageSquare,
    Calendar,
    DollarSign,
    Target,
    TrendingUp,
    Package,
    Globe,
    Palette,
    Search,
    Mail,
    Phone,
    MapPin,
    Building2,
    GraduationCap
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavAdditional } from './nav-additional';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const additionalNavItems: NavItem[] = [
    // Dashboard & Analytics
    {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        group: 'Dashboard & Analytics',
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
        group: 'Dashboard & Analytics',
    },

    // Client Management
    {
        title: 'Clients',
        href: '/clients',
        icon: Users,
        group: 'Client Management',
    },
    {
        title: 'Client Accounts',
        href: '/client-accounts',
        icon: Building2,
        group: 'Client Management',
    },
    {
        title: 'Client Performance',
        href: '/client-performance',
        icon: TrendingUp,
        group: 'Client Management',
    },

    // Team Management
    {
        title: 'Team Members',
        href: '/teams',
        icon: ShieldHalf,
        group: 'Team Management',
    },
    {
        title: 'Team Performance',
        href: '/team-performance',
        icon: Target,
        group: 'Team Management',
    },
    {
        title: 'Training & Skills',
        href: '/training',
        icon: GraduationCap,
        group: 'Team Management',
    },

    // Amazon Services Management
    {
        title: 'Amazon Accounts',
        href: '/amazon-accounts',
        icon: ShoppingBasket,
        group: 'Amazon Services',
    },
    {
        title: 'Product Catalog',
        href: '/products',
        icon: Package,
        group: 'Amazon Services',
    },
    {
        title: 'Listing Management',
        href: '/listings',
        icon: TableOfContents,
        group: 'Amazon Services',
    },
    {
        title: 'Advertising Campaigns',
        href: '/advertising',
        icon: Target,
        group: 'Amazon Services',
    },
    {
        title: 'Inventory Management',
        href: '/inventory',
        icon: Package,
        group: 'Amazon Services',
    },

    // Content & Media
    {
        title: 'Banners & Sliders',
        href: '/banners',
        icon: Image,
        group: 'Content & Media',
    },
    {
        title: 'Product Images',
        href: '/product-images',
        icon: Image,
        group: 'Content & Media',
    },
    {
        title: 'Portfolio',
        href: '/portfolios',
        icon: BriefcaseBusiness,
        group: 'Content & Media',
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
        icon: SwatchBook,
        group: 'Content & Media',
    },

    // Marketing & SEO
    {
        title: 'SEO Management',
        href: '/seo',
        icon: Search,
        group: 'Marketing & SEO',
    },
    {
        title: 'Digital Marketing',
        href: '/digital-marketing',
        icon: Globe,
        group: 'Marketing & SEO',
    },
    {
        title: 'Social Media',
        href: '/social-media',
        icon: Rss,
        group: 'Marketing & SEO',
    },

    // Communication
    {
        title: 'Inquiries',
        href: '/inquiry',
        icon: Siren,
        group: 'Communication',
    },
    {
        title: 'Customer Messages',
        href: '/customer-messages',
        icon: MessageSquare,
        group: 'Communication',
    },
    {
        title: 'Email Campaigns',
        href: '/email-campaigns',
        icon: Mail,
        group: 'Communication',
    },

    // Business Operations
    {
        title: 'Services',
        href: '/services',
        icon: Telescope,
        group: 'Business Operations',
    },
    {
        title: 'Pricing Plans',
        href: '/pricing',
        icon: DollarSign,
        group: 'Business Operations',
    },
    {
        title: 'Appointments',
        href: '/appointments',
        icon: Calendar,
        group: 'Business Operations',
    },
    {
        title: 'FAQs',
        href: '/faqs',
        icon: TableOfContents,
        group: 'Business Operations',
    },
    {
        title: 'Blogs',
        href: '/blogs',
        icon: Rss,
        group: 'Business Operations',
    },

    // System & Settings
    {
        title: 'Website Settings',
        href: '/settings',
        icon: Settings,
        group: 'System & Settings',
    },
    {
        title: 'User Management',
        href: '/users',
        icon: Users,
        group: 'System & Settings',
    },
    {
        title: 'Contact Information',
        href: '/contact-info',
        icon: Phone,
        group: 'System & Settings',
    },
    {
        title: 'Company Profile',
        href: '/company-profile',
        icon: Building2,
        group: 'System & Settings',
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavAdditional items={additionalNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
