import { Client, Fournisseur, Commercial, User, Tier, Prospect } from '@/types';

export const mockUsers: User[] = [
    {
        id: 'u1',
        name: 'Alice Admin',
        email: 'alice@example.com',
        role: 'admin',
        permissions: {
            client: ['read', 'create', 'update', 'delete', 'export'],
            fournisseur: ['read', 'create', 'update', 'delete', 'export'],
            commercial: ['read', 'create', 'update', 'delete', 'export'],
            prospect: ['read', 'create', 'update', 'delete', 'export'],
        },
        avatar: 'https://ui.shadcn.com/avatars/01.png',
    },
    {
        id: 'u2',
        name: 'Bob Sales',
        email: 'bob@example.com',
        role: 'comptable',
        permissions: {
            client: ['read'],
            fournisseur: ['read'],
            commercial: [],
            prospect: [],
        },
        avatar: 'https://ui.shadcn.com/avatars/02.png',
    }
];

export const mockClients: Client[] = [
    {
        id: 'c1',
        type: 'client',
        name: 'Acme Corp',
        nom: 'Acme Corp',
        email: 'contact@acme.com',
        phoneNumber: '+33 1 23 45 67 89',
        telephone: '+33 1 23 45 67 89',
        address: '123 Rue de la Paix',
        postalCode: '75001',
        city: 'Paris',
        ville: 'Paris',
        pays: 'GB',
        nui: '12345678900012',
        active: true,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-06-20'),
        segment: 'ENTREPRISE',
        plafondCredit: 5000,
        financial: { solde: -1500.50, modesPaiementAutorises: ['VIREMENT', 'CHEQUE'], devise: 'EUR' },
        categorie: 'A',
        factures: [],
        contacts: [],
        communications: [],
    },
    {
        id: 'c2',
        type: 'client',
        name: 'Globex Inc',
        nom: 'Globex Inc',
        email: 'info@globex.com',
        phoneNumber: '+33 4 56 78 90 12',
        telephone: '+33 4 56 78 90 12',
        address: '456 Avenue des Champs',
        postalCode: '69000',
        city: 'Lyon',
        ville: 'Lyon',
        pays: 'GB',
        active: true, createdAt: new Date('2023-02-10'), updatedAt: new Date('2023-07-01'),
        segment: 'ENTREPRISE',
        financial: { solde: 0, modesPaiementAutorises: ['VIREMENT'], devise: 'EUR' },
        categorie: 'B', factures: [], contacts: [], communications: [],
    },
    {
        id: 'c3', type: 'client', name: 'Soylent Corp', nom: 'Soylent Corp', email: 'sales@soylent.com', phoneNumber: '+33 3 20 00 00 00',
        address: '10 Rue de l\'Industrie', postalCode: '59000', city: 'Lille', pays: 'GB',
        active: true, createdAt: new Date('2023-05-12'), updatedAt: new Date('2023-08-01'), segment: 'ENTREPRISE',
        financial: { solde: 2500, modesPaiementAutorises: ['VIREMENT'], devise: 'EUR' }, factures: [],
    },
    {
        id: 'c4', type: 'client', name: 'StartUp Nation', nom: 'StartUp Nation', email: 'hello@startup.io', phoneNumber: '+33 6 99 88 77 66',
        address: 'Station F', postalCode: '75013', city: 'Paris', pays: 'GB',
        active: true, createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-01-10'), segment: 'ENTREPRISE',
        financial: { solde: 0, modesPaiementAutorises: ['VIREMENT', 'MOBILE_MONEY'], devise: 'EUR' }, factures: [],
    },
    {
        id: 'c5', type: 'client', name: 'Boulangerie Paul', nom: 'Boulangerie Paul', email: 'paul@pain.fr', phoneNumber: '+33 6 12 12 12 12',
        address: '2 Rue du Four', postalCode: '31000', city: 'Toulouse', pays: 'GB',
        active: false, createdAt: new Date('2022-11-05'), updatedAt: new Date('2023-12-01'), segment: 'PARTICULIER',
        financial: { solde: 50, modesPaiementAutorises: ['ESPECE'], devise: 'EUR' }, factures: [],
    }
];

