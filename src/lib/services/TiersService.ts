/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Tiers } from '../models/Tiers';
import type { TiersBaseDTO } from '../models/TiersBaseDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TiersService {
    /**
     * @param id
     * @returns Tiers OK
     * @throws ApiError
     */
    public static deactivateTiers(
        id: string,
    ): CancelablePromise<Tiers> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tiers/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Affecter un tiers à une agence
     * Associe un tiers à une agence spécifique. Vérifie si l'agence est ouverte.
     * @param id
     * @param agencyId
     * @returns Tiers OK
     * @throws ApiError
     */
    public static assignTierToAgency(
        id: string,
        agencyId: string,
    ): CancelablePromise<Tiers> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tiers/{id}/assign-agency/{agencyId}',
            path: {
                'id': id,
                'agencyId': agencyId,
            },
        });
    }
    /**
     * @param id
     * @returns Tiers OK
     * @throws ApiError
     */
    public static activateTiers(
        id: string,
    ): CancelablePromise<Tiers> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tiers/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Récupérer tous les tiers
     * Retourne la liste de tous les types de tiers
     * @returns TiersBaseDTO OK
     * @throws ApiError
     */
    public static getAllTiers(): CancelablePromise<Array<TiersBaseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tiers',
        });
    }
    /**
     * Récupérer un tiers par ID
     * Retourne un tiers spécifique par son ID
     * @param id
     * @returns TiersBaseDTO OK
     * @throws ApiError
     */
    public static getTiersById(
        id: string,
    ): CancelablePromise<TiersBaseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tiers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Supprimer un tiers
     * Supprime un tiers du système
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTiers(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tiers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Tiers OK
     * @throws ApiError
     */
    public static getInactiveTiers(): CancelablePromise<Array<Tiers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tiers/inactive',
        });
    }
    /**
     * Récupérer les tiers par agence
     * Retourne la liste des tiers liés à une agence
     * @param agencyId
     * @returns TiersBaseDTO OK
     * @throws ApiError
     */
    public static getTiersByAgency(
        agencyId: string,
    ): CancelablePromise<Array<TiersBaseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tiers/agency/{agencyId}',
            path: {
                'agencyId': agencyId,
            },
        });
    }
    /**
     * @returns Tiers OK
     * @throws ApiError
     */
    public static getActiveTiers(): CancelablePromise<Array<Tiers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tiers/active',
        });
    }
}
