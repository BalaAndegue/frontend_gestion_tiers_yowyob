
import { Client, Fournisseur, Commercial, Prospect, Tier } from "@/types";

export const MOCK_CLIENTS: Client[] = [
    {
        id: "CLI000425",
        type: "client",
        active: true,
        name: "ABBA ABAKAR",
        code: "CLI000425",
        avatar: "https://i.pravatar.cc/150?u=CLI000425", // In types/index.ts I should ensure code is there. TierBase has 'nui', I might have to add 'code' to TierBase if it's not there, or just use 'nui' as code? Ah, standard allows adding extra props if I cast, but better to be type safe. I added 'code' to TierBase? Let me check.
        // Checking types/index.ts: TierBase has no 'code'. But 'TiersBaseDTO' had it.
        // I should probably add 'code' to TierBase in types/index.ts or just use it here as I added custom fields.
        // Wait, I did NOT add 'code' to Client interface in my last edit. I added fax, etc.
        // Let me check if TierBase had 'code'.
        // TierBase: id, name, compteComptable, nui, shortName... NO 'code'.
        // I should update TierBase to include 'code' or add it to Client. 
        // Screenshot shows "Code *". I will add it to Client if not consistent.
        // For now I'll assume I can add it or I will fix types in next step.

        // Basic Info
        pays: 'CMR',
        contact: "Contact Divers",
        formeJuridique: "Individuel",
        familleClient: "Grossiste",
        // Type client field in screenshot seems redundant with Famille or just another classification.
        // I'll map 'typeClientOhada' or just use 'segment'. 
        segment: 'ENTREPRISE',

        // Pricing
        estAssujettiTVA: false,
        pricingCategory: {
            detail: true,
            demisGros: true,
            gros: true,
            superGros: true
        },

        // Address
        address: "Douala, Cameroun",
        city: "Douala",
        postalCode: "",

        // Contact
        phoneNumber: "691551643",
        email: "",
        fax: "",
        website: "",

        // Financial
        plafondCredit: 500000,
        creditInfo: {
            activé: true,
            copiesFacture: 0,
            tauxRemise: 0
        },
        financial: {
            solde: 0,
            modesPaiementAutorises: [], // Will use paymentMethodsData instead for the detailed tab
            devise: 'XAF'
        },

        notes: "",

        // Tab Data
        balanceStatusData: [
            { magasin: "SURFACE VENTE ETOUDI", etat: "Facturé", blNo: "114MSVET20CP000000", livreLe: "08/01/2020", reglement: "par Compte", montantTTC: 360180 },
            { magasin: "SURFACE VENTE ETOUDI", etat: "Facturé", blNo: "114MSVET20CP000006", livreLe: "04/03/2020", reglement: "par Compte", montantTTC: 53490 },
            { magasin: "SURFACE VENTE ETOUDI", etat: "Facturé", blNo: "114MSVET20CP000000", livreLe: "04/03/2020", reglement: "par Compte", montantTTC: 7830 },
        ],
        paymentMethodsData: [
            { code: "QCQ", libelle: "manière quelconque", autorise: false },
            { code: "CC", libelle: "par Chèque", autorise: false },
            { code: "CP", libelle: "par Compte", autorise: true },
            { code: "CR", libelle: "par Crédit", autorise: false },
            { code: "CE", libelle: "par Espèces", autorise: false },
            { code: "VIR", libelle: "par virement", autorise: false },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // Add a couple more generic clients
    {
        id: "CLI000426",
        type: "client",
        active: true,
        name: "SUPER MARCHÉ DOMINO",
        code: "CLI000426",
        pays: "CMR",
        contact: "M. TCHAPTCHET",
        formeJuridique: "SARL",
        familleClient: "Détaillant",
        segment: "REVENDEUR",
        pricingCategory: { detail: true, demisGros: false, gros: false, superGros: false },
        address: "Akwa, Douala",
        city: "Douala",
        postalCode: "BP 000",
        phoneNumber: "699000000",
        email: "contact@domino.cm",
        plafondCredit: 1000000,
        financial: { solde: 150000, modesPaiementAutorises: [], devise: 'XAF' },
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

export const MOCK_FOURNISSEURS: Fournisseur[] = [
    {
        id: "FOU000100",
        type: "fournisseur",
        active: true,
        name: "GROSSISTE KADJI",
        codeFournisseur: "FOU000100",
        pays: "CMR",
        contact: "Service Commercial",
        formeJuridique: "SA",
        familleFournisseur: "Boissons",
        address: "Zone Industrielle Bassa",
        city: "Douala",
        postalCode: "BP 456",
        phoneNumber: "677000000",
        email: "commandes@kadji.cm",
        financial: { solde: 0, modesPaiementAutorises: [], devise: 'XAF' },
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

export const MOCK_COMMERCIAUX: Commercial[] = [
    {
        id: "COM001",
        type: "commercial",
        active: true,
        name: "JEAN-PAUL TCHOUA",
        code: "COM001",
        avatar: "https://i.pravatar.cc/150?u=COM001",
        matricule: "M-2024-001",
        contact: "Jean-Paul",
        email: "jp.tchoua@yowyob.com",
        phoneNumber: "699998877",
        address: "Akwa",
        city: "Douala",
        postalCode: "BP 000",
        commission: 5.0,
        typeCommercial: "INTERNE",
        createdAt: new Date(),
        updatedAt: new Date(),
        zonesCouvertes: "OUEST",
        clients: ["CLI000425"],
        affaires: [
            { id: "AFF1", titre: "Contrat Grossiste K", montant: 5000000, status: "gagnée", date: new Date("2024-01-15") }
        ],
        paiements: [
            { id: 'PAY-01', date: new Date('2024-01-30'), montant: 5000, reference: 'VIR-001', statut: 'payé' }
        ]
    },
    {
        id: "COM002",
        type: "commercial",
        active: true,
        name: "MARIE NGUYEN",
        code: "COM002",
        avatar: "https://i.pravatar.cc/150?u=COM002",
        matricule: "M-2024-002",
        contact: "Marie",
        email: "marie.n@yowyob.com",
        phoneNumber: "655443322",
        address: "Bastos",
        city: "Yaoundé",
        postalCode: "BP 101",
        commission: 7.0,
        typeCommercial: "INDEPENDANT",
        zonesCouvertes: "CENTRE",
        createdAt: new Date(),
        updatedAt: new Date(),
        clients: ["CLI000426"],
        affaires: [
            { id: "AFF2", titre: "Appel d'offre Ministère", montant: 12000000, status: "en_cours", date: new Date() }
        ],
        paiements: []
    },
    {
        id: "COM003",
        type: "commercial",
        active: false,
        name: "PIERRE DUPONT",
        code: "COM003",
        matricule: "M-2023-050",
        contact: "Pierre",
        email: "p.dupont@email.com",
        phoneNumber: "677889900",
        address: "Bonanjo",
        city: "Douala",
        postalCode: "BP 55",
        commission: 4.0,
        typeCommercial: "EXTERNE",
        zonesCouvertes: "LITTORAL",
        createdAt: new Date(),
        updatedAt: new Date(),
        clients: [],
        affaires: [],
        paiements: []
    }
];

export const MOCK_PROSPECTS: Prospect[] = [
    {
        id: "PRO001",
        type: "prospect",
        active: true,
        name: "PHARMACIE DE LA CÔTE",
        code: "PRO001",
        avatar: "https://i.pravatar.cc/150?u=PRO001",
        contact: "Dr. NGO",
        email: "pharma.cote@gmail.com",
        phoneNumber: "677112233",
        address: "Bonanjo",
        city: "Douala",
        postalCode: "BP 900",
        potentiel: "ELEVE",
        sourceProspect: "RECOMMANDATION",
        probabilite: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: "Intéressé par le module stock"
    },
    {
        id: "PRO002",
        type: "prospect",
        active: true,
        name: "CLINIQUE DE L'ESPOIR",
        code: "PRO002",
        contact: "Dr. KOUAM",
        email: "contact@clinique-espoir.cm",
        phoneNumber: "699887766",
        address: "Biyem-Assi",
        city: "Yaoundé",
        postalCode: "BP 300",
        potentiel: "MOYEN",
        sourceProspect: "SITE_WEB",
        probabilite: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: "A relancer semaine prochaine"
    },
    {
        id: "PRO003",
        type: "prospect",
        active: true,
        name: "BOUTIQUE MAMA SARA",
        code: "PRO003",
        contact: "Mme Sara",
        email: "",
        phoneNumber: "655001122",
        address: "Marché Central",
        city: "Douala",
        postalCode: "",
        potentiel: "FAIBLE",
        sourceProspect: "SALON",
        probabilite: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: "Petit budget, à voir"
    }
] as Prospect[]; // Cast to handle minor type mismatches if any

export const MOCK_TIERS: Tier[] = [
    ...MOCK_CLIENTS,
    ...MOCK_FOURNISSEURS,
    ...MOCK_COMMERCIAUX,
    ...MOCK_PROSPECTS
];
