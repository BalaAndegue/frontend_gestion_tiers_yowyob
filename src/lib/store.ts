import { create } from 'zustand';
import { User, Tier, Client, Fournisseur, Commercial, Prospect, TierType } from '@/types';
import { ClientsService } from './services/ClientsService';
import { FournisseursService } from './services/FournisseursService';
import { CommerciauxService } from './services/CommerciauxService';
import { ProspectsService } from './services/ProspectsService';
import { TiersService } from './services/TiersService';
import { MOCK_TIERS } from '@/lib_moc_data/mock-data';

interface AppState {
    currentUser: User | null;
    tiers: Tier[];
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string) => void;
    logout: () => void;
    fetchTiers: () => Promise<void>;
    addTier: (tier: Tier) => Promise<void>;
    updateTier: (id: string, tier: Partial<Tier>) => Promise<void>;
    deleteTier: (id: string) => Promise<void>;
    getTiersByType: (type: TierType) => Tier[];
}

// Temporary mock user for dev
const MOCK_USER: User = {
    id: '1',
    email: 'admin@yowyob.com',
    name: 'Administrateur',
    role: 'admin',
    permissions: {
        client: ['read', 'create', 'update', 'delete', 'export'],
        fournisseur: ['read', 'create', 'update', 'delete', 'export'],
        commercial: ['read', 'create', 'update', 'delete', 'export'],
        prospect: ['read', 'create', 'update', 'delete', 'export']
    }
};

export const useStore = create<AppState>((set, get) => ({
    currentUser: MOCK_USER,
    tiers: [],
    isLoading: false,
    error: null,

    login: (email: string) => {
        // Simple mock login for now
        set({ currentUser: MOCK_USER });
    },

    logout: () => set({ currentUser: null }),

    fetchTiers: async () => {
        set({ isLoading: true, error: null });
        try {
            const [clients, fournisseurs, commerciaux, prospects] = await Promise.all([
                ClientsService.getAllClients(),
                FournisseursService.getAllFournisseurs(),
                CommerciauxService.getAllCommerciaux(),
                ProspectsService.getAllProspects()
            ]);

            // Map backend types to frontend types slightly if needed, but assuming DTOs match reasonably well.
            // We tag them with 'type' explicitly if the backend doesn't return the discriminator property matching our frontend 'type' literal.
            // The frontend 'Tier' type relies on 'type' property being 'client', 'fournisseur', etc.
            // Let's assume we ensure this property exists.

            const formattedClients = clients.map(c => ({ ...c, type: 'client' as const } as unknown as Client));
            const formattedFournisseurs = fournisseurs.map(f => ({ ...f, type: 'fournisseur' as const } as unknown as Fournisseur));
            const formattedCommerciaux = commerciaux.map(c => ({ ...c, type: 'commercial' as const } as unknown as Commercial));
            const formattedProspects = prospects.map(p => ({ ...p, type: 'prospect' as const } as unknown as Prospect));

            set({
                tiers: [
                    ...MOCK_TIERS, // Always include mocks for dev visibility as requested
                    ...formattedClients,
                    ...formattedFournisseurs,
                    ...formattedCommerciaux,
                    ...formattedProspects
                ].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i), // Dedup by ID
                isLoading: false
            });
        } catch (err: any) {
            console.error('Failed to fetch tiers', err);
            // Fallback to MOCK_TIERS in case of error (e.g. backend not running)
            console.warn('Backend unavailable, using MOCK_TIERS');
            set({
                tiers: MOCK_TIERS,
                isLoading: false,
                error: null // Clear error to allow UI to show mock data
            });
        }
    },

    addTier: async (tier: Tier) => {
        set({ isLoading: true, error: null });
        try {
            let createdTier: any;
            switch (tier.type) {
                case 'client':
                    createdTier = await ClientsService.createClient(tier as any); // Cast to handle DTO mismatch
                    createdTier.type = 'client';
                    break;
                case 'fournisseur':
                    createdTier = await FournisseursService.createFournisseur(tier as any);
                    createdTier.type = 'fournisseur';
                    break;
                case 'commercial':
                    createdTier = await CommerciauxService.createCommercial(tier as any);
                    createdTier.type = 'commercial';
                    break;
                case 'prospect':
                    createdTier = await ProspectsService.createProspect(tier as any);
                    createdTier.type = 'prospect';
                    break;
            }

            if (createdTier) {
                set((state) => ({
                    tiers: [...state.tiers, createdTier],
                    isLoading: false
                }));
            }
        } catch (err: any) {
            console.error('Failed to create tier', err);
            set({ error: err.message || 'Error creating tier', isLoading: false });
            throw err;
        }
    },

    updateTier: async (id: string, updates: Partial<Tier>) => {
        set({ isLoading: true, error: null });
        try {
            // Find current type to know which service to call if not in updates
            const currentTier = get().tiers.find(t => t.id === id);
            if (!currentTier) throw new Error('Tier not found');

            const type = updates.type || currentTier.type;
            let updatedResult: any;

            // Merge current data with updates for the body
            const payload = { ...currentTier, ...updates };

            switch (type) {
                case 'client':
                    updatedResult = await ClientsService.updateClient(id, payload as any);
                    updatedResult.type = 'client';
                    break;
                case 'fournisseur':
                    updatedResult = await FournisseursService.updateFournisseur(id, payload as any);
                    updatedResult.type = 'fournisseur';
                    break;
                case 'commercial':
                    updatedResult = await CommerciauxService.updateCommercial(id, payload as any);
                    updatedResult.type = 'commercial';
                    break;
                case 'prospect':
                    updatedResult = await ProspectsService.updateProspect(id, payload as any);
                    updatedResult.type = 'prospect';
                    break;
            }

            set((state) => ({
                tiers: state.tiers.map((t) => (t.id === id ? updatedResult : t)),
                isLoading: false
            }));
        } catch (err: any) {
            console.error('Failed to update tier', err);
            set({ error: err.message || 'Error updating tier', isLoading: false });
            throw err;
        }
    },

    deleteTier: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            // We can use the generic Tiers service for deletion if IDs are unique across tables,
            // or lookup the type. Let's use TiersService as it has deleteTiers.
            await TiersService.deleteTiers(id);

            set((state) => ({
                tiers: state.tiers.filter((t) => t.id !== id),
                isLoading: false
            }));
        } catch (err: any) {
            console.error('Failed to delete tier', err);
            set({ error: err.message || 'Error deleting tier', isLoading: false });
            throw err;
        }
    },

    getTiersByType: (type: TierType) => {
        return get().tiers.filter((t) => t.type === type);
    },
}));