export const mockFournisseurs: Fournisseur[] = [
    {
        id: 'f1', type: 'fournisseur', name: 'Office Supplies Co', nom: 'Office Supplies Co', email: 'sales@officesupplies.com', phoneNumber: '+33 5 67 89 01 23',
        address: '789 Boulevard Industriel', postalCode: '13000', city: 'Marseille', pays: 'GB',
        active: true, createdAt: new Date('2023-03-05'), updatedAt: new Date('2023-03-05'), modePaiement: 'VIREMENT', delaiLivraison: '5 jours', factures: [],
    },
    {
        id: 'f2', type: 'fournisseur', name: 'Tech Wholesaler', nom: 'Tech Wholesaler', email: 'contact@techwhole.com', phoneNumber: '+33 1 00 11 22 33',
        address: 'Zone Tech', postalCode: '92000', city: 'Nanterre', pays: 'GB',
        active: true, createdAt: new Date('2023-06-15'), updatedAt: new Date('2023-09-10'), modePaiement: 'VIREMENT', delaiLivraison: '2 jours', factures: [],
    },
    {
        id: 'f3', type: 'fournisseur', name: 'Paper Mill Ltd', nom: 'Paper Mill Ltd', email: 'orders@papermill.com', phoneNumber: '+44 20 1234 5678',
        address: '12 Forest Road', postalCode: 'SW1A', city: 'London', pays: 'GB',
        active: true, createdAt: new Date('2023-01-20'), updatedAt: new Date('2023-01-20'), modePaiement: 'TRAITE', delaiLivraison: '7 jours', factures: [],
    }
];

export const mockCommerciaux: Commercial[] = [
    {
        id: 'com1', type: 'commercial', name: 'Jean Michel', nom: 'Jean Michel', email: 'jean.michel@company.com', phoneNumber: '+33 6 12 34 56 78',
        address: '10 Rue du Commerce', postalCode: '59000', city: 'Lille', pays: 'GB',
        active: true, createdAt: new Date('2023-01-01'), updatedAt: new Date('2023-01-01'),
        typeCommercial: 'INTERNE', commission: 5, matricule: 'COM-2023-01', dateDebutContrat: new Date('2023-01-01'),
        clients: ['c1', 'c2'],
        affaires: [
            { id: 'aff-1', titre: 'Contrat Maintenance 2024', montant: 15000, status: 'en_cours', date: new Date('2023-11-15') },
            { id: 'aff-2', titre: 'Licences Logiciel ERP', montant: 5000, status: 'gagnée', date: new Date('2023-10-01') },
            { id: 'aff-3', titre: 'Formation Équipe', montant: 2500, status: 'perdue', date: new Date('2023-09-20') }
        ]
    },
    {
        id: 'com2', type: 'commercial', name: 'Sophie Vente', nom: 'Sophie Vente', email: 'sophie.vente@company.com', phoneNumber: '+33 6 98 76 54 32',
        address: '25 Avenue de la République', postalCode: '75011', city: 'Paris', pays: 'GB',
        active: true, createdAt: new Date('2023-04-15'), updatedAt: new Date('2023-04-15'),
        typeCommercial: 'INDEPENDANT', commission: 10, matricule: 'EXT-2023-44', dateDebutContrat: new Date('2023-04-15'),
        clients: ['c3', 'c4'],
        affaires: [
            { id: 'aff-4', titre: 'Déploiement Cloud', montant: 35000, status: 'gagnée', date: new Date('2023-12-05') },
            { id: 'aff-5', titre: 'Audit Sécurité', montant: 8000, status: 'en_cours', date: new Date('2024-01-15') }
        ]
    }
];

export const mockProspects: Prospect[] = [
    {
        id: 'p1', type: 'prospect', name: 'Future Corp', nom: 'Future Corp', email: 'future@corp.com', phoneNumber: '+33 7 00 00 00 00',
        address: '123 Future Way', postalCode: '90210', city: 'Dreamland', pays: 'GB',
        active: true, createdAt: new Date(), updatedAt: new Date(),
        sourceProspect: 'SITE_WEB', potentiel: 'ELEVE', probabilite: 60
    },
    {
        id: 'p2', type: 'prospect', name: 'Small Shop', nom: 'Small Shop', email: 'shop@small.com', phoneNumber: '+33 6 11 22 33 44',
        address: '88 Market St', postalCode: '33000', city: 'Bordeaux', pays: 'GB',
        active: true, createdAt: new Date(), updatedAt: new Date(),
        sourceProspect: 'RESEAU_SOCIAL', potentiel: 'FAIBLE', probabilite: 20
    },
    {
        id: 'p3', type: 'prospect', name: 'Mega Industrie', nom: 'Mega Industrie', email: 'contact@mega.ind', phoneNumber: '+33 4 77 88 99 00',
        address: 'ZI Nord', postalCode: '69000', city: 'Lyon', pays: 'GB',
        active: true, createdAt: new Date(), updatedAt: new Date(),
        sourceProspect: 'SALON', potentiel: 'STRATEGIQUE', probabilite: 85
    },
    {
        id: 'p4', type: 'prospect', name: 'Consulting Firm', nom: 'Consulting Firm', email: 'info@consult.com', phoneNumber: '+33 1 22 33 44 55',
        address: 'La Défense', postalCode: '92400', city: 'Paris', pays: 'GB',
        active: false, createdAt: new Date(), updatedAt: new Date(),
        sourceProspect: 'RECOMMANDATION', potentiel: 'MOYEN', probabilite: 40
    }
];

// Helper to get all tiers
export const getAllTiers = (): Tier[] => {
    return [...mockClients, ...mockFournisseurs, ...mockCommerciaux, ...mockProspects];
};
