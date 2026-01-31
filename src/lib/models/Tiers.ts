/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agency } from './Agency';
import type { Tenant } from './Tenant';
export type Tiers = {
    id?: string;
    tenant?: Tenant;
    agency?: Agency;
    code?: string;
    compteComptable?: string;
    name?: string;
    shortName?: string;
    longName?: string;
    description?: string;
    email?: string;
    phoneNumber?: string;
    website?: string;
    address?: string;
    complement?: string;
    postalCode?: string;
    city?: string;
    pays?: Tiers.pays;
    secteurActivite?: Tiers.secteurActivite;
    tailleEntreprise?: Tiers.tailleEntreprise;
    dateCreation?: string;
    registreCommerce?: string;
    numeroFiscal?: string;
    enterpriseName?: string;
    canalPrefere?: Tiers.canalPrefere;
    typeEntreprise?: Tiers.typeEntreprise;
    createdAt?: string;
    updatedAt?: string;
    active?: boolean;
    nui?: string;
};
export namespace Tiers {
    export enum pays {
        CMR = 'CMR',
        CG = 'CG',
        TC = 'TC',
        GB = 'GB',
        CI = 'CI',
    }
    export enum secteurActivite {
        IT = 'IT',
        FINANCE = 'FINANCE',
        SANTE = 'SANTE',
        INDUSTRIE = 'INDUSTRIE',
        COMMERCE = 'COMMERCE',
    }
    export enum tailleEntreprise {
        MICRO = 'MICRO',
        PME = 'PME',
        ETI = 'ETI',
        GE = 'GE',
    }
    export enum canalPrefere {
        EMAIL = 'EMAIL',
        PHONE = 'PHONE',
        COURRIER = 'COURRIER',
        IN_PERSON = 'IN_PERSONstring',
    }
    export enum typeEntreprise {
        PARTICULIER = 'PARTICULIER',
        ENTREPRISE = 'ENTREPRISE',
        REVENDEUR = 'REVENDEUR',
    }
}

