/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SpecialOpeningHoursIntervalDTO } from './SpecialOpeningHoursIntervalDTO';
export type SpecialOpeningHoursDTO = {
    id?: string;
    organizationId?: string;
    agencyId?: string;
    date?: string;
    isClosed?: boolean;
    label?: string;
    intervals?: Array<SpecialOpeningHoursIntervalDTO>;
    createdAt?: string;
    updatedAt?: string;
};

