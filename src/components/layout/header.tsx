'use client';

import { Search, Bell, HelpCircle, Grip } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export function Header() {
    const { currentUser } = useStore();

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-10">
            {/* Search Bar - Gmail style */}
            <div className="flex-1 max-w-2xl ml-2">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <Input
                        placeholder="Rechercher dans les tiers..."
                        className="pl-10 bg-gray-100/50 border-transparent focus:bg-white focus:shadow-sm focus:border-gray-200 transition-all rounded-lg w-full"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-4">
                <Button variant="ghost" size="icon" className="text-gray-500">
                    <HelpCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500">
                    <Settings className="h-6 w-6" /> {/* Generic settings or quick settings */}
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500">
                    <Grip className="h-6 w-6" />
                </Button>

                <div className="pl-2">
                    <Avatar className="h-9 w-9 border border-gray-200 cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white">
                            {currentUser?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}

// Helper icon import fix
import { Settings } from 'lucide-react';
