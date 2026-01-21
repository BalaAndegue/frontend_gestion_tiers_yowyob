'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import {
    LayoutDashboard,
    Users,
    Truck,
    Briefcase,
    UserPlus,
    Settings,
    Plus,
    FileText
} from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const { tiers, currentUser } = useStore();

    // Calculate counts
    const clientCount = tiers.filter(t => t.type === 'client').length;
    const supplierCount = tiers.filter(t => t.type === 'fournisseur').length;
    const commercialCount = tiers.filter(t => t.type === 'commercial').length;
    const prospectCount = tiers.filter(t => t.type === 'prospect').length;

    const navItems = [
        {
            title: 'Tableau de bord',
            href: '/',
            icon: LayoutDashboard,
            count: null,
            permission: 'read', // Simplified for now
        },
        {
            title: 'Clients',
            href: '/clients',
            icon: Users,
            count: clientCount,
        },
        {
            title: 'Fournisseurs',
            href: '/fournisseurs',
            icon: Truck,
            count: supplierCount,
        },
        {
            title: 'Commerciaux',
            href: '/commerciaux',
            icon: Briefcase,
            count: commercialCount,
        },
        {
            title: 'Prospects',
            href: '/prospects',
            icon: UserPlus,
            count: prospectCount,
        },
        {
            title: 'Rapports',
            href: '/rapports',
            icon: FileText,
            count: null,
        }
    ];

    return (
        <div className="w-64 h-screen border-r bg-gray-50/50 flex flex-col">
            <div className="p-4 h-16 flex items-center border-b px-6">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    TierManager
                </h1>
            </div>

            <div className="p-4">
                <Button className="w-full justify-start gap-2 h-12 rounded-2xl shadow-md bg-white text-gray-800 hover:bg-gray-100 border border-gray-200" variant="ghost">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Nouveau Tiers</span>
                </Button>
            </div>

            <nav className="flex-1 px-2 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-2 text-sm font-medium rounded-r-full mr-2 transition-colors",
                                isActive
                                    ? "bg-blue-100 text-blue-800"
                                    : "text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("h-5 w-5", isActive ? "text-blue-700" : "text-gray-500")} />
                                {item.title}
                            </div>
                            {item.count !== null && (
                                <span className={cn(
                                    "text-xs font-semibold hover:bg-transparent",
                                    isActive ? "text-blue-700" : "text-gray-500"
                                )}>
                                    {item.count}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <Link
                    href="/parametres"
                    className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-r-full mr-2 transition-colors text-gray-700 hover:bg-gray-100",
                        pathname.startsWith('/parametres') && "bg-blue-100 text-blue-800"
                    )}
                >
                    <Settings className="h-5 w-5 text-gray-500" />
                    Paramètres
                </Link>
            </div>
        </div>
    );
}
