/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OpeningHoursIntervalDTO } from './OpeningHoursIntervalDTO';
export type OpeningHoursRuleDTO = {
    id?: string;
    organizationId?: string;
    agencyId?: string;
    dayOfWeek?: number;
    isClosed?: boolean;
    intervals?: Array<OpeningHoursIntervalDTO>;
    createdAt?: string;
    updatedAt?: string;
};

