/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agency } from './Agency';
import type { SpecialOpeningHoursInterval } from './SpecialOpeningHoursInterval';
import type { Tenant } from './Tenant';
export type SpecialOpeningHours = {
    id?: string;
    organization?: Tenant;
    agency?: Agency;
    date?: string;
    isClosed?: boolean;
    label?: string;
    intervals?: Array<SpecialOpeningHoursInterval>;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};

