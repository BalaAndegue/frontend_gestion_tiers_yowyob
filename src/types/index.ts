export type UserRole = 'admin' | 'secretaire' | 'comptable' | 'manager' | 'rh' | 'commercial';
export type Permission = 'read' | 'create' | 'update' | 'delete' | 'export';
export type TierType = 'client' | 'fournisseur' | 'commercial' | 'prospect';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    permissions: Record<TierType, Permission[]>;
    avatar?: string;
}

// Java Backend Enums
export type Pays = 'CMR' | 'CG' | 'TC' | 'GB' | 'CI';
export type SecteurActivite = 'IT' | 'FINANCE' | 'SANTE' | 'INDUSTRIE' | 'COMMERCE';
export type TailleEntreprise = 'MICRO' | 'PME' | 'ETI' | 'GE';
export type CanalPrefere = 'EMAIL' | 'PHONE' | 'COURRIER' | 'IN_PERSON';
export type TypeEntreprise = 'PARTICULIER' | 'ENTREPRISE' | 'REVENDEUR';

// Specific Enums
export type SourceProspect = 'SITE_WEB' | 'RESEAU_SOCIAL' | 'SALON' | 'RECOMMANDATION';
export type Potentiel = 'FAIBLE' | 'MOYEN' | 'ELEVE' | 'STRATEGIQUE';
export type ModePaiementFournisseur = 'VIREMENT' | 'CHEQUE' | 'TRAITE';
export type ProduitPrincipal = 'ELECTRONIQUE' | 'MATERIEL' | 'LOGICIEL';
export type TypeCommercial = 'INTERNE' | 'EXTERNE' | 'INDEPENDANT';
export type ZoneCouverture = 'NORD' | 'SUD' | 'EST' | 'OUEST' | 'CENTRE' | 'LITTORAL' | 'INTERNATIONAL';
export type Specialisation = 'B2B' | 'B2C' | 'SECTEUR_PUBLIC' | 'GRANDS_COMPTES';
export type SegmentClient = 'PARTICULIER' | 'ENTREPRISE' | 'REVENDEUR';
export type CanalAquisition = 'WEB' | 'RESEAU' | 'RECOMMANDATION';

// Financial Types
export type ModePaiementAutorise = 'CHEQUE' | 'VIREMENT' | 'ESPECE' | 'CREDIT' | 'MOBILE_MONEY';

export interface FinancialInfo {
    solde: number;
    modesPaiementAutorises: ModePaiementAutorise[];
    rib?: string;
    devise: string;
}

// Legacy interfaces kept/adapated for UI compatibility
export interface CompteBancaire {
    id: string;
    iban: string;
    bic: string;
    banque: string;
}

export interface Note {
    id: string;
    content: string;
    date: Date;
    authorId: string;
}

export interface Contact {
    id: string;
    nom: string;
    poste: string;
    email: string;
    telephone: string;
}

export interface Facture {
    id: string;
    numero: string;
    date: Date;
    montantHT: number;
    montantTTC: number;
    statut: 'brouillon' | 'envoyée' | 'payée' | 'en retard';
    echeance?: Date;
    pdfUrl?: string;
}

export interface Affaire {
    id: string;
    titre: string;
    montant: number;
    status: 'en_cours' | 'gagnée' | 'perdue';
    date: Date;
}

export interface Communication {
    id: string;
    type: 'email' | 'appel' | 'rdv' | 'note';
    date: Date;
    sujet: string;
    contenu: string;
    canal: string;
    participant: string;
    piecesJointes?: string[];
}

export interface PaiementCommission {
    id: string;
    date: Date;
    montant: number;
    reference: string;
    note?: string;
    statut: 'en_attente' | 'payé' | 'annulé';
}

// Core Entity Structure
export interface TierBase {
    id: string; // UUID
    tenantId?: string;
    agencyId?: string;

