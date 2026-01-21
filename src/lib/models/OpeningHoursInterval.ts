/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalTime } from './LocalTime';
import type { OpeningHoursRule } from './OpeningHoursRule';
import type { Tenant } from './Tenant';
export type OpeningHoursInterval = {
    id?: string;
    organization?: Tenant;
    rule?: OpeningHoursRule;
    startTime?: LocalTime;
    endTime?: LocalTime;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};

