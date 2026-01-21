/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CommercialDTO = {
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
     * Type de personnel selon OHADA
     */
    typePersonnelOhada?: CommercialDTO.typePersonnelOhada;
    /**
     * Type de commercial
     */
    typeCommercial?: CommercialDTO.typeCommercial;
    commission?: number;
    dateDebutContrat?: string;
    dateFinContrat?: string;
    zonesCouvertes?: string;
    specialisations?: string;
};
export namespace CommercialDTO {
    /**
     * Type de personnel selon OHADA
     */
    export enum typePersonnelOhada {
        PERSONNEL = 'PERSONNEL',
        ORGANISMES_SOCIAUX = 'ORGANISMES_SOCIAUX',
        ETAT = 'ETAT',
        DIVERS = 'DIVERS',
    }
    /**
     * Type de commercial
     */
    export enum typeCommercial {
        INTERNE = 'INTERNE',
        EXTERNE = 'EXTERNE',
        INDEPENDANT = 'INDEPENDANT',
    }
}

