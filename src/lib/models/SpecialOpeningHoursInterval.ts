/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalTime } from './LocalTime';
import type { SpecialOpeningHours } from './SpecialOpeningHours';
import type { Tenant } from './Tenant';
export type SpecialOpeningHoursInterval = {
    id?: string;
    organization?: Tenant;
    specialOpeningHours?: SpecialOpeningHours;
    startTime?: LocalTime;
    endTime?: LocalTime;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};

