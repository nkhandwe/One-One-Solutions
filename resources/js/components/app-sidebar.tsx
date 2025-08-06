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
    // App Management
    {
        title: 'Clients',
        href: '/clients',
        icon: LayoutList,
        group: 'App Management',
    },
    {
        title: 'Teams',
        href: '/teams',
        icon: ShieldHalf,
        group: 'App Management',
    },

    // Content Management
    {
        title: 'Banners',
        href: '/banners',
        icon: Image,
        group: 'Content Management',
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
        icon: SwatchBook,
        group: 'Content Management',
    },
    {
        title: 'Portfolio',
        href: '/portfolio',
        icon: BriefcaseBusiness,
        group: 'Content Management',
    },

    // Product & Services
    {
        title: 'Products',
        href: '/products',
        icon: ShoppingBasket,
        group: 'Product & Services',
    },
    {
        title: 'Services',
        href: '/services',
        icon: Telescope,
        group: 'Product & Services',
    },

    // Blogging & FAQs
    {
        title: 'FAQs',
        href: '/faqs',
        icon: TableOfContents,
        group: 'Blogging & FAQs',
    },
    {
        title: 'Blogs',
        href: '/blogs',
        icon: Rss,
        group: 'Blogging & FAQs',
    },
    {
        title: 'Inquiry',
        href: '/inquiry',
        icon: Siren,
        group: 'Inquiries',
    },

    // Web Settings
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        group: 'Web Settings',
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
