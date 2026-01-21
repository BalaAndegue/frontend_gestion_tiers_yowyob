/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OpeningHoursRuleDTO } from './OpeningHoursRuleDTO';
import type { SpecialOpeningHoursDTO } from './SpecialOpeningHoursDTO';
export type AgencyDTO = {
    id?: string;
    organizationId?: string;
    code?: string;
    name?: string;
    location?: string;
    description?: string;
    timezone?: string;
    address?: string;
    ownerId?: string;
    managerId?: string;
    transferable?: boolean;
    isActive?: boolean;
    logoUrl?: string;
    logoId?: string;
    shortName?: string;
    longName?: string;
    isIndividualBusiness?: boolean;
    isHeadquarter?: boolean;
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    openTime?: string;
    closeTime?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    greetingMessage?: string;
    averageRevenue?: number;
    capitalShare?: number;
    registrationNumber?: string;
    socialNetwork?: string;
    taxNumber?: string;
    keywords?: Array<string>;
    isPublic?: boolean;
    isBusiness?: boolean;
    totalAffiliatedCustomers?: number;
    createdAt?: string;
    updatedAt?: string;
    openingHoursRules?: Array<OpeningHoursRuleDTO>;
    specialOpeningHours?: Array<SpecialOpeningHoursDTO>;
};