    // Base Info
    code?: string; // e.g. CLI000425
    name: string; // was nom
    compteComptable?: string;
    nui?: string;
    shortName?: string;
    longName?: string;
    description?: string;
    avatar?: string; // URL to profile photo

    // Contact
    email: string;
    phoneNumber: string;
    website?: string;

    // Address
    address: string; // adresse
    complement?: string;
    postalCode: string; // codePostal
    city: string; // ville
    pays?: Pays;

    // Enterprise Info
    secteurActivite?: SecteurActivite;
    tailleEntreprise?: TailleEntreprise;
    dateCreation?: Date;
    registreCommerce?: string;
    numeroFiscal?: string;
    enterpriseName?: string;

    // Preferences
    canalPrefere?: CanalPrefere;
    typeEntreprise?: TypeEntreprise;

    // System
    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Extended Frontend data (mapped from backend or added)
    financial?: FinancialInfo;
    contacts?: Contact[];

    // UI helpers (mapped from name/address/etc for backward compat if needed)
    nom?: string; // Legacy alias for name
    ville?: string; // Legacy alias for city
    telephone?: string; // Legacy alias for phoneNumber
}

export interface Client extends TierBase {
    type: 'client';
    segment?: SegmentClient;
    plafondCredit?: number;
    canalAquisition?: CanalAquisition;

    // Screenshot fields
    fax?: string;
    contact?: string; // "Contact Divers"
    formeJuridique?: string; // "Individuel", "SA", etc.
    familleClient?: string; // "Grossiste"

    // Pricing Categories checkboxes
    pricingCategory?: {
        detail: boolean;
        demisGros: boolean;
        gros: boolean;
        superGros: boolean;
    };

    // Credit logic
    creditInfo?: {
        activé: boolean; // "Cocher pour désactiver" -> inverted logic likely, but let's store if credit is active
        copiesFacture?: number;
        tauxRemise?: number;
    };

    notes?: string; // Simple note field

    factures?: Facture[];
    communications?: Communication[];
    // notes?: Note[]; // Legacy, preferring simple string for now based on screenshot

    // Tab Data Structures
    balanceStatusData?: {
        magasin: string;
        etat: string;
        blNo: string;
        livreLe: string;
        reglement: string;
        montantTTC: number;
    }[];

    paymentMethodsData?: {
        code: string;
        libelle: string;
        autorise: boolean;
    }[];

    // Legacy
    categorie?: 'A' | 'B' | 'C';
    siret?: string;
    tva?: string;
    estAssujettiTVA?: boolean; // "Assujeti à la TVA"
}

export interface Fournisseur extends TierBase {
    type: 'fournisseur';
    modePaiement?: ModePaiementFournisseur;
    delaiLivraison?: string;
    produitsPrincipaux?: ProduitPrincipal;
    certification?: string;

    // Screenshot equivalent fields (assuming similar structure for supplier)
    fax?: string;
    contact?: string;
    formeJuridique?: string;
    familleFournisseur?: string;

    factures?: Facture[];
    notes?: string;

    // Legacy
    codeFournisseur?: string;
    conditionsPaiement?: string;
}

export interface Commercial extends TierBase {
    type: 'commercial';
    typeCommercial?: TypeCommercial;
    commission?: number;
    dateDebutContrat?: Date;
    dateFinContrat?: Date;
    zonesCouvertes?: ZoneCouverture;
    specialisations?: Specialisation;

    fax?: string;
    contact?: string;
    notes?: string;

    matricule?: string;
    clients?: string[];
    affaires?: Affaire[];
    paiements?: PaiementCommission[];
}

export interface Prospect extends TierBase {
    type: 'prospect';
    sourceProspect?: SourceProspect;
    potentiel?: Potentiel;
    dateConversion?: Date;
    probabilite?: number;
    notesProspect?: string;

    fax?: string;
    contact?: string; // Contact principal
    familleProspect?: string; // Grouping
    notes?: string;
}

export type Tier = Client | Fournisseur | Commercial | Prospect;
