/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FournisseurDTO = {
    /**
     * Identifiant unique du tiers
     */
    readonly id?: string;
    /**
     * Compte comptable OHADA (Généré automatiquement)
     */
    readonly compteComptable?: string;
    /**
     * Nom ou Raison sociale
     */
    name: string;
    shortName?: string;
    longName?: string;
    active?: boolean;
    description?: string;
    /**
     * Adresse email de contact
     */
    email?: string;
    /**
     * Numéro de téléphone
     */
    phoneNumber?: string;
    website?: string;
    address?: string;
    complement?: string;
    postalCode?: string;
    city?: string;
    pays?: string;
    secteurActivite?: string;
    tailleEntreprise?: string;
    dateCreation?: string;
    registreCommerce?: string;
    numeroFiscal?: string;
    canalPrefere?: string;
    typeEntreprise?: string;
    tenantId?: string;
    agencyId?: string;
    /**
     * Type de fournisseur selon OHADA
     */
    typeFournisseurOhada?: FournisseurDTO.typeFournisseurOhada;
    /**
     * Mode de paiement habituel
     */
    modePaiement?: FournisseurDTO.modePaiement;
    delaiLivraison?: string;
    produitsPrincipaux?: string;
    certification?: string;
};
export namespace FournisseurDTO {
    /**
     * Type de fournisseur selon OHADA
     */
    export enum typeFournisseurOhada {
        EXPLOITATION = 'EXPLOITATION',
        GROUPE = 'GROUPE',
        IMMOBILISATIONS = 'IMMOBILISATIONS',
        DIVERS = 'DIVERS',
    }
    /**
     * Mode de paiement habituel
     */
    export enum modePaiement {
        VIREMENT = 'VIREMENT',
        CHEQUE = 'CHEQUE',
        TRAITE = 'TRAITE',
    }
}

