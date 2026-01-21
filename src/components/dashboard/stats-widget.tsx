'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { Users, Truck, Briefcase, UserPlus, TrendingUp } from 'lucide-react';

export function DashboardStats() {
    const { tiers } = useStore();

    const clientCount = tiers.filter(t => t.type === 'client').length;
    const supplierCount = tiers.filter(t => t.type === 'fournisseur').length;
    const commercialCount = tiers.filter(t => t.type === 'commercial').length;
    const prospectCount = tiers.filter(t => t.type === 'prospect').length;

    const stats = [
        {
            title: 'Clients Actifs',
            value: clientCount,
            change: '+12%',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
        },
        {
            title: 'Fournisseurs',
            value: supplierCount,
            change: '+2%',
            icon: Truck,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
        },
        {
            title: 'Prospects',
            value: prospectCount,
            change: '+24%',
            icon: UserPlus,
            color: 'text-green-600',
            bg: 'bg-green-100',
        },
        {
            title: 'Chiffre d\'Affaires',
            value: '124k €',
            change: '+8.5%',
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${stat.bg}`}>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-gray-400 mt-1">
                            <span className="text-green-600 font-medium">{stat.change}</span> depuis le mois dernier
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
