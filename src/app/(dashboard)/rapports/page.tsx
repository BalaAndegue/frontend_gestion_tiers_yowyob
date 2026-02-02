"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import {
    Users,
    UserPlus,
    TrendingUp,
    Briefcase,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts"

export default function RapportsPage() {
    const { tiers } = useStore()

    // Calculate real data
    const totalTiers = tiers.length
    const clients = tiers.filter(t => t.type === 'client').length
    const prospects = tiers.filter(t => t.type === 'prospect').length
    const suppliers = tiers.filter(t => t.type === 'fournisseur').length
    const agents = tiers.filter(t => t.type === 'commercial').length

    const conversionRate = totalTiers > 0 ? (clients / (clients + prospects) * 100).toFixed(1) : 0

    const distributionData = [
        { name: 'Clients', value: clients, color: '#16a34a' },
        { name: 'Prospects', value: prospects, color: '#2563eb' },
        { name: 'Fournisseurs', value: suppliers, color: '#ea580c' },
        { name: 'Commerciaux', value: agents, color: '#7c3aed' },
    ]

    // Mock data for evolution (over 6 months)
    const evolutionData = [
        { name: 'Jan', prospects: 40, clients: 240 },
        { name: 'Feb', prospects: 30, clients: 139 },
        { name: 'Mar', prospects: 200, clients: 980 },
        { name: 'Apr', prospects: 278, clients: 390 },
        { name: 'May', prospects: 189, clients: 480 },
        { name: 'Jun', prospects: 239, clients: 380 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Rapports & Statistiques</h1>
                <p className="text-gray-500">Vue d'ensemble des performances et de la répartition des tiers.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-600 shadow-sm transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Tiers</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTiers}</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>+12% vs mois dernier</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-600 shadow-sm transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Clients Actifs</CardTitle>
                        <Briefcase className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clients}</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>+5 nouveaux</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-600 shadow-sm transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Taux Conversion</CardTitle>
                        <TrendingUp className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{conversionRate}%</div>
                        <div className="flex items-center text-xs text-red-600 mt-1">
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                            <span>-2.1% baisse</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-600 shadow-sm transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Prospects Chauds</CardTitle>
                        <UserPlus className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{prospects}</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>+8% croissance</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Distribution Pie Chart */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Répartition des Tiers</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Evolution Area Chart */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Évolution des Acquisitions</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={evolutionData}>
                                <defs>
                                    <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProspects" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="clients"
                                    stroke="#16a34a"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorClients)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="prospects"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorProspects)"
                                />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Top Performers Table */}
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-bold">Performance des Commerciaux</CardTitle>
                        <p className="text-sm text-gray-500">Commerciaux ayant converti le plus de prospects.</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Commercial</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Portefeuille Clients</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Conversions (mois)</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Progression</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                <tr className="border-b transition-colors hover:bg-gray-50">
                                    <td className="p-4 align-middle font-medium">Jean Dupont</td>
                                    <td className="p-4 align-middle">42</td>
                                    <td className="p-4 align-middle">12</td>
                                    <td className="p-4 align-middle text-green-600 font-bold">+15%</td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-gray-50">
                                    <td className="p-4 align-middle font-medium">Marie Claire</td>
                                    <td className="p-4 align-middle">38</td>
                                    <td className="p-4 align-middle">8</td>
                                    <td className="p-4 align-middle text-green-600 font-bold">+5%</td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-gray-50">
                                    <td className="p-4 align-middle font-medium">Robert Lewan</td>
                                    <td className="p-4 align-middle">25</td>
                                    <td className="p-4 align-middle">15</td>
                                    <td className="p-4 align-middle text-indigo-600 font-bold">Nouveau</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
