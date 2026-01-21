"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRole, TierType } from "@/types"

export default function SettingsPage() {
    const roles: UserRole[] = ['admin', 'manager', 'commercial', 'secretaire', 'comptable', 'rh']
    const resources: TierType[] = ['client', 'fournisseur', 'commercial', 'prospect']
    const actions = ['Lecture', 'Création', 'Modification', 'Suppression']

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
                <p className="text-gray-500">Gérez les utilisateurs et les permissions du système.</p>
            </div>

            <Tabs defaultValue="permissions" className="w-full">
                <TabsList>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                    <TabsTrigger value="app">Application</TabsTrigger>
                </TabsList>

                <TabsContent value="permissions" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Matrice de Permissions</CardTitle>
                            <CardDescription>
                                Définissez qui peut faire quoi dans l'application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Rôle</TableHead>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Fournisseur</TableHead>
                                            <TableHead>Commercial</TableHead>
                                            <TableHead>Prospect</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {roles.map((role) => (
                                            <TableRow key={role}>
                                                <TableCell className="font-medium capitalize">{role}</TableCell>
                                                {resources.map((res) => (
                                                    <TableCell key={res}>
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center space-x-2">
                                                                <Switch id={`${role}-${res}-read`} defaultChecked={role === 'admin'} />
                                                                <Label htmlFor={`${role}-${res}-read`} className="text-xs">Lecture</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Switch id={`${role}-${res}-write`} defaultChecked={role === 'admin'} />
                                                                <Label htmlFor={`${role}-${res}-write`} className="text-xs">Écriture</Label>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button>Sauvegarder les changements</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des utilisateurs</CardTitle>
                            <CardDescription>Ajoutez ou supprimez des accès collaborateurs.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Fonctionnalité à venir...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
