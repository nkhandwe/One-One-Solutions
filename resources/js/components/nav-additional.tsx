import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavAdditional({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    // Group nav items by 'group' property
    const groupedItems = items.reduce((acc: Record<string, NavItem[]>, item) => {
        const group = item.group ?? 'Others';
        acc[group] = acc[group] || [];
        acc[group].push(item);
        return acc;
    }, {});

    return (
        <>
            {Object.entries(groupedItems).map(([groupLabel, groupItems]) => (
                <SidebarGroup key={groupLabel} className="px-2 py-0">
                    <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
                    <SidebarMenu>
                        {groupItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
