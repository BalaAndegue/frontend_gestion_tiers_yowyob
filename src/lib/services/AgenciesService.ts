/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgencyDTO } from '../models/AgencyDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgenciesService {
    /**
     * Récupérer une agence par ID
     * @param id
     * @returns AgencyDTO OK
     * @throws ApiError
     */
    public static getAgencyById(
        id: string,
    ): CancelablePromise<AgencyDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/agencies/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mettre à jour une agence
     * @param id
     * @param requestBody
     * @returns AgencyDTO OK
     * @throws ApiError
     */
    public static updateAgency(
        id: string,
        requestBody: AgencyDTO,
    ): CancelablePromise<AgencyDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/agencies/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Supprimer une agence
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAgency(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/agencies/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Créer une nouvelle agence
     * @param requestBody
     * @returns AgencyDTO OK
     * @throws ApiError
     */
    public static createAgency(
        requestBody: AgencyDTO,
    ): CancelablePromise<AgencyDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/agencies',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Vérifier si une agence est ouverte à une date donnée
     * @param id
     * @param dateTime
     * @returns boolean OK
     * @throws ApiError
     */
    public static isAgencyOpen(
        id: string,
        dateTime?: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/agencies/{id}/is-open',
            path: {
                'id': id,
            },
            query: {
                'dateTime': dateTime,
            },
        });
    }
    /**
     * Récupérer les agences d'une organisation
     * @param organizationId
     * @returns AgencyDTO OK
     * @throws ApiError
     */
    public static getAgenciesByOrganization(
        organizationId: string,
    ): CancelablePromise<Array<AgencyDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/agencies/organization/{organizationId}',
            path: {
                'organizationId': organizationId,
            },
        });
    }
}
