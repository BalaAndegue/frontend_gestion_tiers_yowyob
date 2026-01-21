import { create } from 'zustand';
import { User, Tier, Client, Fournisseur, Commercial, TierType } from '@/types';
import { mockUsers, mockClients, mockFournisseurs, mockCommerciaux, mockProspects } from './mock-data';

interface AppState {
    currentUser: User | null;
    tiers: Tier[];
    isLoading: boolean;

    // Actions
    login: (email: string) => void;
    logout: () => void;
    addTier: (tier: Tier) => void;
    updateTier: (id: string, tier: Partial<Tier>) => void;
    deleteTier: (id: string) => void;
    getTiersByType: (type: TierType) => Tier[];
}

export const useStore = create<AppState>((set, get) => ({
    currentUser: mockUsers[0], // Default logged in as Admin for dev
    tiers: [...mockClients, ...mockFournisseurs, ...mockCommerciaux, ...mockProspects],
    isLoading: false,

    login: (email: string) => {
        const user = mockUsers.find(u => u.email === email);
        if (user) set({ currentUser: user });
    },

    logout: () => set({ currentUser: null }),

    addTier: (tier: Tier) => set((state) => ({ tiers: [...state.tiers, tier] })),

    updateTier: (id: string, updates: Partial<Tier>) =>
        set((state) => ({
            tiers: state.tiers.map((t) => (t.id === id ? { ...t, ...updates } as Tier : t)),
        })),

    deleteTier: (id: string) =>
        set((state) => ({ tiers: state.tiers.filter((t) => t.id !== id) })),

    getTiersByType: (type: TierType) => {
        return get().tiers.filter((t) => t.type === type);
    },
}));
