/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ClientDTO = {
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
    code?: string;
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
     * Type de client selon la norme OHADA
     */
    typeClientOhada?: ClientDTO.typeClientOhada;
    /**
     * Segment client
     */
    segment?: ClientDTO.segment;
    plafondCredit?: number;
    canalAquisition?: string;
    estAssujettiTVA?: boolean;
};
export namespace ClientDTO {
    /**
     * Type de client selon la norme OHADA
     */
    export enum typeClientOhada {
        ORDINAIRE = 'ORDINAIRE',
        ETAT = 'ETAT',
        GROUPE = 'GROUPE',
        DOUTEUX = 'DOUTEUX',
        DIVERS = 'DIVERS',
    }
    /**
     * Segment client
     */
    export enum segment {
        PARTICULIER = 'PARTICULIER',
        ENTREPRISE = 'ENTREPRISE',
        REVENDEUR = 'REVENDEUR',
    }
}

