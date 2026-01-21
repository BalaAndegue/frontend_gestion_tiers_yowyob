/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agency } from './Agency';
import type { OpeningHoursInterval } from './OpeningHoursInterval';
import type { Tenant } from './Tenant';
export type OpeningHoursRule = {
    id?: string;
    organization?: Tenant;
    agency?: Agency;
    dayOfWeek?: number;
    isClosed?: boolean;
    intervals?: Array<OpeningHoursInterval>;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};

